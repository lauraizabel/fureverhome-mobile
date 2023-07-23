import { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'app/components';

export interface FilterProps {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const { palette } = colors;

const FilterOptions = () => {
  return (
    <View
      style={{
        width: 300,
        height: 400,
        position: 'absolute',
        backgroundColor: palette.primary500,
        padding: 8,
        top: 1, // Adjust the position as needed to position the component correctly
        right: 1, // Adjust the position as needed to position the component correctly
        borderRadius: 8,
        shadowColor: palette.overlay50,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 9999,
      }}
    >
      <Text>Options</Text>
      <Text>Options</Text>
      <Text>Options</Text>
    </View>
  );
};

export const Filter = observer(function Filter(props: FilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const { style } = props;
  const $styles = [$container, style];

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <TouchableOpacity style={$styles} onPress={toggleFilter}>
      <AntDesign name="filter" size={24} color={palette.neutral100} />
      {showFilters && <FilterOptions />}
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  width: 36,
  borderRadius: 500,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.neutral100,
};
