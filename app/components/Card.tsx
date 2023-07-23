import React, { ComponentType, Fragment, ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '../theme';
import { Text, TextProps } from './Text';

type Presets = keyof typeof $containerPresets;

interface CardProps extends TouchableOpacityProps {
  preset?: Presets;
  verticalAlignment?: 'top' | 'center' | 'space-between' | 'force-footer-bottom';
  LeftComponent?: ReactElement;
  RightComponent?: ReactElement;
  heading?: TextProps['text'];
  headingStyle?: StyleProp<TextStyle>;
  HeadingTextProps?: TextProps;
  HeadingComponent?: ReactElement;
  content?: TextProps['text'];
  contentStyle?: StyleProp<TextStyle>;
  ContentTextProps?: TextProps;
  ContentComponent?: ReactElement;
  footer?: TextProps['text'];
  footerStyle?: StyleProp<TextStyle>;
  FooterTextProps?: TextProps;
  FooterComponent?: ReactElement;
}

export function Card(props: CardProps) {
  const {
    content,
    footer,
    heading,
    ContentComponent,
    HeadingComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    verticalAlignment = 'top',
    style: $containerStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    footerStyle: $footerStyleOverride,
    ContentTextProps,
    HeadingTextProps,
    FooterTextProps,
    ...WrapperProps
  } = props;

  const preset: Presets = props.preset && $containerPresets[props.preset] ? props.preset : 'default';
  const isPressable = !!WrapperProps.onPress;
  const isHeadingPresent = !!(HeadingComponent || heading);
  const isContentPresent = !!(ContentComponent || content);
  const isFooterPresent = !!(FooterComponent || footer);

  const Wrapper: ComponentType<TouchableOpacityProps> = isPressable ? TouchableOpacity : View;
  const HeaderContentWrapper = verticalAlignment === 'force-footer-bottom' ? View : Fragment;

  const $containerStyle = [$containerPresets[preset], $containerStyleOverride];
  const $headingStyle = [
    $headingPresets[preset],
    (isFooterPresent || isContentPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ];
  const $contentStyle = [
    $contentPresets[preset],
    isHeadingPresent && { marginTop: spacing.xxxs },
    isFooterPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ];
  const $footerStyle = [
    $footerPresets[preset],
    (isHeadingPresent || isContentPresent) && { marginTop: spacing.xxxs },
    $footerStyleOverride,
    FooterTextProps?.style,
  ];
  const $alignmentWrapperStyle = [
    $alignmentWrapper,
    { justifyContent: $alignmentWrapperFlexOptions[verticalAlignment] },
    LeftComponent && { marginStart: spacing.md },
    RightComponent && { marginEnd: spacing.md },
  ];

  return (
    <Wrapper
      style={$containerStyle}
      activeOpacity={0.8}
      accessibilityRole={isPressable ? 'button' : undefined}
      {...WrapperProps}
    >
      {LeftComponent}

      <View style={$alignmentWrapperStyle}>
        <HeaderContentWrapper>
          {HeadingComponent ||
            (isHeadingPresent && (
              <Text
                weight="bold"
                text={heading}
                {...HeadingTextProps}
                style={$headingStyle}
              />
            ))}

          {ContentComponent ||
            (isContentPresent && (
              <Text
                weight="normal"
                text={content}
                {...ContentTextProps}
                style={$contentStyle}
              />
            ))}
        </HeaderContentWrapper>

        {FooterComponent ||
          (isFooterPresent && (
            <Text
              weight="normal"
              size="xs"
              text={footer}
              {...FooterTextProps}
              style={$footerStyle}
            />
          ))}
      </View>

      {RightComponent}
    </Wrapper>
  );
}

const $containerBase: ViewStyle = {
  borderRadius: spacing.md,
  padding: spacing.xs,
  borderWidth: 1,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 12.81,
  elevation: 16,
  minHeight: 96,
  flexDirection: 'row',
};

const $alignmentWrapper: ViewStyle = {
  flex: 1,
  alignSelf: 'stretch',
};

const $alignmentWrapperFlexOptions = {
  top: 'flex-start',
  center: 'center',
  'space-between': 'space-between',
  'force-footer-bottom': 'space-between',
} as const;

const $containerPresets = {
  default: [
    $containerBase,
    {
      backgroundColor: colors.palette.neutral100,
      borderColor: colors.palette.neutral300,
    },
  ] as StyleProp<ViewStyle>,

  reversed: [
    $containerBase,
    { backgroundColor: colors.palette.neutral800, borderColor: colors.palette.neutral500 },
  ] as StyleProp<ViewStyle>,
};

const $headingPresets: Record<Presets, TextStyle> = {
  default: {},
  reversed: { color: colors.palette.neutral100 },
};

const $contentPresets: Record<Presets, TextStyle> = {
  default: {},
  reversed: { color: colors.palette.neutral100 },
};

const $footerPresets: Record<Presets, TextStyle> = {
  default: {},
  reversed: { color: colors.palette.neutral100 },
};
