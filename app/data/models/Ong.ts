import { IUser } from './User';
import { AnimalType } from '../../enum/AnimalType';

export interface IOng extends IUser {
  description: string;
  animalTypes: AnimalType[];
}
