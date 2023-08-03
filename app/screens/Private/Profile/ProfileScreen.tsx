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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { buildNoPhoto } from '../../../core/utils/Image';

type ProfileScreenProps = TabStackScreenProps<'Profile'>;

export const ProfileScreen: FC<ProfileScreenProps> = observer(
  function ProfileScreen(props) {
    const { user } = useAuth();
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

    return (
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
            <TouchableOpacity style={$actionButton} onPress={goToMyAnimalPage}>
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
            <TouchableOpacity style={$actionProfileButton}>
              <Ionicons
                name="pencil"
                size={24}
                color={colors.palette.neutral100}
              />
              <Text style={$actionProfileButtonText}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={$actionProfileButton}>
              <Feather
                name="trash"
                size={24}
                color={colors.palette.neutral100}
              />
              <Text style={$actionProfileButtonText}>Apagar perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
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
