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
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { IAnimal } from 'app/data/models';
import { useNavigation } from '@react-navigation/native';

export interface AnimalListProps {
  style?: StyleProp<ViewStyle>;
  allowActions?: boolean;
  animal: IAnimal;
  goToAnimalDetails: () => void;
}

export const AnimalList = observer(function AnimalList(props: AnimalListProps) {
  const { style, allowActions, animal, goToAnimalDetails } = props;
  const $styles = [$container, style];

  const renderAction = () => {
    if (allowActions) {
      return (
        <View>
          <TouchableOpacity style={$actionContainer}>
            <AntDesign
              name="check"
              size={16}
              color={colors.palette.neutral100}
            />
          </TouchableOpacity>
          <TouchableOpacity style={$actionContainer}>
            <Ionicons
              name="pencil"
              size={16}
              color={colors.palette.neutral100}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Octicons
        name="chevron-right"
        size={24}
        color={colors.palette.primary500}
      />
    );
  };

  return (
    <TouchableOpacity style={$styles} onPress={goToAnimalDetails}>
      <View style={$imageContainer}>
        <Image
          source={{
            uri: animal?.files?.[0]?.url || 'https://placehold.co/400',
          }}
          style={$image}
        />
      </View>
      <View style={$infoContainer}>
        <Text style={$name}>{animal.name}</Text>
        <Text style={$description}>{animal.description}</Text>
        <View style={$locationContainer}>
          <Ionicons
            name="location-sharp"
            size={18}
            color={colors.palette.primary500}
          />
          <Text style={$locationText}>Recife (7.2km)</Text>
        </View>
      </View>
      <View style={$arrowContainer}>{renderAction()}</View>
    </TouchableOpacity>
  );
});

const $actionContainer: ViewStyle = {
  backgroundColor: colors.palette.primary300,
  height: 30,
  width: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 16,
  marginTop: 6,
};

const $container: ViewStyle = {
  borderTopColor: colors.palette.neutral700,
  borderBottomColor: colors.palette.neutral700,
  borderTopWidth: 0.6,
  // borderBottomWidth: 0.6,
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
  color: colors.palette.neutral700,
  fontSize: 16,
  fontFamily: typography.primary.normal,
};

const $description: TextStyle = {
  color: colors.palette.primary500,
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
