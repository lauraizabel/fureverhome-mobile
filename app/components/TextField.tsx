import React, {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { colors, spacing, typography } from '../theme';
import { Text, TextProps } from './Text';

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  status?: 'error' | 'disabled';

  label?: TextProps['text'];

  LabelTextProps?: TextProps;

  helper?: TextProps['text'];

  HelperTextProps?: TextProps;

  placeholder?: TextProps['text'];

  style?: StyleProp<TextStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  inputWrapperStyle?: StyleProp<ViewStyle>;

  RightAccessory?: ComponentType<TextFieldAccessoryProps>;

  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;

  maskedInput?: boolean;

  maskedInputOptions?: TextInputMaskOptionProp;

  maskedInputType?: TextInputMaskTypeProp;
}

export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    maskedInput,
    maskedInputOptions,
    maskedInputType,
    ...rest
  } = props;
  const input = useRef<TextInput | undefined>();

  const disabled = rest.editable === false || status === 'disabled';

  const placeholderContent = placeholder;

  const $containerStyles = [$containerStyleOverride];

  const $labelStyles = [$labelStyle, LabelTextProps?.style];

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === 'error' && { borderColor: colors.error },
    rest.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ];

  const $inputStyles = [
    $inputStyle,
    disabled && { color: colors.textDim },
    rest.multiline && { height: 'auto' },
    $inputStyleOverride,
  ];

  const $helperStyles = [
    $helperStyle,
    status === 'error' && { color: colors.error },
    HelperTextProps?.style,
  ];

  function focusInput() {
    if (disabled) return;

    input.current?.focus();
  }

  useImperativeHandle(ref, () => input?.current);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!label && (
        <Text
          preset="formLabel"
          text={label}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={!!rest.multiline}
          />
        )}
        {maskedInput && (
          <TextInputMask
            type={maskedInputType || 'cel-phone'}
            underlineColorAndroid={colors.transparent}
            textAlignVertical="top"
            placeholder={placeholderContent}
            placeholderTextColor={colors.textDim}
            {...rest}
            editable={!disabled}
            style={$inputStyles}
            ref={input}
            options={maskedInputOptions}
          />
        )}
        {!maskedInput && (
          <TextInput
            ref={input}
            underlineColorAndroid={colors.transparent}
            textAlignVertical="top"
            placeholder={placeholderContent}
            placeholderTextColor={colors.textDim}
            {...rest}
            editable={!disabled}
            style={$inputStyles}
          />
        )}
        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={!!rest.multiline}
          />
        )}
      </View>

      {!!helper && (
        <Text
          preset="formHelper"
          text={helper}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  );
});

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
};

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.palette.neutral400,
  overflow: 'hidden',
};

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'stretch',
  fontFamily: typography.primary.regular,
  color: colors.text,
  fontSize: 16,
  height: 24,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
  marginHorizontal: spacing.sm,
};

const $helperStyle: TextStyle = {
  marginTop: spacing.xs,
};

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
};
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.xs,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
};
