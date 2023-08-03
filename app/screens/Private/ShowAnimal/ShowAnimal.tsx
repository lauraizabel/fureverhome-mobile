import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Header, Screen, Text } from 'app/components';
import { colors, spacing } from 'app/theme';
import { AppStackScreenProps } from 'app/navigators';
import { AnimalType } from '../../../enum/AnimalType';
import { AnimalSize } from '../../../enum/AnimalSize';
import { CommonColors } from '../../../enum/AnimalColors';
import { AnimalDewormed } from '../../../enum/AnimalDewormed';
import { AnimalCastrated } from '../../../enum/AnimalCastrated';
import { formatUserAddress } from '../../../core/utils/Address';
import { useAuth } from '../../../context/AuthContext';
import { callPhoneNumber } from '../../../core/utils/NumberPhone';
import { buildNoPhoto } from '../../../core/utils/Image';

type ShowAnimalScreenProps = AppStackScreenProps<'ShowAnimal'>;

export const ShowAnimal: FC<ShowAnimalScreenProps> = observer(
  function ShowAnimal({ route }) {
    const {
      params: { animal, isUserOwner },
    } = route;

    const buttonContent = isUserOwner ? 'Editar animal' : 'Entrar em contato';

    const translateType = (type: AnimalType) => {
      const enumToDescription = {
        [AnimalType.DOG]: 'Cachorro',
        [AnimalType.CAT]: 'Gato',
        [AnimalType.OTHER]: 'Outro',
      };

      return enumToDescription[type];
    };

    const translateSize = (size: AnimalSize) => {
      const enumToDescription = {
        [AnimalSize.SMALL]: 'Pequeno',
        [AnimalSize.MEDIUM]: 'Médio',
        [AnimalSize.LARGE]: 'Grande',
      };
      return enumToDescription[size];
    };

    const renderPictures = () => {
      if (animal.files.length <= 1) {
        return null;
      }

      return (
        <FlatList
          nestedScrollEnabled
          data={animal.files}
          horizontal
          renderItem={({ item, index }) => (
            <View style={{ marginTop: spacing.md }}>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: 150,
                  height: 150,
                  marginRight: spacing.sm,
                  borderRadius: 8,
                }}
              />
            </View>
          )}
          keyExtractor={item => item.fileId}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      );
    };

    return (
      <Screen style={{ flex: 1 }} preset="scroll">
        <Header allowBackButton />
        <View style={$initialDescriptionContainer}>
          <View>
            <Image
              source={{
                uri: animal?.files?.[0]?.url || 'https://placehold.co/400',
              }}
              style={$animalImage}
            />
          </View>
          <View style={$initialDescriptionTextContainer}>
            <View>
              <Text>{animal.name}</Text>
              <Text style={$typeText}>{translateType(animal.type)}</Text>
            </View>
            <View style={$separator} />
            <View>
              <View style={$descriptionTextContainer}>
                <Text style={$descriptionText}>Porte:</Text>
                <Text style={$descriptionText}>
                  {translateSize(animal.size)}
                </Text>
              </View>
              <View style={$descriptionTextContainer}>
                <Text style={$descriptionText}>Cor:</Text>
                <Text style={$descriptionText}>
                  {CommonColors[animal.color]}
                </Text>
              </View>
              <View style={$descriptionTextContainer}>
                <Text style={$descriptionText}>Castrado:</Text>
                <Text style={$descriptionText}>
                  {animal.castrated === AnimalCastrated.YES ? 'Sim' : 'Não'}
                </Text>
              </View>
              <View style={$descriptionTextContainer}>
                <Text style={$descriptionText}>Vermifugado:</Text>
                <Text style={$descriptionText}>
                  {animal.dewormed === AnimalDewormed.YES ? 'Sim' : 'Não'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={$textDescriptionContainer}>
          <Text style={$textDescription}>Descrição</Text>
          <View>
            <Text>{animal.description}</Text>
          </View>
          <View>{renderPictures()}</View>
        </View>
        <View style={$ownerContainer}>
          <Text style={$ownerContainerText}>Dono ou ONG</Text>
          <View style={$ownerContainerDescription}>
            <View>
              <Image
                source={{
                  uri:
                    animal.user?.picture?.url ??
                    buildNoPhoto(
                      `${animal.user.firstName} ${animal.user.lastName}`,
                    ),
                }}
                style={$userImage}
              />
            </View>
            <View style={$userInfo}>
              <Text style={{ marginBottom: 8 }}>
                {animal.user.firstName} {animal.user.lastName}
              </Text>
              <Text style={{ flexShrink: 1, marginBottom: 8 }}>
                {formatUserAddress(animal.user.userAddress)}
              </Text>
              <Text>{animal.user.phone}</Text>
            </View>
          </View>
        </View>
        <View style={$contactButtonContainer}>
          <TouchableOpacity style={$contactButton}>
            <Text style={$contactButtonText}>{buttonContent}</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  },
);
const $initialDescriptionContainer: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: spacing.lg,
};

const $animalImage: ImageStyle = {
  width: 150,
  height: 150,
  borderRadius: 8,
};

const $initialDescriptionTextContainer: ViewStyle = {
  marginLeft: 32,
  width: '45%',
};

const $typeText: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 14,
};

const $separator: ViewStyle = {
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
  borderTopWidth: 1,
  backgroundColor: colors.palette.neutral300,
};

const $descriptionTextContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const $descriptionText: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral500,
};

const $textDescriptionContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
};

const $textDescription: TextStyle = {
  fontSize: 17,
  color: colors.palette.primary500,
  fontWeight: '700',
  paddingBottom: spacing.xxs,
};

const $ownerContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.sm,
  borderWidth: 1,
  width: '95%',
  marginLeft: spacing.sm,
  borderRadius: 8,
  borderColor: colors.palette.neutral500,
};

const $ownerContainerText: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 18,
  marginTop: 12,
  marginBottom: 12,
};

const $ownerContainerDescription: ViewStyle = {
  flexDirection: 'row',
};

const $userImage: ImageStyle = {
  width: 150,
  height: 150,
  borderRadius: 4,
};

const $userInfo: ViewStyle = {
  marginLeft: 12,
  flex: 1,
};

const $contactButtonContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing.lg,
};

const $contactButton: ViewStyle = {
  padding: spacing.lg,
  backgroundColor: colors.palette.primary500,
  borderRadius: 12,
};

const $contactButtonText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
  textTransform: 'uppercase',
  fontWeight: '700',
};
