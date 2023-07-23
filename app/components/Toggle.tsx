import React, { ComponentType, FC, useMemo } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  SwitchProps,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing } from '../theme';
import { iconRegistry, IconTypes } from './Icon';
import { Text, TextProps } from './Text';

type Variants = 'checkbox' | 'switch' | 'radio';

interface BaseToggleProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: unknown;
  status?: 'error' | 'disabled';
  editable?: TextInputProps['editable'];
  value?: boolean;
  onValueChange?: SwitchProps['onValueChange'];
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputOuterStyle?: ViewStyle;
  inputInnerStyle?: ViewStyle;
  labelPosition?: 'left' | 'right';
  label?: TextProps['text'];
  labelStyle?: StyleProp<TextStyle>;
  LabelTextProps?: TextProps;
  helper?: TextProps['text'];
  HelperTextProps?: TextProps;
}

interface CheckboxToggleProps extends BaseToggleProps {
  variant?: 'checkbox';
  inputDetailStyle?: ImageStyle;
  checkboxIcon?: IconTypes;
}

interface RadioToggleProps extends BaseToggleProps {
  variant?: 'radio';
  inputDetailStyle?: ViewStyle;
}

interface SwitchToggleProps extends BaseToggleProps {
  variant?: 'switch';
  switchAccessibilityMode?: 'text' | 'icon';
  inputDetailStyle?: Omit<ViewStyle, 'width' | 'height'> & { width?: number; height?: number };
}

export type ToggleProps = CheckboxToggleProps | RadioToggleProps | SwitchToggleProps;

interface ToggleInputProps {
  on: boolean;
  status: BaseToggleProps['status'];
  disabled: boolean;
  outerStyle: ViewStyle;
  innerStyle: ViewStyle;
  detailStyle: Omit<ViewStyle & ImageStyle, 'overflow'>;
  switchAccessibilityMode?: SwitchToggleProps['switchAccessibilityMode'];
  checkboxIcon?: CheckboxToggleProps['checkboxIcon'];
}

export function Toggle(props: ToggleProps) {
  const {
    variant = 'checkbox',
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = 'right',
    helper,
    HelperTextProps,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...WrapperProps
  } = props;

  const { switchAccessibilityMode } = props as SwitchToggleProps;
  const { checkboxIcon } = props as CheckboxToggleProps;

  const disabled = editable === false || status === 'disabled' || props.disabled;

  const Wrapper = useMemo<ComponentType<TouchableOpacityProps>>(
    () => (disabled ? View : TouchableOpacity),
    [disabled],
  );
  const ToggleInput = useMemo(() => ToggleInputs[variant] || (() => null), [variant]);

  const $containerStyles = [$containerStyleOverride];
  const $inputWrapperStyles = [$inputWrapper, $inputWrapperStyleOverride];
  const $helperStyles = [
    $helper,
    status === 'error' && { color: colors.error },
    HelperTextProps?.style,
  ];

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return;
    onValueChange?.(!value);
    onPress?.(e);
  }

  return (
    <Wrapper
      activeOpacity={1}
      accessibilityRole={variant}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyles}
      onPress={handlePress}
    >
      <View style={$inputWrapperStyles}>
        {labelPosition === 'left' && <FieldLabel {...props} labelPosition={labelPosition} />}

        <ToggleInput
          on={!!value}
          disabled={!!disabled}
          status={status}
          outerStyle={props.inputOuterStyle}
          innerStyle={props.inputInnerStyle}
          detailStyle={props.inputDetailStyle}
          switchAccessibilityMode={switchAccessibilityMode}
          checkboxIcon={checkboxIcon}
        />

        {labelPosition === 'right' && <FieldLabel {...props} labelPosition={labelPosition} />}
      </View>

      {!!(helper ) && (
        <Text
          preset="formHelper"
          text={helper}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </Wrapper>
  );
}

const ToggleInputs: Record<Variants, FC<ToggleInputProps>> = {
  checkbox: Checkbox,
  switch: Switch,
  radio: Radio,
};

function Checkbox(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    checkboxIcon,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props;

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === 'error' && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0];

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === 'error' && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0];

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === 'error' && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0];

  const iconTintColor = [
    disabled && colors.palette.neutral600,
    status === 'error' && colors.error,
    colors.palette.accent100,
  ].filter(Boolean)[0];

  return (
    <View
      style={[
        $inputOuterVariants.checkbox,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $checkboxInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <Image
          source={iconRegistry[checkboxIcon] || iconRegistry.check}
          style={[$checkboxDetail, { tintColor: iconTintColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  );
}

function Radio(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props;

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === 'error' && colors.errorBackground,
    colors.palette.neutral200,
  ].filter(Boolean)[0];

  const outerBorderColor = [
    disabled && colors.palette.neutral400,
    status === 'error' && colors.error,
    !on && colors.palette.neutral800,
    colors.palette.secondary500,
  ].filter(Boolean)[0];

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === 'error' && colors.errorBackground,
    colors.palette.neutral100,
  ].filter(Boolean)[0];

  const dotBackgroundColor = [
    disabled && colors.palette.neutral600,
    status === 'error' && colors.error,
    colors.palette.secondary500,
  ].filter(Boolean)[0];

  return (
    <View
      style={[
        $inputOuterVariants.radio,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $radioInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      >
        <View
          style={[$radioDetail, { backgroundColor: dotBackgroundColor }, $detailStyleOverride]}
        />
      </Animated.View>
    </View>
  );
}

function Switch(props: ToggleInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props;

  const knobSizeFallback = 2;

  const knobWidth = [$detailStyleOverride?.width, $switchDetail?.width, knobSizeFallback].find(
    v => typeof v === 'number',
  );

  const knobHeight = [$detailStyleOverride?.height, $switchDetail?.height, knobSizeFallback].find(
    v => typeof v === 'number',
  );

  const offBackgroundColor = [
    disabled && colors.palette.neutral400,
    status === 'error' && colors.errorBackground,
    colors.palette.neutral300,
  ].filter(Boolean)[0];

  const onBackgroundColor = [
    disabled && colors.transparent,
    status === 'error' && colors.errorBackground,
    colors.palette.secondary500,
  ].filter(Boolean)[0];

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === 'error' && colors.error,
        disabled && colors.palette.neutral600,
        colors.palette.neutral100,
      ].filter(Boolean)[0];
    }
    return [
      $innerStyleOverride?.backgroundColor,
      disabled && colors.palette.neutral600,
      status === 'error' && colors.error,
      colors.palette.neutral200,
    ].filter(Boolean)[0];
  })();

  const $animatedSwitchKnob = useAnimatedStyle(() => {
    const offsetLeft = ($innerStyleOverride?.paddingStart ||
      $innerStyleOverride?.paddingLeft ||
      $switchInner?.paddingStart ||
      $switchInner?.paddingLeft ||
      0) as number;

    const offsetRight = ($innerStyleOverride?.paddingEnd ||
      $innerStyleOverride?.paddingRight ||
      $switchInner?.paddingEnd ||
      $switchInner?.paddingRight ||
      0) as number;

    const start = withTiming(on ? '100%' : '0%');
    const marginStart = withTiming(on ? -(knobWidth || 0) - offsetRight : 0 + offsetLeft);

    return { start, marginStart };
  }, [on, knobWidth]);

  return (
    <View
      style={[
        $inputOuterVariants.switch,
        { backgroundColor: offBackgroundColor },
        $outerStyleOverride,
      ]}
    >
      <Animated.View
        style={[
          $switchInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          useAnimatedStyle(() => ({ opacity: withTiming(on ? 1 : 0) }), [on]),
        ]}
      />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <Animated.View
        style={[
          $switchDetail,
          $detailStyleOverride,
          $animatedSwitchKnob,
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor },
        ]}
      />
    </View>
  );
}

function SwitchAccessibilityLabel(props: ToggleInputProps & { role: 'on' | 'off' }) {
  const { on, disabled, status, switchAccessibilityMode, role, innerStyle, detailStyle } = props;

  if (!switchAccessibilityMode) return null;

  const shouldLabelBeVisible = (on && role === 'on') || (!on && role === 'off');

  const $switchAccessibilityStyle = [
    $switchAccessibility,
    role === 'off' && { end: '5%' },
    role === 'on' && { left: '5%' },
  ];

  const color = (function () {
    if (disabled) return colors.palette.neutral600;
    if (status === 'error') return colors.error;
    if (!on) return innerStyle?.backgroundColor || colors.palette.secondary500;
    return detailStyle?.backgroundColor || colors.palette.neutral100;
  })();

  return (
    <View style={$switchAccessibilityStyle}>
      {switchAccessibilityMode === 'text' && shouldLabelBeVisible && (
        <View
          style={[
            role === 'on' && $switchAccessibilityLine,
            role === 'on' && { backgroundColor: color },
            role === 'off' && $switchAccessibilityCircle,
            role === 'off' && { borderColor: color },
          ]}
        />
      )}

      {switchAccessibilityMode === 'icon' && shouldLabelBeVisible && (
        <Image
          style={[$switchAccessibilityIcon, { tintColor: color }]}
          source={role === 'off' ? iconRegistry.hidden : iconRegistry.view}
        />
      )}
    </View>
  );
}

function FieldLabel(props: BaseToggleProps) {
  const {
    status,
    label,
    LabelTextProps,
    labelPosition,
    labelStyle: $labelStyleOverride,
  } = props;

  if (!label && !LabelTextProps?.children) return null;

  const $labelStyle = [
    $label,
    status === 'error' && { color: colors.error },
    labelPosition === 'right' && $labelRight,
    labelPosition === 'left' && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ];

  return (
    <Text
      preset="formLabel"
      text={label}
      {...LabelTextProps}
      style={$labelStyle}
    />
  );
}

const $inputWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: 'center',
  overflow: 'hidden',
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: 'space-between',
  flexDirection: 'row',
};

const $inputOuterVariants: Record<Variants, StyleProp<ViewStyle>> = {
  checkbox: [$inputOuterBase, { borderRadius: 4 }],
  radio: [$inputOuterBase, { borderRadius: 12 }],
  switch: [$inputOuterBase, { height: 32, width: 56, borderRadius: 16, borderWidth: 0 }],
};

const $checkboxInner: ViewStyle = {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const $checkboxDetail: ImageStyle = {
  width: 20,
  height: 20,
  resizeMode: 'contain',
};

const $radioInner: ViewStyle = {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const $radioDetail: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
};

const $switchInner: ViewStyle = {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  borderColor: colors.transparent,
  overflow: 'hidden',
  position: 'absolute',
  paddingStart: 4,
  paddingEnd: 4,
};

const $switchDetail: SwitchToggleProps['inputDetailStyle'] = {
  borderRadius: 12,
  position: 'absolute',
  width: 24,
  height: 24,
};

const $helper: TextStyle = {
  marginTop: spacing.xs,
};

const $label: TextStyle = {
  flex: 1,
};

const $labelRight: TextStyle = {
  marginStart: spacing.md,
};

const $labelLeft: TextStyle = {
  marginEnd: spacing.md,
};

const $switchAccessibility: TextStyle = {
  width: '40%',
  justifyContent: 'center',
  alignItems: 'center',
};

const $switchAccessibilityIcon: ImageStyle = {
  width: 14,
  height: 14,
  resizeMode: 'contain',
};

const $switchAccessibilityLine: ViewStyle = {
  width: 2,
  height: 12,
};

const $switchAccessibilityCircle: ViewStyle = {
  borderWidth: 2,
  width: 12,
  height: 12,
  borderRadius: 6,
};
