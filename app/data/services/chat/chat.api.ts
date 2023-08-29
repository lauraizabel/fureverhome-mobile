/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import { GetChat, IChat } from 'app/data/models/Chat';
import type { ApiConfig } from '../api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export interface OngQuery {
  name?: string;
}

export class ChatApi {
  private readonly url = '/conversations';

  async loadConversations(userId: number): Promise<{ chat: GetChat[] }> {
    const response = await api.client.get<{ chat: GetChat[] }>(
      `${this.url}/${userId}`,
    );
    return response.data;
  }

  async sendMessage(
    chatId: number,
    senderId: number,
    content: string,
  ): Promise<IChat> {
    const response = await api.client.post<IChat>(
      `${this.url}/${chatId}/${senderId}/send`,
      {
        content,
      },
    );
    return response.data;
  }

  async createConversation(
    userId: number,
    ongId: number,
    content: string,
  ): Promise<IChat> {
    const response = await api.client.post<IChat>(
      `${this.url}/${userId}/${ongId}`,
      {
        content,
      },
    );
    return response.data;
  }

  async getMessages(chatId: number): Promise<IChat> {
    const url = `${this.url}/messages/${chatId}`;
    const response = await api.client.get<IChat>(url);

    return response.data;
  }
}

export const chatApi = new ChatApi();
