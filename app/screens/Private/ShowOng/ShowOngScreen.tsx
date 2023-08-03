import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  FlatList,
  Image,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppStackScreenProps } from 'app/navigators';
import {
  AnimalList,
  Header,
  renderAnimalType,
  Screen,
  Text,
} from 'app/components';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { formatUserAddress } from '../../../core/utils/Address';
import { IAnimal } from '../../../data/models';
import { colors, spacing } from '../../../theme';
import { callPhoneNumber } from '../../../core/utils/NumberPhone';
import { buildNoPhoto } from '../../../core/utils/Image';

type ShowOngScreenProps = AppStackScreenProps<'ShowOng'>;

export const ShowOngScreen: FC<ShowOngScreenProps> = observer(
  function ShowOngScreen(props: ShowOngScreenProps) {
    const {
      navigation,
      route: {
        params: { ong },
      },
    } = props;

    const goToAnimalDetails = (animal: IAnimal) => {
      const selectedAnimal = { ...animal };
      selectedAnimal.user = ong;
      const isUserOwner = selectedAnimal.user?.id === ong.id;
      navigation.navigate('ShowAnimal', {
        animal: selectedAnimal,
        isUserOwner,
      });
    };

    const renderAnimalList = () => {
      if (ong.animal.length === 0) {
        return (
          <Text
            style={{
              marginTop: 12,
            }}
          >
            Essa ONG ainda não possui animais cadastrados...
          </Text>
        );
      }
      return (
        <FlatList
          data={ong?.animal}
          nestedScrollEnabled
          renderItem={({ item }) => (
            <AnimalList
              animal={item}
              goToAnimalDetails={() => goToAnimalDetails(item)}
            />
          )}
        />
      );
    };

    return (
      <Screen style={$root} preset="scroll">
        <Header allowBackButton />
        <View style={$pictureContainer}>
          <Image
            source={{
              uri:
                ong.picture?.url ||
                buildNoPhoto(`${ong.firstName} ${ong.lastName}`),
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={$nameContainer}>
          <View>
            <Text style={$name}>
              {ong.firstName} {ong.lastName}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: spacing.sm,
            }}
          >
            <Text style={$description}>{ong.description}</Text>
          </View>
        </View>
        <View style={$dataContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.palette.neutral300,
              padding: spacing.xxs,
              borderRadius: 4,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={18}
              color={colors.palette.primary500}
              style={{
                marginRight: spacing.xs,
              }}
            />
            <Text>{formatUserAddress(ong.userAddress)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: spacing.sm,
            }}
          >
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.palette.neutral300,
                padding: spacing.xxs,
                borderRadius: 4,
                marginRight: spacing.sm,
              }}
            >
              <MaterialIcons
                name="pets"
                size={18}
                color={colors.palette.primary500}
                style={{
                  marginRight: spacing.xs,
                }}
              />
              <Text>{renderAnimalType(ong.animalTypes)}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: '72%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.palette.neutral300,
                padding: spacing.xxs,
                borderRadius: 4,
                marginRight: spacing.sm,
              }}
              onPress={() => callPhoneNumber(ong.phone)}
            >
              <AntDesign
                name="phone"
                size={18}
                color={colors.palette.primary500}
                style={{
                  marginRight: spacing.xs,
                }}
              />
              <Text>{ong.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={$dataContainer}>
          <Text style={$animalText}>Animais para serem adotados</Text>
          {renderAnimalList()}
        </View>
      </Screen>
    );
  },
);

const $animalText: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  color: colors.palette.neutral600,
};

const $dataContainer: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
};

const $description: TextStyle = {
  marginBottom: spacing.sm,
  paddingVertical: spacing.sm,
  lineHeight: 24,
  textAlign: 'justify',
  fontSize: 15,
  color: colors.palette.neutral600,
};

const $name: TextStyle = {
  marginBottom: spacing.sm,
  fontWeight: 'bold',
  fontSize: 20,
  color: colors.palette.neutral600,
};

const $nameContainer: ViewStyle = {
  alignItems: 'center',
};

const $pictureContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing.lg,
};

const $root: ViewStyle = {
  flex: 1,
};
