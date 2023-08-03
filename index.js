import React from 'react';
import { AppRegistry } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import App from './app/app.tsx';
import { PaperProvider } from "react-native-paper";

function IgniteApp() {
  return (
    <PaperProvider>
      <App hideSplashScreen={RNBootSplash.hide} />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('FureverhomeApp', () => IgniteApp);
export default App;
