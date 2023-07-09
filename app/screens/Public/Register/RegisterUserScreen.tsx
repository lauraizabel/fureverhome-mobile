import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackScreenProps } from 'app/navigators';
import { Screen, Step, Text } from 'app/components';
import { FirstStep } from 'app/screens/Public/Register/Form/FirstStep';

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type RegisterUserScreenProps = NativeStackScreenProps<AppStackScreenProps<'RegisterUser'>>;

export const RegisterUserScreen: FC<RegisterUserScreenProps> = observer(
  function RegisterUserScreen() {
    const [formData, setFormData] = useState({});
    return (
      <Screen style={$root} preset="scroll">
        <Step>
          <FirstStep />
          <FirstStep />
          <FirstStep />
        </Step>
      </Screen>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
};
