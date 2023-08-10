import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppStackScreenProps } from 'app/navigators';
import { AnimalForm, Header, Screen } from 'app/components';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { AnimalFormData } from '../../../data/dto/animal/animal.dto';
import { animalApi } from '../../../data/services/animal/animal.api';

type CreateAnimalScreenProps = AppStackScreenProps<'CreateAnimal'>;

export const CreateAnimalScreen: FC<CreateAnimalScreenProps> = observer(
  function CreateAnimalScreen(props) {
    const { navigation } = props;

    const uploadFiles = async (animalId: number, files: ImagePickerAsset[]) => {
      const filesPromised = files.map(async file => {
        return animalApi.uploadPicture(animalId, file);
      });

      const asyncFiles = await Promise.all(filesPromised);

      return asyncFiles;
    };
    const onSubmit = async (animalForm: AnimalFormData) => {
      try {
        const animal = await animalApi.createAnimal({
          ...animalForm,
          files: [],
        });
        await uploadFiles(animal.id, animalForm.files as ImagePickerAsset[]);
        navigation.navigate('Main', { screen: 'Homepage' });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar animal :(',
          text2: 'Tente novamente',
        });
      }
    };

    return (
      <Screen style={$root} preset="scroll">
        <Header allowBackButton />
        <AnimalForm onSubmit={onSubmit} />
      </Screen>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
};
