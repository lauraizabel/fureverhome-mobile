import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Badge, Header, OngList, Screen, TextField } from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'app/theme';
import {
  Filter,
  FilterComponent,
} from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { badgeContent } from 'app/screens/Private/HomepageScreen/HomepageScreen';
import { useIsFocused } from '@react-navigation/native';
import { AnimalQuery } from 'app/data/services/animal/animal.api';
import { ActivityIndicator } from 'react-native-paper';
import { IOng } from '../../../data/models/Ong';
import { ongApi } from '../../../data/services/ong/ong.api';
import { AppStackScreenProps } from '../../../navigators';

type OngScreenProps = TabStackScreenProps<'Ong'> & AppStackScreenProps<'Main'>;
const { palette } = colors;

const filterOptions: Filter[] = [
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
export const OngScreen: FC<OngScreenProps> = observer(function OngScreen(
  props: OngScreenProps,
) {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
  const [ongs, setOngs] = useState<IOng[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filterValues, setFilterValues] = useState({
    proximity: '',
  });
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderSearchIcon = () => {
    return (
      <TouchableOpacity style={$searchIconContainer} onPress={handleSearch}>
        <AntDesign name="search1" size={24} color={palette.neutral100} />
      </TouchableOpacity>
    );
  };

  const toggleLoading = () => setIsLoading(prev => !prev);

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

    if (search) {
      query.name = search;
    }

    const animals = await ongApi.loadOngs({
      ...query,
    });

    setOngs(() => [...animals]);
    toggleLoading();
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

  const goToOng = (selectedOng: IOng) => {
    navigation.navigate('ShowOng', { ong: selectedOng });
  };

  const loadOngs = async () => {
    toggleLoading();
    const loadedOngs = await ongApi.loadOngs();
    setOngs(loadedOngs);
    toggleLoading();
  };

  useEffect(() => {
    if (isFocused) {
      loadOngs();
    }
  }, [isFocused]);

  const handleSearch = async () => {
    toggleLoading();
    const query: AnimalQuery = {
      name: search,
    };

    if (selectedBadge) {
      query.type = selectedBadge;
    }

    const fetchedOngs = await ongApi.loadOngs({ ...query });

    setOngs(fetchedOngs);
    toggleLoading();
  };

  const handleFilter = async () => {
    setShowFilter(false);
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

    if (search) {
      query.name = search;
    }

    const fetchedOngs = await ongApi.loadOngs({ ...query });

    setOngs(fetchedOngs);
  };
  return (
    <View style={$root}>
      <Header />
      <View style={$container}>
        <TextField
          placeholder="Pesquisar ONG"
          RightAccessory={renderSearchIcon}
          style={{ backgroundColor: palette.neutral100 }}
          inputWrapperStyle={$inputWrapper}
          placeholderTextColor={palette.neutral400}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={$filterContainer}>
        <View style={$badgeContainer}>{renderBadges()}</View>
        <View>
          <FilterComponent
            filterOptions={filterOptions}
            onCancel={() => {
              setFilterValues({
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

      <View style={$ongListContainer}>
        {isLoading && (
          <ActivityIndicator color={colors.palette.primary500} size="large" />
        )}{' '}
        {ongs.map(ong => (
          <OngList ong={ong} key={ong.id} selectOng={() => goToOng(ong)} />
        ))}
      </View>
    </View>
  );
});

const $root: ViewStyle = {
  flex: 1,
};

const $ongListContainer: ViewStyle = {
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
  zIndex: 50,
  elevation: 50,
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
