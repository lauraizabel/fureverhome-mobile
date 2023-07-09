// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from 'react-native';
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from '@expo-google-fonts/space-grotesk';

import {
  Roboto_100Thin as roboto100Thin,
  Roboto_100Thin_Italic as roboto100ThinItalic,
  Roboto_300Light as roboto300Light,
  Roboto_300Light_Italic as roboto300LightItalic,
  Roboto_400Regular as roboto400Regular,
  Roboto_400Regular_Italic as roboto400RegularItalic,
  Roboto_500Medium as roboto500Medium,
  Roboto_500Medium_Italic as roboto500MediumItalic,
  Roboto_700Bold as roboto700Bold,
  Roboto_700Bold_Italic as roboto700BoldItalic,
  Roboto_900Black as roboto900Black,
  Roboto_900Black_Italic as roboto900BlackItalic,
} from '@expo-google-fonts/roboto';

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
  roboto100Thin,
  roboto100ThinItalic,
  roboto300Light,
  roboto300LightItalic,
  roboto400Regular,
  roboto400RegularItalic,
  roboto500Medium,
  roboto500MediumItalic,
  roboto700Bold,
  roboto700BoldItalic,
  roboto900Black,
  roboto900BlackItalic,
};

const fonts = {
  spaceGrotesk: {
    light: 'spaceGroteskLight',
    normal: 'spaceGroteskRegular',
    medium: 'spaceGroteskMedium',
    semiBold: 'spaceGroteskSemiBold',
    bold: 'spaceGroteskBold',
  },
  helveticaNeue: {
    // iOS only font.
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'Helvetica Neue',
    medium: 'HelveticaNeue-Medium',
  },
  courier: {
    // iOS only font.
    normal: 'Courier',
  },
  sansSerif: {
    // Android only font.
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    normal: 'sans-serif',
    medium: 'sans-serif-medium',
  },
  monospace: {
    // Android only font.
    normal: 'monospace',
  },
  roboto: {
    thin: 'roboto100Thin',
    thinItalic: 'roboto100ThinItalic',
    light: 'roboto300Light',
    lightItalic: 'roboto300LightItalic',
    regular: 'roboto400Regular',
    regularItalic: 'roboto400RegularItalic',
    normal: 'roboto500Medium',
    mediumItalic: 'roboto500MediumItalic',
    bold: 'roboto700Bold',
    boldItalic: 'roboto700BoldItalic',
    black: 'roboto900Black',
    blackItalic: 'roboto900BlackItalic',
  },
};

export const typography = {
  fonts,
  primary: fonts.roboto,
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
};
