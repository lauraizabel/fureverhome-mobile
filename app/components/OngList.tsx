import * as React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { AnimalType } from 'app/enum/AnimalType';
import { IOng } from '../data/models/Ong';

export interface OngListProps {
  style?: StyleProp<ViewStyle>;
  ong: IOng;
  selectOng: () => void;
}

export const animalsTypeToIcon = {
  [AnimalType.DOG]: (
    <MaterialCommunityIcons
      name="dog-side"
      size={16}
      key={AnimalType.DOG}
      color={colors.palette.primary500}
    />
  ),
  [AnimalType.CAT]: (
    <MaterialCommunityIcons
      name="cat"
      size={16}
      color={colors.palette.primary500}
      key={AnimalType.CAT}
    />
  ),
  [AnimalType.OTHER]: (
    <AntDesign
      name="ellipsis1"
      size={16}
      color={colors.palette.primary500}
      key={AnimalType.OTHER}
    />
  ),
};

export const renderAnimalType = (animalTypes: AnimalType[]) => {
  const types = animalTypes.map(type => animalsTypeToIcon[type]);
  return types;
};

export const OngList = observer(function OngList(props: OngListProps) {
  const { style, ong, selectOng } = props;
  const $styles = [$container, style];
  const lines = 3;

  return (
    <TouchableOpacity style={$styles} onPress={selectOng}>
      <View style={$imageContainer}>
        <Image
          source={{
            uri:
              ong.picture?.url ||
              `https://ui-avatars.com/api/?name=${ong.firstName}+${
                ong.lastName
              }?size=${100}`,
          }}
          style={$image}
        />
      </View>
      <View style={$infoContainer}>
        <Text style={$name}>
          {ong.firstName} {ong.lastName}
        </Text>
        <Text style={$description} numberOfLines={lines}>
          {ong.description}
        </Text>
        <View style={$iconsContainer}>
          <View style={$locationContainer}>
            <Ionicons
              name="location-sharp"
              size={18}
              color={colors.palette.primary500}
            />
            <Text style={$locationText}>João Pessoa (5.5km)</Text>
          </View>
          <View style={$animalTypeContainer}>
            <MaterialIcons
              name="pets"
              size={18}
              color={colors.palette.primary500}
            />
            <View style={$animalTypeIconContainer}>
              {renderAnimalType(ong.animalTypes)}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const $animalTypeIconContainer: ViewStyle = {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.neutral600,
  flexDirection: 'row',
  marginLeft: 6,
  alignItems: 'center',
  padding: 4,
};

const $iconsContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $animalTypeContainer: ViewStyle = {
  marginLeft: 12,
  flexDirection: 'row',
  alignItems: 'center',
};

const $container: ViewStyle = {
  borderColor: colors.palette.neutral300,
  borderRadius: 8,
  borderWidth: 1,
  alignItems: 'center',
  flexDirection: 'row',
  padding: 8,
};

const $imageContainer: ViewStyle = {
  marginRight: 12,
};

const $image: ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 12,
};

const $infoContainer: ViewStyle = {
  flex: 1,
  width: '60%',
};

const $name: TextStyle = {
  color: colors.palette.neutral500,
  fontSize: 16,
  fontFamily: typography.primary.normal,
};

const $description: TextStyle = {
  color: colors.palette.neutral400,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  marginTop: 2,
  marginBottom: 8,
};

const $locationContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 6,
};

const $locationText: TextStyle = {
  fontSize: 12,
  color: colors.palette.primary500,
  marginLeft: 5,
  fontFamily: typography.primary.normal,
};

const $arrowContainer: ViewStyle = {
  marginLeft: 12,
};
