import * as React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Option } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { Dropdown } from 'react-native-element-dropdown';

export interface SelectProps {
  style?: StyleProp<ViewStyle>;
  options: Option[];
  onChange: (item: Option) => void;
  value: string;
}

export const Select = observer(function Select(props: SelectProps) {
  const { style, options, onChange, value } = props;

  return (
    <Dropdown
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selecione uma opção"
      onChange={item => {
        onChange(item);
      }}
      value={value}
      style={{
        backgroundColor: colors.palette.neutral100,
      }}
      placeholderStyle={{
        color: colors.palette.neutral800,
        paddingLeft: 10,
      }}
    />
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
};
