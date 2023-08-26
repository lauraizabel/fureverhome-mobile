import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextStyle, View, ViewStyle } from 'react-native';
import { AnimalList, Badge, Header, Text } from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { colors, spacing } from 'app/theme';
import { AnimalType } from 'app/enum/AnimalType';
import { badgeContent } from 'app/screens/Private/HomepageScreen/HomepageScreen';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { useAuth } from 'app/context/AuthContext';
import { IAnimal } from 'app/data/models';
import { AnimalQuery, animalApi } from 'app/data/services/animal/animal.api';
import { useIsFocused } from '@react-navigation/native';
import { AppStackScreenProps } from '../../../navigators';

type AnimalScreenProps = TabStackScreenProps<'Animal'> &
  AppStackScreenProps<'Main'>;

export const AnimalScreen: FC<AnimalScreenProps> = observer(
  function AnimalScreen(props) {
    const { navigation } = props;
    const isFocused = useIsFocused();
    const { user } = useAuth();
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectFilter = (value: AnimalType) => {
      if (selectedBadge === value) {
        handleChangeBadge();
        setSelectedBadge(null);
        return;
      }

      setSelectedBadge(value);
      handleChangeBadge(value);
    };

    const handleChangeBadge = async (value?: AnimalType) => {
      toggleLoading();

      const query: AnimalQuery = {
        page: 1,
      };

      if (value) {
        query.type = value as AnimalType;
      }

      const animals = await animalApi.getAnimalByUser(user?.id as number, {
        ...query,
      });

      setAnimals(() => [...animals]);

      toggleLoading();
    };

    const goToAnimalDetails = (animal: IAnimal) => {
      navigation.navigate('ShowAnimal', { animal, isUserOwner: true });
    };

    const goToEditAnimal = (animal: IAnimal) => {
      navigation.navigate('EditAnimal', { animal });
    };

    const toggleLoading = () => {
      setIsLoading(prev => !prev);
    };

    const onLoadMore = async () => {
      toggleLoading();
      const animals = await animalApi.getAnimalByUser(user?.id as number, {});
      setAnimals(() => [...animals]);
      toggleLoading();
    };

    useEffect(() => {
      if (isFocused) {
        onLoadMore();
      }
    }, [isFocused]);

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
    return (
      <View style={$root}>
        <Header />
        <Text style={$initalText}>
          Olá {user?.firstName} {user?.lastName}, aqui estão seus animais
          disponíveis para adoção:
        </Text>
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
              allowActions
              key={animal.id}
              goToAnimalDetails={() => goToAnimalDetails(animal)}
              goToEditAnimal={() => goToEditAnimal(animal)}
            />
          ))}
        </View>
      </View>
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
