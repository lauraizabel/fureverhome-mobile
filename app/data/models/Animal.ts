import { IUser } from 'app/data/models/User';
import { IFile } from 'app/data/models/File';
import { CommonColors } from 'app/enum/AnimalColors';
import { AnimalDewormed } from 'app/enum/AnimalDewormed';
import { AnimalType } from '../../enum/AnimalType';
import { AnimalSize } from '../../enum/AnimalSize';
import { AnimalCastrated } from '../../enum/AnimalCastrated';

export interface IAnimal {
  id: number;
  type: AnimalType;
  color: CommonColors;
  description: string;
  name?: string | null;
  dewormed: AnimalDewormed;
  user: IUser;
  size: AnimalSize;
  files: IFile[];
  updatedAt: Date;
  createdAt: Date;
  castrated: AnimalCastrated;
}
