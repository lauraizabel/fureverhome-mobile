/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable consistent-return */
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppStackScreenProps } from 'app/navigators';
import { Header } from 'app/components';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'app/theme';
import Balloon from 'app/components/Balloon';
import { useAuth } from 'app/context/AuthContext';
import socket from 'app/data/services/socket';
import { chatApi } from 'app/data/services/chat/chat.api';
import { Ionicons } from '@expo/vector-icons';

type ChatMessageScreenProps = AppStackScreenProps<'ChatMessage'>;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  scrollViewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    top: 10,
  },
  sendButton: {
    backgroundColor: colors.palette.primary500,
    color: colors.palette.neutral100,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginRight: 5,
  },
  messageTextInputContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: 'transparent',
    borderTopColor: colors.palette.neutral300,
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageTextInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 90,
    paddingHorizontal: 12,
    fontSize: 17,
    marginHorizontal: 2,
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
    backgroundColor: colors.palette.neutral100,
    borderRadius: 4,
  },
});

export interface NewMessages {
  chatId: string;
  content: string;
  senderId: number;
  receiverId: number;
}

export const ChatMessageScreen: FC<ChatMessageScreenProps> = observer(
  function ChatMessageScreen(props) {
    const {
      route: {
        params: { chat, chatId },
      },
    } = props;
    const { user } = useAuth();
    const [message, setMessage] = React.useState('');
    const [newMessage, setNewMessage] = React.useState<NewMessages[]>([]);

    React.useEffect(() => {
      socket.emit('joinChat', { chatId });

      socket.on('message', message => {
        setNewMessage(prev => [...prev, message]);
      });

      return () => {
        socket.emit('leaveChat', { chatId });
        socket.off('message');
      };
    }, []);

    const sendMessage = async () => {
      if (!message) return;
      await chatApi.sendMessage(chat.id || 0, user?.id || 0, message);
      setMessage('');
    };

    return (
      <View style={$root}>
        <Header allowBackButton allowChatButton={false} />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {chat &&
            chat.messages.map(message => (
              <Balloon message={message} userId={user?.id as number} />
            ))}
          {newMessage &&
            newMessage.map(message => (
              <Balloon message={message} userId={user?.id as number} />
            ))}
        </ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={76}>
          <SafeAreaView>
            <View style={styles.messageTextInputContainer}>
              <TextInput
                style={styles.messageTextInput}
                placeholder="Digite sua mensagem..."
                placeholderTextColor={colors.palette.neutral500}
                multiline
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={styles.sendButton}
                disabled={!message}
                onPress={() => sendMessage()}
              >
                <Ionicons
                  name="ios-send"
                  size={12}
                  color={colors.palette.neutral100}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
};
