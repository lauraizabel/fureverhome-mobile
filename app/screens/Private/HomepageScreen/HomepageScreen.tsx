import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { AnimalList, Badge, Header, Screen, TextField } from 'app/components';
import { AntDesign } from '@expo/vector-icons';
import { colors } from 'app/theme';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { AnimalType } from 'app/enum/AnimalType';

type HomepageScreenProps = TabStackScreenProps<'Homepage'>;

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
  function HomepageScreen() {
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);

    const renderSearchIcon = () => {
      return (
        <View style={$searchIconContainer}>
          <AntDesign name="search1" size={24} color={palette.neutral100} />
        </View>
      );
    };

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

    return (
      <Screen style={$root} preset="scroll">
        <Header />
        {/* TODO: verificar se precisa mesmo de uma lupa ??? */}
        {/* <View style={$container}>
          <TextField
            placeholder="Pesquisar"
            RightAccessory={renderSearchIcon}
            style={{ backgroundColor: palette.neutral100 }}
            inputWrapperStyle={$inputWrapper}
            placeholderTextColor={palette.neutral400}
          />
        </View> */}
        <View style={$filterContainer}>
          <View style={$badgeContainer}>{renderBadges()}</View>
          <View>
            <Filter />
          </View>
        </View>

        <View style={$animalListContainer}>
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
          <AnimalList />
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
