import React, { ErrorInfo } from 'react';
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native';
import { Button, Icon, Screen, Text } from '../../components';
import { colors, spacing } from '../../theme';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  const { error, errorInfo, onReset } = props;
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text
          style={$heading}
          preset="subheading"
          text="Something went wrong!"
        />
      </View>

      <ScrollView
        style={$errorSection}
        contentContainerStyle={$errorSectionContentContainer}
      >
        <Text style={$errorContent} weight="bold" text={`${error}`.trim()} />
        <Text
          selectable
          style={$errorBacktrace}
          text={`${errorInfo.componentStack}`.trim()}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={$resetButton}
        onPress={onReset}
        text="RESET APP"
      />
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
};

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
};

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
};

const $errorContent: TextStyle = {
  color: colors.error,
};

const $errorBacktrace: TextStyle = {
  marginTop: spacing.md,
  color: colors.textDim,
};

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
};
