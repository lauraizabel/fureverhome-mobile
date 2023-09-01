import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, View, ViewStyle } from 'react-native';
import {
  AnimalList,
  Badge,
  Header,
  animalAge,
  animalSex,
  animalSizes,
} from 'app/components';
import { colors } from 'app/theme';
import {
  Filter,
  FilterComponent,
} from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';
import { AnimalQuery, animalApi } from 'app/data/services/animal/animal.api';
import { IAnimal } from 'app/data/models';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
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

const filterOptions: Filter[] = [
  {
    label: 'Porte',
    fieldKey: 'size',
    options: animalSizes.map(({ name, value }) => ({
      label: name,
      value,
    })),
  },
  {
    fieldKey: 'sex',
    label: 'Sexo',
    options: animalSex.map(({ name, value }) => ({
      label: name,
      value,
    })),
  },
  {
    label: 'Idade',
    fieldKey: 'age',
    options: animalAge.map(({ name, value }) => ({
      label: name,
      value,
    })),
  },
  {
    label: 'Proximidade',
    fieldKey: 'proximity',
    options: [
      {
        label: '5km',
        value: '5',
      },
      {
        label: '10km',
        value: '10',
      },
      {
        label: '20km',
        value: '20',
      },
      {
        label: '50km',
        value: '50',
      },
      {
        label: '100km',
        value: '100',
      },
      {
        label: '200km',
        value: '200',
      },
    ],
  },
];

export const HomepageScreen: FC<HomepageScreenProps> = observer(
  function HomepageScreen(props) {
    const { navigation } = props;
    const isFocused = useIsFocused();
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [filterValues, setFilterValues] = useState({
      size: '',
      sex: '',
      age: '',
      proximity: '',
    });

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

      const query: AnimalQuery = {};
      if (value) {
        query.type = value as AnimalType;
      }

      const animals = await animalApi.getAllAnimal({ ...query });
      setAnimals(animals);
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
      const animals = await animalApi.getAllAnimal();
      setAnimals(animals);
      toggleLoading();
    };

    const resetStates = () => {
      setSelectedBadge(null);
      setAnimals([]);
    };

    const handleFilter = async () => {
      setShowFilter(false);
      toggleLoading();
      const query: AnimalQuery = {};

      const keys = Object.keys(filterValues);

      keys.forEach(key => {
        if (filterValues[key]) {
          query[key] = filterValues[key];
        }
      });

      if (selectedBadge) {
        query.type = selectedBadge as AnimalType;
      }

      const animals = await animalApi.getAllAnimal({ ...query });
      setAnimals(animals);
      toggleLoading();
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
            <FilterComponent
              filterOptions={filterOptions}
              onCancel={() => {
                setFilterValues({
                  size: '',
                  sex: '',
                  age: '',
                  proximity: '',
                });
                setShowFilter(false);
              }}
              setShowFilter={
                setShowFilter as React.Dispatch<React.SetStateAction<boolean>>
              }
              showFilter={showFilter}
              onApply={handleFilter}
              onChangeValues={(field, value) => {
                setFilterValues(prev => ({ ...prev, [field]: value }));
              }}
              values={filterValues}
            />
          </View>
        </View>

        <View style={$animalListContainer}>
          {isLoading && (
            <ActivityIndicator color={colors.palette.primary500} size="large" />
          )}

          {!isLoading && (
            <FlatList
              data={animals}
              renderItem={({ item: animal }) => (
                <AnimalList
                  animal={animal}
                  key={animal.id}
                  goToAnimalDetails={() => goToAnimalDetails(animal)}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </View>
    );
  },
);

const $animalListContainer: ViewStyle = {
  marginTop: 36,
  height: '75%',
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
  zIndex: 50,
  elevation: 50,
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
