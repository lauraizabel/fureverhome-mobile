import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, spacing, typography } from 'app/theme';
import { Text } from 'app/components/Text';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import z from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { IFile } from 'app/data/models';
import { TextField } from './TextField';
import { AnimalSize } from '../enum/AnimalSize';
import { CommonColors } from '../enum/AnimalColors';
import { AnimalType } from '../enum/AnimalType';
import {
  AnimalFormData,
  animalFormDataSchema,
} from '../data/dto/animal/animal.dto';
import { AnimalCastrated } from '../enum/AnimalCastrated';
import { AnimalDewormed } from '../enum/AnimalDewormed';

export interface AnimalFormProps {
  style?: StyleProp<ViewStyle>;
  initialValues?: AnimalFormData;
  onSubmit: (formData: AnimalFormData) => void;
}

const animalSizes = [
  {
    name: 'Pequeno',
    value: AnimalSize.SMALL,
  },
  {
    name: 'Médio',
    value: AnimalSize.MEDIUM,
  },
  {
    name: 'Grande',
    value: AnimalSize.LARGE,
  },
];

const animalColors = [
  {
    name: 'Tigrado (tabby)',
    value: CommonColors.TigradoTabby,
  },
  {
    name: 'Branco',
    value: CommonColors.Branco,
  },
  {
    name: 'Preto',
    value: CommonColors.Preto,
  },
  {
    name: 'Cinza',
    value: CommonColors.Cinza,
  },
  {
    name: 'Laranja ou ruivo',
    value: CommonColors.LaranjaRuivo,
  },
  {
    name: 'Tricolor (calico/tortoiseshell)',
    value: CommonColors.TricolorCalicoTortoiseshell,
  },
  {
    name: 'Marrom',
    value: CommonColors.Marrom,
  },
  {
    name: 'Creme',
    value: CommonColors.Creme,
  },
  {
    name: 'Malhado',
    value: CommonColors.Malhado,
  },
  {
    name: 'Outros',
    value: CommonColors.Outros,
  },
];

const animalTypes = [
  {
    name: 'Cachorro',
    value: AnimalType.DOG,
  },
  {
    name: 'Gato',
    value: AnimalType.CAT,
  },
  {
    name: 'Outros',
    value: AnimalType.OTHER,
  },
];

export const isFile = (file: IFile | ImagePickerAsset): file is IFile => {
  return (file as IFile).id !== undefined;
};

export const AnimalForm = observer(function AnimalForm(props: AnimalFormProps) {
  const { style, onSubmit, initialValues } = props;
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const [formData, setFormData] = useState<AnimalFormData>({
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    temperament: initialValues?.temperament || '',
    castrated: initialValues?.castrated || AnimalCastrated.NO,
    dewormed: initialValues?.dewormed || AnimalDewormed.NO,
    size: initialValues?.size || AnimalSize.SMALL,
    color: initialValues?.color || CommonColors.Branco,
    type: initialValues?.type || AnimalType.DOG,
    files: initialValues?.files || [],
  });

  const $styles = [$container, style];

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...formData,
        ...initialValues,
      });
    }
  }, [initialValues]);

  const handleFormSubmit = () => {
    try {
      const animalFormData = {
        ...formData,
        files: images,
      };

      animalFormDataSchema.parse(animalFormData);
      onSubmit(animalFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          const fieldName = err.path[0] as keyof AnimalFormData;
          fieldErrors[fieldName] = err.message;
        });

        setFormErrors(fieldErrors);
      }
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return;
    }

    setImages([
      ...images,
      {
        ...result.assets[0],
      },
    ]);
  };

  const renderImage = (image: ImagePickerAsset | IFile | undefined) => {
    if (!image) {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: colors.palette.neutral500,
            width: 180,
            height: 180,
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={pickImage}
        >
          <AntDesign name="plus" size={42} color={colors.palette.neutral100} />
        </TouchableOpacity>
      );
    }

    const uri = isFile(image) ? image.url : image.uri;

    return (
      <TouchableOpacity style={{ marginLeft: spacing.xxxl }}>
        <Image source={{ uri }} style={{ width: 180, height: 180 }} />
      </TouchableOpacity>
    );
  };

  const renderImages = () => {
    const imgs: any[] = [undefined, ...images];

    if (formData.files.length > 0) {
      imgs.push(...formData.files);
    }

    return (
      <FlatList
        data={imgs}
        renderItem={({ item }) => renderImage(item)}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          marginBottom: spacing.xxl,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const onChange = (name: keyof AnimalFormData, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <View style={$styles}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: spacing.xxxl,
        }}
      >
        {renderImages()}
        {formErrors.files && (
          <Text
            style={{
              color: colors.palette.angry500,
              fontSize: 14,
              marginBottom: spacing.md,
            }}
          >
            {formErrors.files}
          </Text>
        )}
      </View>
      <View>
        <TextField
          label="Nome"
          LabelTextProps={{
            style: $text,
          }}
          containerStyle={{ marginBottom: spacing.md }}
          onChangeText={value => onChange('name', value)}
          status={formErrors.name ? 'error' : undefined}
          helper={formErrors.name}
          value={formData.name}
        />
        <TextField
          label="Descrição"
          LabelTextProps={{
            style: $text,
          }}
          containerStyle={{ marginBottom: spacing.md }}
          onChangeText={value => onChange('description', value)}
          status={formErrors.description ? 'error' : undefined}
          helper={formErrors.description}
          value={formData.description}
        />
        <TextField
          label="Temperamento"
          LabelTextProps={{
            style: $text,
          }}
          containerStyle={{ marginBottom: spacing.md }}
          onChangeText={value => onChange('temperament', value)}
          status={formErrors.temperament ? 'error' : undefined}
          helper={formErrors.temperament}
          value={formData.temperament}
        />
      </View>
      <View style={$containerSelectOptions}>
        <Text style={$text}>Castrado?</Text>
        <View style={$containerOptions}>
          <View style={$optionContainer}>
            <RadioButton
              value="YES"
              onPress={() => onChange('castrated', AnimalCastrated.YES)}
              status={
                formData.castrated === AnimalCastrated.YES
                  ? 'checked'
                  : 'unchecked'
              }
            />
            <Text>Sim</Text>
          </View>

          <View style={$optionContainer}>
            <RadioButton
              value="NO"
              onPress={() => onChange('castrated', AnimalCastrated.NO)}
              status={
                formData.castrated === AnimalCastrated.NO
                  ? 'checked'
                  : 'unchecked'
              }
            />
            <Text>Não</Text>
          </View>
        </View>
      </View>

      <View style={$containerSelectOptions}>
        <Text style={$text}>Vermifugado?</Text>
        <View style={$containerOptions}>
          <View style={$optionContainer}>
            <RadioButton
              value="YES"
              onPress={() => onChange('dewormed', AnimalDewormed.YES)}
              status={
                formData.dewormed === AnimalDewormed.YES
                  ? 'checked'
                  : 'unchecked'
              }
            />
            <Text>Sim</Text>
          </View>

          <View style={$optionContainer}>
            <RadioButton
              value="NO"
              onPress={() => onChange('dewormed', AnimalDewormed.NO)}
              status={
                formData.dewormed === AnimalDewormed.NO
                  ? 'checked'
                  : 'unchecked'
              }
            />
            <Text>Não</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={$pickerContainer}>
          <Text style={$text}>Porte</Text>
          <Picker style={$picker} selectedValue={formData.size}>
            {animalSizes.map(animalSize => (
              <Picker.Item
                key={animalSize.value}
                label={animalSize.name}
                value={animalSize.value}
              />
            ))}
          </Picker>
        </View>

        <View style={$pickerContainer}>
          <Text style={$text}>Cor</Text>
          <Picker style={$picker} selectedValue={formData.color}>
            {animalColors.map(animalColor => (
              <Picker.Item
                key={animalColor.value}
                label={animalColor.name}
                value={animalColor.value}
              />
            ))}
          </Picker>
        </View>

        <View style={$pickerContainer}>
          <Text style={$text}>Tipo</Text>
          <Picker style={$picker} selectedValue={formData.type}>
            {animalTypes.map(animalType => (
              <Picker.Item
                key={animalType.value}
                label={animalType.name}
                value={animalType.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={$button} onPress={handleFormSubmit}>
        <Text style={$buttonText}>
          {initialValues ? 'Editar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
const $buttonText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
  fontFamily: typography.primary.bold,
  textTransform: 'uppercase',
  lineHeight: 24,
};

const $button: ViewStyle = {
  marginTop: spacing.xl,
  backgroundColor: colors.palette.primary500,
  borderRadius: 4,
  paddingVertical: spacing.md,
  marginBottom: spacing.xl,
  justifyContent: 'center',
  alignItems: 'center',
};

const $pickerContainer: ViewStyle = {
  marginTop: spacing.md,
};

const $picker: ViewStyle = {
  backgroundColor: colors.palette.secondary100,
  marginTop: spacing.sm,
};

const $container: ViewStyle = {
  justifyContent: 'center',
  paddingHorizontal: spacing.md,
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 16,
  color: colors.palette.primary500,
};

const $containerSelectOptions: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: spacing.md,
};

const $containerOptions: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $optionContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 12,
};
