import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import * as Screens from 'app/screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'app/theme';
import {
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export type TabStackParamList = {
  Homepage: undefined;
  Animal: undefined;
  Ong: undefined;
  Profile: undefined;
  ShowAnimal: undefined;
  CreateAnimal: undefined;
};

export type TabStackScreenProps<T extends keyof TabStackParamList> =
  NativeStackScreenProps<TabStackParamList, T>;

export interface PrivateScreen {
  name: keyof TabStackParamList;
  component: any;
}

const privateScreens: PrivateScreen[] = [
  {
    name: 'Homepage',
    component: Screens.HomepageScreen,
  },
  {
    name: 'Animal',
    component: Screens.AnimalScreen,
  },
  {
    name: 'Ong',
    component: Screens.OngScreen,
  },
  {
    name: 'Profile',
    component: Screens.ProfileScreen,
  },
];

const getIcon = (routeName: string, focused: boolean) => {
  const color = focused ? colors.palette.primary500 : colors.palette.neutral100;
  const icons = {
    Homepage: {
      Component: Entypo,
      name: 'home',
    },
    Animal: {
      Component: MaterialIcons,
      name: 'pets',
    },
    Ong: {
      Component: Fontisto,
      name: 'world-o',
    },
    Profile: {
      Component: Feather,
      name: 'user',
    },
  };

  const icon = icons[routeName];

  if (icon) {
    const { Component, name } = icon;
    if (focused) {
      return (
        <View
          style={{
            backgroundColor: colors.palette.neutral100,
            padding: 8,
            borderRadius: 16,
          }}
        >
          <Component name={name} color={color} size={24} />
        </View>
      );
    }
    return <Component name={name} color={color} size={24} />;
  }

  return <FontAwesome name="map-marker" size={24} color={color} />;
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.palette.primary500,
          paddingBottom: 0,
          height: 60,
        },
        tabBarIcon: ({ focused }) => {
          return getIcon(route.name, focused);
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      })}
    >
      {privateScreens.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarBadgeStyle: {
              color: colors.palette.primary600,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
