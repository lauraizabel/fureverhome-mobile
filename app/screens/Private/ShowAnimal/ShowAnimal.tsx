import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Header, Screen, Text } from 'app/components';
import { colors, spacing } from 'app/theme';
import { IAnimal } from 'app/data/models';
import { AppStackScreenProps } from 'app/navigators';

type ShowAnimalScreenProps = AppStackScreenProps<'ShowAnimal'>;

export const ShowAnimal: FC<ShowAnimalScreenProps> = observer(
  function ShowAnimal({ route }) {
    const { params } = route;
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    useEffect(() => {
      // loadAnimals();
    }, []);

    return (
      <Screen style={$root} preset="scroll">
        <Header allowBackButton />
        <Text style={$initalText}>
          Olá aqui estão seus animais disponíveis para adoção:
        </Text>
      </Screen>
    );
  },
);

const $initalText: TextStyle = {
  paddingHorizontal: spacing.lg,
  color: colors.palette.neutral700,
};

const $root: ViewStyle = {
  flex: 1,
};

const $badgeContainer: ViewStyle = {
  flexDirection: 'row',
};
const $filterContainer: ViewStyle = {
  width: '92%',
  marginTop: 24,
  marginLeft: 14,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const $animalListContainer: ViewStyle = {
  marginTop: 36,
};
