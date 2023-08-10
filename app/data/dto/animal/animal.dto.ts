import z, { ZodType } from 'zod';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { IFile } from 'app/data/models';
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
  files: ImagePickerAsset[] | IFile[];
}

export const animalFormDataSchema: ZodType<AnimalFormData> = z.object({
  name: z.string().min(3).max(100).nonempty(),
  description: z.string().min(10).max(500).nonempty(),
  temperament: z.string().min(5).max(200),
  castrated: z.nativeEnum(AnimalCastrated),
  dewormed: z.nativeEnum(AnimalDewormed),
  size: z.nativeEnum(AnimalSize),
  color: z.nativeEnum(CommonColors),
  type: z.nativeEnum(AnimalType),
  files: z
    .array(
      z.object({
        uri: z.string(),
        width: z.number(),
        height: z.number(),
        assetId: z.string().optional().nullable(),
        type: z.enum(['image', 'video']).optional(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
        exif: z.record(z.unknown()).optional().nullable(),
        base64: z.string().optional().nullable(),
        duration: z.number().optional().nullable(),
      }),
    )
    .min(1),
});
