import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextStyle, View, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimalList, Badge, Header, Screen, Text } from 'app/components';
import { TabStackScreenProps } from 'app/navigators/TabNavigator';
import { colors, spacing } from 'app/theme';
import { AnimalType } from 'app/enum/AnimalType';
import { badgeContent } from 'app/screens/Private/HomepageScreen/HomepageScreen';
import { Filter } from 'app/screens/Private/HomepageScreen/Filter/Filter';

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

type AnimalScreenProps = NativeStackScreenProps<TabStackScreenProps<'Animal'>>;

export const AnimalScreen: FC<AnimalScreenProps> = observer(
  function AnimalScreen() {
    const [selectedBadge, setSelectedBadge] = useState<null | AnimalType>(null);

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
        <Text style={$initalText}>
          Olá userName, aqui estão seus animais disponíveis para adoção:
        </Text>
        <View style={$filterContainer}>
          <View style={$badgeContainer}>{renderBadges()}</View>
          <View>
            <Filter />
          </View>
        </View>

        <View style={$animalListContainer}>
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
          <AnimalList allowActions />
        </View>
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
