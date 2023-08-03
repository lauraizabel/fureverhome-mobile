import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { AnimalList, Badge, Header, Screen } from 'app/components';
import { colors } from 'app/theme';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';
import { animalApi } from 'app/data/services/animal/animal.api';
import { IAnimal } from 'app/data/models';
import { useIsFocused } from '@react-navigation/native';
import { AppStackScreenProps } from '../../../navigators';

type HomepageScreenProps = TabStackScreenProps<'Homepage'> &
  AppStackScreenProps<'Main'>;

const { palette } = colors;

export const badgeContent = [
  {
    label: 'Caninos',
    value: AnimalType.DOG,
  },
  {
    label: 'Felinos',
    value: AnimalType.CAT,
  },
  {
    label: 'Outros',
    value: AnimalType.OTHER,
  },
];

export const HomepageScreen: FC<HomepageScreenProps> = observer(
  function HomepageScreen(props) {
    const { navigation } = props;
    const isFocused = useIsFocused();
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    const selectFilter = (value: AnimalType) => {
      if (selectedBadge === value) {
        setSelectedBadge(null);
        return;
      }

      setSelectedBadge(value);
    };

    const renderBadges = () => {
      return badgeContent.map(({ label, value }) => (
        <Badge
          label={label}
          selected={selectedBadge === value}
          onPress={() => selectFilter(value)}
          style={{ marginRight: 6 }}
          key={value}
        />
      ));
    };

    const loadAnimals = async () => {
      try {
        const animals = await animalApi.getAllAnimal();
        setAnimals(animals);
      } catch (error) {
        console.log({ error });
      }
    };

    useEffect(() => {
      if (isFocused) {
        loadAnimals();
      }
    }, [isFocused]);

    const goToAnimalDetails = (animal: IAnimal) => {
      navigation.navigate('ShowAnimal', { animal, isUserOwner: false });
    };

    return (
      <Screen style={$root} preset="scroll">
        <Header />
        <View style={$filterContainer}>
          <View style={$badgeContainer}>{renderBadges()}</View>
          <View>
            <Filter />
          </View>
        </View>

        <View style={$animalListContainer}>
          {animals.map(animal => (
            <AnimalList
              animal={animal}
              key={animal.id}
              goToAnimalDetails={() => goToAnimalDetails(animal)}
            />
          ))}
        </View>
      </Screen>
    );
  },
);

const $animalListContainer: ViewStyle = {
  marginTop: 36,
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

const $root: ViewStyle = {
  flex: 1,
};

const $container: ViewStyle = {
  marginTop: 32,
  justifyContent: 'center',
  alignItems: 'center',
};

const $searchIconContainer: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: palette.primary500,
  height: 40,
  borderRadius: 8,
  width: 40,
  alignItems: 'center',
};

const $inputWrapper: ViewStyle = {
  backgroundColor: palette.neutral100,
  borderColor: palette.neutral100,
  width: '92%',
  borderRadius: 8,
};
