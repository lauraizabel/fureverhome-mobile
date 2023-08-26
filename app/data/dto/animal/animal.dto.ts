import z, { ZodType } from 'zod';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { IFile } from 'app/data/models';
import { AnimalAge } from 'app/enum/AnimalAge';
import { AnimalSex } from 'app/enum/AnimalSex';
import { AnimalSize } from '../../../enum/AnimalSize';
import { CommonColors } from '../../../enum/AnimalColors';
import { AnimalType } from '../../../enum/AnimalType';
import { AnimalCastrated } from '../../../enum/AnimalCastrated';
import { AnimalDewormed } from '../../../enum/AnimalDewormed';

export interface AnimalFormData {
  name: string;
  description: string;
  temperament: string;
  castrated: AnimalCastrated;
  dewormed: AnimalDewormed;
  size: AnimalSize;
  color: CommonColors;
  type: AnimalType;
  files: (ImagePickerAsset[] & IFile[]) | ImagePickerAsset[] | IFile[];
  age: AnimalAge;
  sex: AnimalSex;
}

export const animalFormDataSchema: ZodType<Omit<AnimalFormData, 'files'>> =
  z.object({
    name: z.string().min(3).max(100).nonempty(),
    description: z.string().min(10).max(500).nonempty(),
    temperament: z.string().min(5).max(200),
    castrated: z.nativeEnum(AnimalCastrated),
    dewormed: z.nativeEnum(AnimalDewormed),
    size: z.nativeEnum(AnimalSize),
    color: z.nativeEnum(CommonColors),
    type: z.nativeEnum(AnimalType),
    age: z.nativeEnum(AnimalAge),
    sex: z.nativeEnum(AnimalSex),
  });
