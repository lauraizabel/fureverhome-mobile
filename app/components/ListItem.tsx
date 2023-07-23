import React, { ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '../theme';
import { Icon, IconTypes } from './Icon';
import { Text, TextProps } from './Text';

export interface ListItemProps extends TouchableOpacityProps {
  height?: number;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  text?: TextProps['text'];
  children?: TextProps['children'];
  textStyle?: StyleProp<TextStyle>;
  TextProps?: TextProps;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  leftIcon?: IconTypes;
  leftIconColor?: string;
  rightIcon?: IconTypes;
  rightIconColor?: string;
  RightComponent?: ReactElement;
  LeftComponent?: ReactElement;
}

interface ListItemActionProps {
  icon: IconTypes;
  iconColor?: string;
  Component?: ReactElement;
  size: number;
  side: 'left' | 'right';
}

export function ListItem(props: ListItemProps) {
  const {
    bottomSeparator,
    children,
    height = 56,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    style,
    text,
    TextProps,
    topSeparator,
    textStyle: $textStyleOverride,
    containerStyle: $containerStyleOverride,
    ...TouchableOpacityProps
  } = props;

  const $textStyles = [$textStyle, $textStyleOverride, TextProps?.style];

  const $containerStyles = [
    topSeparator && $separatorTop,
    bottomSeparator && $separatorBottom,
    $containerStyleOverride,
  ];

  const $touchableStyles = [$touchableStyle, { minHeight: height }, style];

  return (
    <View style={$containerStyles}>
      <TouchableOpacity {...TouchableOpacityProps} style={$touchableStyles}>
        <ListItemAction
          side="left"
          size={height}
          icon={leftIcon}
          iconColor={leftIconColor}
          Component={LeftComponent}
        />

        <Text {...TextProps}  text={text}  style={$textStyles}>
          {children}
        </Text>

        <ListItemAction
          side="right"
          size={height}
          icon={rightIcon}
          iconColor={rightIconColor}
          Component={RightComponent}
        />
      </TouchableOpacity>
    </View>
  );
}

function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props;

  const $iconContainerStyles = [$iconContainer];

  if (Component) return Component;

  if (icon) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[
          $iconContainerStyles,
          side === 'left' && $iconContainerLeft,
          side === 'right' && $iconContainerRight,
          { height: size },
        ]}
      />
    );
  }

  return null;
}

const $separatorTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.separator,
};

const $separatorBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
};

const $textStyle: TextStyle = {
  paddingVertical: spacing.xs,
  alignSelf: 'center',
  flexGrow: 1,
  flexShrink: 1,
};

const $touchableStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
};

const $iconContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 0,
};
const $iconContainerLeft: ViewStyle = {
  marginEnd: spacing.md,
};

const $iconContainerRight: ViewStyle = {
  marginStart: spacing.md,
};
