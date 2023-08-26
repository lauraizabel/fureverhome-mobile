import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Badge, Header, OngList, Screen, TextField } from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'app/theme';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { badgeContent } from 'app/screens/Private/HomepageScreen/HomepageScreen';
import { useIsFocused } from '@react-navigation/native';
import { AnimalQuery } from 'app/data/services/animal/animal.api';
import { IOng } from '../../../data/models/Ong';
import { ongApi } from '../../../data/services/ong/ong.api';
import { AppStackScreenProps } from '../../../navigators';

type OngScreenProps = TabStackScreenProps<'Ong'> & AppStackScreenProps<'Main'>;
const { palette } = colors;

export const OngScreen: FC<OngScreenProps> = observer(function OngScreen(
  props: OngScreenProps,
) {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);
  const [ongs, setOngs] = useState<IOng[]>([]);
  const [search, setSearch] = useState<string>('');

  const renderSearchIcon = () => {
    return (
      <TouchableOpacity style={$searchIconContainer} onPress={handleSearch}>
        <AntDesign name="search1" size={24} color={palette.neutral100} />
      </TouchableOpacity>
    );
  };

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
    const loadedOngs = await ongApi.loadOngs();
    setOngs(loadedOngs);
  };

  useEffect(() => {
    if (isFocused) {
      loadOngs();
    }
  }, [isFocused]);

  const handleSearch = async () => {
    const query: AnimalQuery = {
      name: search,
    };

    if (selectedBadge) {
      query.type = selectedBadge;
    }

    const fetchedOngs = await ongApi.loadOngs({ ...query });

    setOngs(fetchedOngs);
  };

  return (
    <Screen style={$root} preset="scroll">
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
          <Filter />
        </View>
      </View>

      <View style={$ongListContainer}>
        {ongs.map(ong => (
          <OngList ong={ong} key={ong.id} selectOng={() => goToOng(ong)} />
        ))}
      </View>
    </Screen>
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
