import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { AppStackScreenProps } from 'app/navigators';
import { AnimalForm, Header, Screen, isFile } from 'app/components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { animalApi } from 'app/data/services/animal/animal.api';
import { AnimalFormData } from 'app/data/dto/animal/animal.dto';
import { IAnimal, IFile } from 'app/data/models';
import { ImagePickerAsset } from 'expo-image-picker';

const buildInitialValues = (animal: IAnimal) => {
  const form: AnimalFormData = {
    castrated: animal.castrated,
    color: animal.color,
    description: animal.description,
    dewormed: animal.dewormed,
    files: animal.files,
    name: animal.name || 'Não informado',
    size: animal.size,
    temperament: 'Não informado',
    type: animal.type,
    age: animal.age,
    sex: animal.sex,
  };
  return form;
};

type EditAnimalScreenProps = AppStackScreenProps<'EditAnimal'>;

export const EditAnimalScreen: FC<EditAnimalScreenProps> = observer(
  function EditAnimalScreen(props) {
    const {
      navigation,
      route: {
        params: { animal },
      },
    } = props;

    const formData: AnimalFormData = buildInitialValues(animal);

    const removeAlreadyUploadedFiles = (
      files: (IFile | ImagePickerAsset)[],
    ) => {
      return files.filter(file => {
        return !isFile(file);
      });
    };

    const uploadFiles = async (animalId: number, files: ImagePickerAsset[]) => {
      const filesPromised = files.map(async file => {
        return animalApi.uploadPicture(animalId, file);
      });

      const asyncFiles = await Promise.all(filesPromised);

      return asyncFiles;
    };

    const onSubmit = async (animalForm: AnimalFormData) => {
      try {
        await animalApi.updateAnimal(animal.id, {
          ...animalForm,
          files: [],
        });
        console.log('animalForm', animalForm);
        const files = removeAlreadyUploadedFiles(animalForm.files);
        if (files.length > 0) {
          await uploadFiles(animal.id, files as ImagePickerAsset[]);
        }
        // navigation.navigate('Main', { screen: 'Homepage' });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao editar animal :(',
          text2: 'Tente novamente',
        });
      }
    };

    return (
      <Screen style={$root} preset="scroll">
        <Header />
        <AnimalForm onSubmit={onSubmit} initialValues={formData} />
      </Screen>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
};
