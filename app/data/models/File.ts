import { IAnimal } from 'app/data/models/Animal';
import { IUser } from 'app/data/models/User';

export interface IFile {
  id: number;
  url: string;
  fileId: string;
  updatedAt: Date;
  createdAt: Date;
  user?: IUser | null;
  animal?: IAnimal | null;
}
