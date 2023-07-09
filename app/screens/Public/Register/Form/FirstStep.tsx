import * as React from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';
import { Icon } from 'app/components';

export interface FirstStepProps {
  opt?: string;
}

/**
 * Describe your component here
 */
export const FirstStep = observer(function FirstStep(props: FirstStepProps) {
  const $styles = [$container];

  return (
    <View style={$styles}>
      <View style={$containerImage}>
        <TouchableOpacity style={$containerImageUpload}>
          <Icon icon="plus" />
        </TouchableOpacity>
      </View>
      <Text style={$text}>Hello</Text>
    </View>
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  marginTop: 36,
};

const $containerImage: ViewStyle = {
  justifyContent: 'center',
};

const $containerImageUpload: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: colors.palette.accent500,
  width: 300,
  height: 300,
  borderRadius: 500,
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
};
