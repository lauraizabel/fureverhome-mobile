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
import { Text, animalSizes } from 'app/components';
import { Picker } from '@react-native-picker/picker';

export interface FilterProps {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  renderFilter?: () => JSX.Element;
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
        top: 1,
        right: 1,
        borderRadius: 8,
        shadowColor: palette.overlay50,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 9999,
      }}
    >
      <View>
        <Text
          style={{
            color: palette.neutral100,
          }}
        >
          Porte
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: 'transparent',
          }}
        >
          <Picker
            style={{
              color: palette.primary500,
              backgroundColor: palette.neutral100,
            }}
          >
            {animalSizes.map(size => (
              <Picker.Item
                label={size.name}
                value={size.value}
                key={size.name}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: palette.neutral100,
          }}
        >
          Sexo
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: 'transparent',
          }}
        >
          <Picker
            style={{
              color: palette.primary500,
              backgroundColor: palette.neutral100,
            }}
          >
            <Picker.Item label="Selecione uma opção" value="" />
          </Picker>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: palette.neutral100,
          }}
        >
          Idade
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: 'transparent',
          }}
        >
          <Picker
            style={{
              color: palette.primary500,
              backgroundColor: palette.neutral100,
            }}
          >
            <Picker.Item label="Selecione uma opção" value="" />
          </Picker>
        </View>
      </View>

      <View>
        <Text
          style={{
            color: palette.neutral100,
          }}
        >
          Próximidade
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: 'transparent',
          }}
        >
          <Picker
            style={{
              color: palette.primary500,
              backgroundColor: palette.neutral100,
            }}
          >
            <Picker.Item label="Selecione uma opção" value="" />
          </Picker>
        </View>
      </View>
      <View
        style={{
          marginTop: 16,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              color: palette.neutral100,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: palette.neutral100,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: palette.primary500,
              fontWeight: '600',
            }}
          >
            Pesquisar
          </Text>
        </TouchableOpacity>
      </View>
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
      {showFilters && (
        <View>
          <FilterOptions />
        </View>
      )}
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
