import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as Screens from 'app/screens';
import { colors } from 'app/theme';
import { useAuth } from 'app/context/AuthContext';
import MainTabNavigator, {
  TabStackParamList,
} from 'app/navigators/TabNavigator';
import { IAnimal } from 'app/data/models';
import Config from '../config';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import { IOng } from '../data/models/Ong';

export type AppStackParamList = {
  Welcome: undefined;
  RegisterUser: undefined;
  Home: undefined;
  ShowAnimal: {
    animal: IAnimal;
    isUserOwner: boolean;
  };
  ShowOng: {
    ong: IOng;
  };
  CreateAnimal: undefined;
  Main: NavigatorScreenParams<TabStackParamList>;
};

const { exitRoutes } = Config;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export interface PublicScreen {
  name: keyof AppStackParamList;
  component: any;
}

const AppStack = observer(function AppStack() {
  const { user } = useAuth();
  const initialRoute = 'Welcome';

  const publicScreens: PublicScreen[] = [
    {
      name: 'Welcome',
      component: Screens.WelcomeScreen,
    },
    {
      name: 'RegisterUser',
      component: Screens.RegisterUserScreen,
    },
  ];

  const screens: PublicScreen[] = [
    {
      name: 'ShowAnimal',
      component: Screens.ShowAnimal,
    },
    {
      name: 'ShowOng',
      component: Screens.ShowOngScreen,
    },
    {
      name: 'CreateAnimal',
      component: Screens.CreateAnimalScreen,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={initialRoute}
    >
      {publicScreens.map(screen => (
        <Stack.Screen
          name={screen.name}
          component={screen.component}
          key={screen.name}
        />
      ))}
      {user && (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          {screens.map(screen => (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              options={{ headerShown: false }}
            />
          ))}
        </>
      )}
    </Stack.Navigator>
  );
});

export type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  const { user } = useAuth();
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
