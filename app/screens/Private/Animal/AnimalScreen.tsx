import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, TextStyle, View, ViewStyle } from 'react-native';
import {
  AnimalList,
  Badge,
  Header,
  Text,
  animalAge,
  animalSex,
  animalSizes,
} from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { colors, spacing } from 'app/theme';
import { AnimalType } from 'app/enum/AnimalType';
import { badgeContent } from 'app/screens/Private/HomepageScreen/HomepageScreen';
import {
  Filter,
  FilterComponent,
} from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { useAuth } from 'app/context/AuthContext';
import { IAnimal } from 'app/data/models';
import { AnimalQuery, animalApi } from 'app/data/services/animal/animal.api';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { AppStackScreenProps } from '../../../navigators';

type AnimalScreenProps = TabStackScreenProps<'Animal'> &
  AppStackScreenProps<'Main'>;

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
    label: 'Sexo',
    fieldKey: 'sex',
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
];

export const AnimalScreen: FC<AnimalScreenProps> = observer(
  function AnimalScreen(props) {
    const { navigation } = props;
    const isFocused = useIsFocused();
    const { user } = useAuth();
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filterValues, setFilterValues] = useState({
      size: '',
      sex: '',
      age: '',
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
      const animals = await animalApi.getAnimalByUser(user?.id as number, {});
      setAnimals(() => [...animals]);
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
            <FilterComponent
              filterOptions={filterOptions}
              onCancel={() => {
                setFilterValues({
                  size: '',
                  sex: '',
                  age: '',
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
              renderItem={({ item }) => (
                <AnimalList
                  animal={item}
                  goToAnimalDetails={() => goToAnimalDetails(item)}
                  goToEditAnimal={() => goToEditAnimal(item)}
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
  zIndex: 50,
  elevation: 50,
};

const $animalListContainer: ViewStyle = {
  marginTop: 36,
};
