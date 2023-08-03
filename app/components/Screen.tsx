/* eslint-disable react/no-unused-prop-types */
import { StatusBarProps } from 'expo-status-bar';
import React from 'react';
import {
  KeyboardAvoidingViewProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '../utils/useSafeAreaInsetsStyle';

interface BaseScreenProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  safeAreaEdges?: ExtendedEdge[];
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark';
  keyboardOffset?: number;
  StatusBarProps?: StatusBarProps;
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  ScrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset: 'auto';
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };
}

type ScreenProps = BaseScreenProps | ScrollScreenProps | AutoScreenProps;

export function Screen(props: ScreenProps) {
  const {
    backgroundColor = colors.background,
    safeAreaEdges,
    children,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <ScrollView
      style={[$containerStyle, { backgroundColor }, $containerInsets]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      {children}
    </ScrollView>
  );
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};
