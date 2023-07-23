import * as React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';

export interface BadgeProps {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  label: string;
  selected?: boolean;
  onPress?: () => unknown | void;
}

export const Badge = observer(function Badge(props: BadgeProps) {
  const { style, label, labelStyle, selected, onPress } = props;
  const $styles = [$container, style];

  if (selected) {
    $styles.push($containerSelected);
  }

  const $labelStyles = [$text, labelStyle];
  return (
    <TouchableOpacity style={$styles} onPress={onPress}>
      <Text style={$labelStyles}>{label}</Text>
    </TouchableOpacity>
  );
});

const $containerSelected: ViewStyle = {
  backgroundColor: colors.palette.primary600,
};

const $container: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  width: 80,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.neutral100,
};
