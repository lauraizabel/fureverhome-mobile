import { IChat } from 'app/data/models/Chat';
import { IUser } from 'app/data/models/User';

export interface Message {
  id: number;
  chat: IChat;
  sender: IUser;
  content: string;
}
