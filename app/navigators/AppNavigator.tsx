import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useColorScheme } from 'react-native';
import * as Screens from 'app/screens';
import { colors } from 'app/theme';
import Config from '../config';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

export type AppStackParamList = {
  Welcome: undefined;
  // 🔥 Your screens go here
  RegisterUser: undefined;
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

const { exitRoutes } = Config;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName="Welcome"
    >
      <>
        <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
        <Stack.Screen name="RegisterUser" component={Screens.RegisterUserScreen} />
      </>
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  );
});

export type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
});
