import { IUser } from 'app/data/models/User';
import { IFile } from 'app/data/models/File';
import { CommonColors } from 'app/enum/AnimalColors';
import { AnimalDewormed } from 'app/enum/AnimalDewormed';

export interface IAnimal {
  id: number;
  type: 'CAT' | 'DOG' | 'OTHER';
  color: CommonColors;
  description: string;
  name?: string | null;
  dewormed: AnimalDewormed;
  user: IUser;
  files: IFile[];
  updatedAt: Date;
  createdAt: Date;
}
