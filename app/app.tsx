import './i18n';
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
import { useInitialRootStore } from './models';
import { AppNavigator, useNavigationPersistence } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import * as storage from './utils/storage';
import { customFontsToLoad } from './theme';
import Config from './config';

if (__DEV__) {
  // eslint-disable-next-line global-require
  require('./devtools/ReactotronConfig.ts');
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

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [areFontsLoaded, fontError] = useFonts(customFontsToLoad);

  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 500);
  });

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) {
    return null;
  }

  const linking = {
    prefixes: [prefix],
    config,
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <AppNavigator
              linking={linking}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ErrorBoundary>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
