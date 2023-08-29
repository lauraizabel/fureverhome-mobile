import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';
import { IChat } from 'app/data/models/Chat';
import { NewMessages } from 'app/screens';
import { Message } from 'app/data/models/Message';

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  balloon: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  balloonSent: {
    borderTopEndRadius: 0,
    backgroundColor: colors.palette.neutral100,
  },
  balloonReceived: {
    borderTopStartRadius: 0,
    backgroundColor: colors.palette.primary500,
  },
  balloonText: {
    fontSize: 14,
  },
  balloonTextSent: {
    color: colors.palette.secondary500,
  },
  balloonTextReceived: {
    color: colors.palette.neutral100,
  },
});

export interface BalloonProps {
  message: Message | NewMessages;
  userId: number;
}

function isIChat(obj: any): obj is Message {
  return 'sender' in obj;
}

const Balloon = ({ message, userId }: BalloonProps) => {
  const sent = isIChat(message)
    ? message?.sender?.id === userId
    : message?.senderId === userId;
  const balloonColor = sent ? styles.balloonSent : styles.balloonReceived;
  const balloonTextColor = sent
    ? styles.balloonTextSent
    : styles.balloonTextReceived;
  const bubbleWrapper = sent
    ? styles.bubbleWrapperSent
    : styles.bubbleWrapperReceived;

  return (
    <View>
      <View style={{ ...styles.bubbleWrapper, ...bubbleWrapper }}>
        <View style={{ ...styles.balloon, ...balloonColor }}>
          <Text style={{ ...styles.balloonText, ...balloonTextColor }}>
            {message.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Balloon;
