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

export interface OngListProps {
  style?: StyleProp<ViewStyle>;
}

const animalsTypeToIcon = {
  [AnimalType.DOG]: (
    <MaterialCommunityIcons
      name="dog-side"
      size={16}
      color={colors.palette.primary500}
    />
  ),
  [AnimalType.CAT]: (
    <MaterialCommunityIcons
      name="cat"
      size={16}
      color={colors.palette.primary500}
    />
  ),
  [AnimalType.OTHER]: (
    <AntDesign name="ellipsis1" size={16} color={colors.palette.primary500} />
  ),
};

export const OngList = observer(function OngList(props: OngListProps) {
  const { style } = props;
  const $styles = [$container, style];

  return (
    <TouchableOpacity style={$styles}>
      <View style={$imageContainer}>
        <Image source={{ uri: 'https://picsum.photos/200' }} style={$image} />
      </View>
      <View style={$infoContainer}>
        <Text style={$name}>Patas Felizes</Text>
        <Text style={$description}>
          A Patas Felizes é uma ONG de animais dedicada ao resgate, cuidado e
          proteção dos animais em....
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
              {animalsTypeToIcon[AnimalType.CAT]}
              {animalsTypeToIcon[AnimalType.DOG]}
              {animalsTypeToIcon[AnimalType.OTHER]}
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
