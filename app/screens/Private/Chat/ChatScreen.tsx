import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { AppStackScreenProps } from 'app/navigators';
import { ChatList, Header, Screen, Text } from 'app/components';
import { chatApi } from 'app/data/services/chat/chat.api';
import { GetChat } from 'app/data/models/Chat';
import { useAuth } from 'app/context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from 'app/theme';

type ChatScreenProps = AppStackScreenProps<'Chat'>;

export const ChatScreen: FC<ChatScreenProps> = observer(function ChatScreen(
  props: ChatScreenProps,
) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<GetChat[]>([]);
  const { user } = useAuth();
  const { navigation } = props;

  const loadMessages = async () => {
    setIsLoading(true);
    await fetchMessages();
    setIsLoading(false);
  };

  const fetchMessages = async () => {
    const { chat } = await chatApi.loadConversations(user?.id || 0);
    setMessages(chat);
  };

  const goToChat = async (chat: GetChat) => {
    const findChat = await chatApi.getMessages(chat.id);
    navigation.navigate('ChatMessage', {
      chat: findChat,
      chatId: findChat.id.toString(),
    });
  };

  React.useEffect(() => {
    loadMessages();
    const intervalId = setInterval(fetchMessages, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Screen style={$root} preset="scroll">
      <Header allowBackButton allowChatButton={false} />
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 8,
        }}
      >
        {isLoading && (
          <ActivityIndicator
            color={colors.palette.primary500}
            size="large"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          />
        )}
        {!isLoading && messages.length === 0 && <Text>Sem mensagens</Text>}
        {!isLoading && messages.length > 0 && (
          <ChatList chats={messages} style={{ flex: 1 }} goToChat={goToChat} />
        )}
      </View>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};
