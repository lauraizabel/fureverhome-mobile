import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { AntDesign } from '@expo/vector-icons';
import { Select, Text } from 'app/components';
import { colors } from 'app/theme';

export interface Option {
  label: string;
  value: string;
}

export interface Filter {
  label: string;
  fieldKey: string;
  options: Option[];
}

export interface FilterProps {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  filterOptions: Filter[];
  onCancel: () => void;
  onApply: () => void;
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  onChangeValues: (field: string, value: string) => void;
  values: Record<string, string>;
}

const { palette } = colors;

export const FilterComponent = observer(function Filter(props: FilterProps) {
  const {
    style,
    filterOptions,
    onCancel,
    onApply,
    setShowFilter,
    showFilter,
    onChangeValues,
  } = props;
  const $styles = [$container, style];

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <TouchableOpacity style={$styles} onPress={toggleFilter}>
        <AntDesign name="filter" size={24} color={palette.neutral100} />
      </TouchableOpacity>
      {showFilter && (
        <View
          style={{
            backgroundColor: palette.primary500,
            zIndex: 50,
            elevation: 50,
            position: 'absolute',
            width: 320,
            top: 0,
            right: 0,
            padding: 16,
            borderRadius: 8,
          }}
        >
          {filterOptions.map(filter => (
            <View key={filter.label}>
              <Text
                style={{
                  color: palette.neutral100,
                }}
              >
                {filter.label}
              </Text>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  overflow: 'hidden',
                  borderColor: 'transparent',
                }}
              >
                <Select
                  options={filter.options}
                  onChange={item => onChangeValues(filter.fieldKey, item.value)}
                  key={filter.label}
                  value={props.values[filter.label]}
                />
              </View>
            </View>
          ))}
          <View
            style={{
              marginTop: 16,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={onCancel}>
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
              onPress={onApply}
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
      )}
    </>
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
