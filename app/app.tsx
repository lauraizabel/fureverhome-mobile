/* eslint-disable global-require */
import './utils/ignoreWarnings';
import { useFonts } from 'expo-font';
import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { AuthProvider } from 'app/context/AuthContext';
import { AppNavigator, useNavigationPersistence } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import * as storage from './utils/storage';
import { customFontsToLoad } from './theme';
import Config from './config';
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";

if (__DEV__) {
  require('./devtools/ReactotronConfig.ts');
  require('react-devtools');
}

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

// Web linking configuration
const prefix = Linking.createURL('/');
const config = {
  screens: {
    Welcome: 'welcome',
  },
};

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

const setupTranslations = () => {
  i18next.init({
    compatibilityJSON: 'v3',
    lng: "es",
    resources: {
      es: { zod: translation },
    },
  });
  z.setErrorMap(zodI18nMap);
};

function App(props: AppProps) {
  const { hideSplashScreen } = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [areFontsLoaded] = useFonts(customFontsToLoad);

  if (!isNavigationStateRestored || !areFontsLoaded) {
    return null;
  }

  const linking = {
    prefixes: [prefix],
    config,
  };
  setupTranslations();

  hideSplashScreen();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </KeyboardAvoidingView>
          </ErrorBoundary>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
