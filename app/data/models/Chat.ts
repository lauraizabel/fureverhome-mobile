import { Message } from 'app/data/models/Message';
import { IUser } from 'app/data/models/User';

export interface GetChat {
  user: {
    id: number;
    name: string;
    picture: string;
  };
  lastMessage: {
    id: number;
    content: string;
    createdAt: Date;
  };
  userSentLastMessage: boolean;
  id: number;
}

export interface IChat {
  createdAt: Date;
  id: number;
  receiver: IUser;
  sender: IUser;
  updatedAt: Date;
  messages: Message[];
}
