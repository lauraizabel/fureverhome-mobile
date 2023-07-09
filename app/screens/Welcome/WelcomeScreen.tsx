import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { WelcomeForm } from 'app/screens/Welcome/Form/WelcomeForm';
import { Screen } from '../../components';
import { AppStackScreenProps } from '../../navigators'; // @demo remove-current-line
import { colors, spacing } from '../../theme';
import { useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle';

const welcomeLogo = require('../../../assets/images/icon-logo.png');

type WelcomeScreenProps = AppStackScreenProps<'Welcome'>;

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props;

  const $bottomContainerInsets = useSafeAreaInsetsStyle(['bottom']);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={['top', 'bottom']}
    >
      <View style={$container}>
        <View style={$topContainer}>
          <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        </View>

        <View style={[$bottomContainer, $bottomContainerInsets]}>
          <WelcomeForm />
        </View>
      </View>
    </Screen>
  );
});

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
};

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: '57%',
  justifyContent: 'center',
  paddingHorizontal: spacing.lg,
};

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: '43%',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: 'space-around',
};
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: '100%',
  marginTop: 10,
  marginBottom: spacing.xxl,
};
