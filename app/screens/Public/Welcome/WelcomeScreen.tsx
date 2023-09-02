import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { WelcomeForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { AppStackScreenProps } from 'app/navigators';
import { Screen } from '../../../components';
import { colors, spacing } from '../../../theme';
import { useSafeAreaInsetsStyle } from '../../../utils/useSafeAreaInsetsStyle';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const welcomeLogo = require('../../../../assets/images/icon-logo.png');

type WelcomeScreenScreenProps = AppStackScreenProps<'Welcome'>;

export const WelcomeScreen: FC<WelcomeScreenScreenProps> = observer(
  function WelcomeScreen(_props) {
    const $bottomContainerInsets = useSafeAreaInsetsStyle(['bottom']);

    const { navigation } = _props;

    const goToNextPage = () => {
      navigation.navigate('RegisterUser');
    };

    const goToHomePage = () => {
      navigation.navigate('Main', { screen: 'Homepage' });
    };

    return (
      <View style={$screenContentContainer}>
        <View style={$container}>
          <View style={$topContainer}>
            <Image
              style={$welcomeLogo}
              source={welcomeLogo}
              resizeMode="contain"
            />
          </View>

          <View style={[$bottomContainer, $bottomContainerInsets]}>
            <WelcomeForm
              goToNextPage={goToNextPage}
              goToHomePage={goToHomePage}
            />
          </View>
        </View>
      </View>
    );
  },
);

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.background,
};

const $topContainer: ViewStyle = {
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
