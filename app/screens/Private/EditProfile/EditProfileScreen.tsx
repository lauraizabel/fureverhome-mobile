import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppStackScreenProps } from 'app/navigators';
import { Header, Screen, Text, TextField } from 'app/components';
import { colors, spacing } from 'app/theme';
import { useAuth } from 'app/context/AuthContext';
import { UserType } from 'app/enum/UserType';
import { IUser } from 'app/data/models';
import { buildNoPhoto } from 'app/core/utils/Image';
import Collapsible from 'react-native-collapsible';
import { Entypo } from '@expo/vector-icons';
import { states } from 'app/core/states';
import { Picker } from '@react-native-picker/picker';
import { ChangePassword } from 'app/screens/Private/Profile/ChangePassword/ChangePassword';
import { userApi } from 'app/data/services/user/user.api';
import Toast from 'react-native-toast-message';

type EditProfileScreenProps = AppStackScreenProps<'EditProfile'>;

export interface EditUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picture: string | ImagePicker.ImagePickerAsset;
  type: UserType;
  description: string | null;
  job: string | null;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
  cpf: string;
  number?: string | null;
  ongName?: string | null;
}

const buildFormValues = (user: IUser): EditUserForm | null => {
  if (user === null) return null;

  const formValues: EditUserForm = {
    lastName: user?.lastName || '',
    firstName: user?.firstName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    picture: user?.picture?.url || '',
    cpf: user?.cpf || '',
    type: user?.type,
    city: user?.userAddress?.city || '',
    description: user?.description || '',
    job: user?.job || '',
    neighborhood: user?.userAddress?.neighborhood || '',
    state: user?.userAddress?.state || '',
    street: user?.userAddress?.street || '',
    number: user?.userAddress?.number || '',
  };

  if (user?.type === UserType.ONG) {
    formValues.ongName = `${user?.firstName} ${user?.lastName}`;
  }

  return formValues;
};

export const EditProfileScreen: FC<EditProfileScreenProps> = () => {
  const { user, setPicture, setCurrentUser } = useAuth();
  const [formValue, setFormValue] = React.useState<EditUserForm | null>(null);
  const [isCollapsed, setIsCollapsed] = useState({
    personalInfo: false,
    address: false,
  });

  const toggleCollapse = (key: string) => {
    setIsCollapsed({ ...isCollapsed, [key]: !isCollapsed[key] });
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Você precisa permitir o acesso à câmera para adicionar fotos.',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return;
    }

    setFormValue({
      ...formValue,
      picture: result.assets[0],
    } as EditUserForm);
  };

  useEffect(() => {
    if (user) {
      const formValues = buildFormValues(user);
      setFormValue(formValues);
    }
  }, [user]);

  const onChange = (key: string, value: unknown) => {
    setFormValue({
      ...formValue,
      [key]: value,
    } as EditUserForm);
  };

  const renderStates = () => {
    return states.map(state => (
      <Picker.Item label={state.nome} value={state.sigla} key={state.id} />
    ));
  };

  const updatePicture = async () => {
    try {
      if (user?.picture) {
        await userApi.deletePicture({
          id: user?.id as number,
          imageId: user?.picture?.id as number,
        });
      }

      const image = await userApi.uploadPicture(
        user?.id as number,
        formValue?.picture as ImagePicker.ImagePickerAsset,
      );
      if (!image) return;
      setPicture(image);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar imagem :(',
        text2: 'Tente novamente',
      });
    }
  };

  const onSubmit = async () => {
    try {
      if (!formValue) return;

      if (
        formValue.picture !== user?.picture?.url &&
        typeof formValue.picture !== 'string'
      ) {
        await updatePicture();
      }

      if (formValue.type === UserType.FISICAL) {
        formValue.description = null;
      }

      const newUser = await userApi.updateUserInfo(
        user?.id as number,
        formValue,
      );
      setCurrentUser(newUser);
      Toast.show({
        text1: 'Usuário atualizado com sucesso!',
        text2: 'Seus dados foram atualizados',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Algo de errado aconteceu! :(',
        text2: 'Tente novamente',
      });
    }
  };
  const imageUri = useMemo(() => {
    if (!formValue) {
      return '';
    }

    if (typeof formValue.picture === 'string') {
      return formValue.picture;
    }

    if (formValue.picture && formValue.picture.base64) {
      return `data:image/png;base64,${formValue.picture.base64}`;
    }

    return buildNoPhoto(`${formValue.firstName} ${formValue.lastName}`);
  }, [formValue]);

  const renderDescriptionField = () => {
    return (
      <TextField
        containerStyle={$textFieldStyle}
        value={formValue?.description || ''}
        placeholder="Digite aqui uma descrição sobre a sua ONG"
        label="Descrição"
        onChangeText={text => onChange('description', text)}
        multiline
      />
    );
  };

  const renderName = () => {
    if (formValue?.type === UserType.ONG && formValue?.ongName) {
      return (
        <View>
          <TextField
            placeholder="Nome da ONG"
            value={formValue?.ongName}
            label="Nome da ONG"
            onChangeText={text =>
              setFormValue({ ...formValue, ongName: text } as EditUserForm)
            }
          />
        </View>
      );
    }
    return (
      <>
        <View>
          <TextField
            placeholder="Nome"
            value={formValue?.firstName}
            label="Nome"
            onChangeText={text =>
              setFormValue({ ...formValue, firstName: text } as EditUserForm)
            }
          />
        </View>
        <View>
          <TextField
            placeholder="Sobrenome"
            value={formValue?.lastName}
            label="Sobrenome"
            onChangeText={text =>
              setFormValue({ ...formValue, lastName: text } as EditUserForm)
            }
          />
        </View>
      </>
    );
  };

  if (!formValue) {
    return null;
  }

  return (
    <Screen style={$root} preset="scroll">
      <Header allowBackButton allowChatButton={false} />
      <View style={$container}>
        <View style={$containerImage}>
          <TouchableOpacity style={$containerImageUpload} onPress={pickImage}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={$imageContainerUpload}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '85%',
            marginTop: spacing.md,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleCollapse('personalInfo')}
            style={{
              marginBottom: spacing.sm,
              backgroundColor: colors.palette.primary500,
              padding: 16,
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.palette.neutral100,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 28,
                marginRight: spacing.md,
              }}
            >
              Informações pessoais
            </Text>
            {isCollapsed.personalInfo ? (
              <Entypo
                name="chevron-down"
                size={24}
                color={colors.palette.neutral100}
              />
            ) : (
              <Entypo
                name="chevron-up"
                size={24}
                color={colors.palette.neutral100}
              />
            )}
          </TouchableOpacity>

          <Collapsible collapsed={isCollapsed.personalInfo}>
            <View style={{ padding: 10 }}>
              {renderName()}
              <View>
                <TextField
                  placeholder="E-mail"
                  value={formValue?.email}
                  label="E-mail"
                  onChangeText={text =>
                    setFormValue({ ...formValue, email: text })
                  }
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="Telefone"
                  value={formValue.phone}
                  placeholder="Digite seu telefone"
                  maskedInput
                  onChangeText={value => onChange('phone', value)}
                  maskedInputOptions={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="Profissão"
                  value={formValue.job || ''}
                  placeholder="Digite sua profissão (opcional)"
                  onChangeText={value => onChange('job', value)}
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="CPF"
                  value={formValue.cpf || ''}
                  placeholder="Digite seu CPF (opcional)"
                  onChangeText={value => onChange('cpf', value)}
                  maskedInput
                  maskedInputType="cpf"
                />
              </View>
              <View style={[$textFieldStyle]}>
                <TextField
                  label="E-mail"
                  value={formValue.email || ''}
                  placeholder="Digite seu e-mail"
                  onChangeText={value => onChange('email', value)}
                />
              </View>
            </View>
            <View style={[$textFieldStyle]}>
              <Text preset="formLabel" style={$pickerTitle}>
                Tipo de conta
              </Text>
              <Picker
                style={$picker}
                onValueChange={value => onChange('type', value)}
                selectedValue={formValue.type}
              >
                <Picker.Item label="Pessoa física" value={UserType.FISICAL} />
                <Picker.Item label="ONG" value={UserType.ONG} />
              </Picker>
            </View>
            <View style={$textFieldStyle}>
              {formValue.type === UserType.ONG && renderDescriptionField()}
            </View>
          </Collapsible>
        </View>

        <View
          style={{
            width: '85%',
            marginTop: spacing.xl,
            marginBottom: spacing.xl,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleCollapse('address')}
            style={{
              marginBottom: spacing.sm,
              backgroundColor: colors.palette.primary500,
              padding: 16,
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.palette.neutral100,
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: 28,
                marginRight: spacing.md,
              }}
            >
              Endereço
            </Text>
            {isCollapsed.address ? (
              <Entypo
                name="chevron-down"
                size={24}
                color={colors.palette.neutral100}
              />
            ) : (
              <Entypo
                name="chevron-up"
                size={24}
                color={colors.palette.neutral100}
              />
            )}
          </TouchableOpacity>

          <Collapsible collapsed={isCollapsed.address}>
            <View style={{ padding: 10 }}>
              <View>
                <TextField
                  label="Rua"
                  value={formValue.street || ''}
                  placeholder="Digite sua rua"
                  onChangeText={value => onChange('street', value)}
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="Número"
                  value={formValue.number || ''}
                  placeholder="Digite o número"
                  onChangeText={value => onChange('number', value)}
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="Cidade"
                  value={formValue.city || ''}
                  placeholder="Digite sua cidade"
                  onChangeText={value => onChange('city', value)}
                />
              </View>
              <View style={$textFieldStyle}>
                <TextField
                  label="Bairro"
                  value={formValue.neighborhood || ''}
                  placeholder="Digite seu bairro"
                  onChangeText={value => onChange('neighborhood', value)}
                />
              </View>
              <View style={$textFieldStyle}>
                <Text preset="formLabel" style={$pickerTitle}>
                  Estado
                </Text>
                <Picker
                  style={$picker}
                  selectedValue={formValue.state}
                  onValueChange={value => onChange('state', value)}
                >
                  {renderStates()}
                </Picker>
              </View>
            </View>
          </Collapsible>
        </View>

        <View
          style={{
            width: '85%',
            marginBottom: spacing.xl,
          }}
        >
          <ChangePassword />
          <TouchableOpacity
            style={{
              marginTop: spacing.sm,
              borderRadius: 8,
              backgroundColor: colors.palette.primary400,
              width: '100%',
              padding: spacing.md,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                color: colors.palette.neutral100,
                fontWeight: '500',
                textTransform: 'capitalize',
              }}
            >
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const $root: ViewStyle = {
  flex: 1,
};

export const $pickerTitle: TextStyle = {
  marginBottom: 12,
};

export const $picker: ViewStyle = {
  backgroundColor: colors.palette.secondary100,
};

const $textFieldStyle: ViewStyle = {
  marginTop: 12,
};

const $container: ViewStyle = {
  marginTop: spacing.md,
  alignItems: 'center',
};

const $containerImage: ViewStyle = {
  justifyContent: 'center',
};

const $containerImageUpload: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: colors.palette.secondary100,
  width: 300,
  height: 300,
  borderRadius: 500,
};

export const $imageContainerUpload: ImageStyle = {
  width: 300,
  height: 300,
  borderRadius: 500,
};

export const $errorText: TextStyle = {
  color: colors.error,
};
