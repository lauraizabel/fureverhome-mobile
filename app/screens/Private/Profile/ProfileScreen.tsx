import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Header, Screen, Text } from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { colors, spacing } from 'app/theme';
import { useAuth } from 'app/context/AuthContext';
import { AppStackScreenProps } from 'app/navigators';
import Modal from 'react-native-modal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { buildNoPhoto } from '../../../core/utils/Image';

type ProfileScreenProps = TabStackScreenProps<'Profile'> &
  AppStackScreenProps<'Main'>;

export const ProfileScreen: FC<ProfileScreenProps> = observer(
  function ProfileScreen(props) {
    const { user, logout } = useAuth();
    const [openModal, setOpenModal] = React.useState(false);
    const onRemoveUser = async () => {
      try {
        setOpenModal(false);
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao remover animal',
          text2: 'Tente novamente mais tarde',
        });
      }
    };
    const { navigation } = props;
    const goToMyAnimalPage = () => {
      navigation.navigate('Animal');
    };

    const formatAddress = () => {
      if (user?.userAddress) {
        let address = '';
        address = user?.userAddress.street;
        if (user.userAddress.number) {
          address += `, ${user.userAddress.number}`;
        }
        address += ` - ${user.userAddress.city}, ${user.userAddress.state}`;
        return address;
      }
      return null;
    };

    const goToCreateAnimalPage = () => {
      navigation.navigate('CreateAnimal');
    };

    const goToEditProfilePage = () => {
      navigation.navigate('EditProfile');
    };

    const onLogout = async () => {
      await logout();
      navigation.navigate('Welcome');
    };

    return (
      <>
        <Screen style={$root} preset="scroll">
          <Header />
          <View style={$container}>
            <View style={$imageContainer}>
              <Image
                source={{
                  uri:
                    user?.picture?.url ||
                    buildNoPhoto(`${user?.firstName} ${user?.lastName}`),
                }}
                style={$image}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={$fieldsContainer}>
                <AntDesign
                  name="user"
                  size={24}
                  color={colors.palette.primary500}
                />
                <Text style={$fieldText}>
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
              <View style={$fieldsContainer}>
                <AntDesign
                  name="phone"
                  size={24}
                  color={colors.palette.primary500}
                />
                <Text style={$fieldText}>{user?.phone || 'Não informado'}</Text>
              </View>
              <View style={$fieldsContainer}>
                <Feather
                  name="map-pin"
                  size={24}
                  color={colors.palette.primary500}
                />
                <Text style={$fieldText}>{formatAddress()}</Text>
              </View>
            </View>
            <View style={$actionButtonsContainer}>
              <TouchableOpacity
                style={$actionButton}
                onPress={goToMyAnimalPage}
              >
                <MaterialCommunityIcons
                  name="dog"
                  size={24}
                  color={colors.palette.neutral100}
                />
                <Text style={$actionButtonText}>Meus animais</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={$actionButton}
                onPress={goToCreateAnimalPage}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color={colors.palette.neutral100}
                />
                <Text style={$actionButtonText}>Adicionar animal</Text>
              </TouchableOpacity>
            </View>
            <View style={$actionProfileButtonsContainer}>
              <TouchableOpacity
                style={$actionProfileButton}
                onPress={goToEditProfilePage}
              >
                <Ionicons
                  name="pencil"
                  size={24}
                  color={colors.palette.neutral100}
                />
                <Text style={$actionProfileButtonText}>Editar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={$actionProfileButton}
                onPress={() => setOpenModal(true)}
              >
                <Feather
                  name="trash"
                  size={24}
                  color={colors.palette.neutral100}
                />
                <Text style={$actionProfileButtonText}>Apagar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  $actionProfileButton,
                  { backgroundColor: colors.palette.neutral700 },
                ]}
                onPress={() => onLogout()}
              >
                <Ionicons
                  name="exit"
                  size={24}
                  color={colors.palette.neutral100}
                />
                <Text style={$actionProfileButtonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Screen>
        <View>
          <Modal
            isVisible={openModal}
            animationIn="fadeIn"
            onBackdropPress={() => setOpenModal(false)}
          >
            <View
              style={{
                backgroundColor: colors.palette.neutral100,
                padding: spacing.md,
                borderRadius: 4,
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Tem certeza que deseja excluir sua conta? Todos os seus dados
                serão perdidos.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.palette.primary500,
                    padding: spacing.sm,
                    borderRadius: 4,
                    marginTop: spacing.sm,
                    width: '40%',
                  }}
                  onPress={() => onRemoveUser()}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Sim
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.palette.neutral100,
                    padding: spacing.sm,
                    borderRadius: 4,
                    marginTop: spacing.sm,
                    width: '40%',
                    borderColor: colors.palette.primary500,
                    borderWidth: 1,
                    marginLeft: spacing.sm,
                  }}
                  onPress={() => setOpenModal(false)}
                >
                  <Text style={{ textAlign: 'center' }}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  },
);

const $actionProfileButtonsContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 32,
  paddingBottom: 32,
};

const $actionProfileButtonText: TextStyle = {
  color: colors.palette.neutral100,
  fontWeight: '600',
  fontSize: 14,
  marginLeft: 32,
};

const $actionProfileButton: ViewStyle = {
  backgroundColor: colors.palette.angry500,
  paddingHorizontal: 12,
  paddingVertical: 14,
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 12,
  width: '90%',
  marginBottom: 12,
};

const $actionButtonsContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 32,
  justifyContent: 'space-around',
};

const $actionButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  paddingHorizontal: 12,
  paddingVertical: 24,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 24,
};

const $actionButtonText: TextStyle = {
  color: colors.palette.neutral100,
  fontWeight: '600',
  fontSize: 14,
};

const $fieldText: TextStyle = {
  marginLeft: 12,
  color: colors.palette.neutral500,
};

const $fieldsContainer: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.lg,
  borderWidth: 0.7,
  marginTop: 12,
  width: '90%',
  borderRadius: 8,
  backgroundColor: colors.palette.neutral100,
};

const $imageContainer: ViewStyle = {
  marginTop: 40,
  justifyContent: 'center',
  alignItems: 'center',
};

const $root: ViewStyle = {
  flex: 1,
};

const $container: ViewStyle = {};
const $image: ImageStyle = {
  width: 240,
  height: 240,
  borderRadius: 500,
};
