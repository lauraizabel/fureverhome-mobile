import * as React from 'react';
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';
import { GetChat } from 'app/data/models/Chat';
import { FlatList } from 'react-native-gesture-handler';
import { buildNoPhoto } from 'app/core/utils/Image';

export interface ChatListProps {
  chats: GetChat[];
  style?: StyleProp<ViewStyle>;
  goToChat?: (chat: GetChat) => void;
}

export const ChatList = observer(function ChatList({
  chats,
  goToChat,
}: ChatListProps) {
  const renderChatItem = ({ item }: { item: GetChat }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
        onPress={() => goToChat && goToChat(item)}
        key={item.lastMessage.id}
      >
        <View
          style={{
            marginRight: 10,
          }}
        >
          <Image
            source={{
              uri: item.user.picture ?? buildNoPhoto(item.user.name, 60),
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: typography.primary.normal,
              fontSize: 16,
              color: colors.palette.primary500,
            }}
          >
            {item.user.name}
          </Text>
          <Text numberOfLines={1}>{item.lastMessage.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={item => item.lastMessage.id.toString()}
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 10,
      }}
    />
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
};

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
};
