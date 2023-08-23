import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { AnimalList, Badge, Header, InfiniteList } from 'app/components';
import { colors } from 'app/theme';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';
import { AnimalQuery, animalApi } from 'app/data/services/animal/animal.api';
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
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [animals, setAnimals] = useState<IAnimal[]>([]);

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
      setPage(1);

      const query: AnimalQuery = {
        page: 1,
      };

      if (value) {
        query.type = selectedBadge as AnimalType;
      }

      const animals = await animalApi.getAllAnimal({ ...query });
      setAnimals(animals.data);
      toggleLoading();
    };

    const renderBadges = () => {
      return badgeContent.map(({ label, value }, index) => (
        <Badge
          label={label}
          selected={selectedBadge === value}
          onPress={() => selectFilter(value)}
          style={{ marginRight: 6 }}
          key={`${value}_${index + 2}`}
        />
      ));
    };

    const toggleLoading = () => {
      setIsLoading(prev => !prev);
    };

    const loadAnimals = async () => {
      toggleLoading();
      const animals = await animalApi.getAllAnimal({ page });
      setAnimals(animals.data);
      toggleLoading();
    };

    const onLoadMore = async () => {
      toggleLoading();
      if (!hasMoreData) return;
      const animals = await animalApi.getAllAnimal({ page: page + 1 });
      setHasMoreData(animals.meta.hasNextPage);
      setAnimals(prev => [...prev, ...animals.data]);
      setPage(page + 1);
      toggleLoading();
    };

    const resetStates = () => {
      setSelectedBadge(null);
      setAnimals([]);
      setPage(1);
      setHasMoreData(true);
    };

    useEffect(() => {
      resetStates();

      if (isFocused) {
        loadAnimals();
      }
    }, [isFocused]);

    const goToAnimalDetails = (animal: IAnimal) => {
      navigation.navigate('ShowAnimal', { animal, isUserOwner: false });
    };

    return (
      <View style={$root}>
        <Header />
        <View style={$filterContainer}>
          <View style={$badgeContainer}>{renderBadges()}</View>
          <View>
            <Filter />
          </View>
        </View>

        <View style={$animalListContainer}>
          <InfiniteList
            data={animals}
            onLoadMore={() => onLoadMore()}
            renderItem={({ item }) => (
              <AnimalList
                animal={item}
                key={item.id}
                goToAnimalDetails={() => goToAnimalDetails(item)}
              />
            )}
            loading={isLoading}
          />
        </View>
      </View>
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
