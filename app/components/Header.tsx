import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { colors } from '../theme';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '../utils/useSafeAreaInsetsStyle';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoWithLetters = require('../../assets/images/logo-letters.png');

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  safeAreaEdges?: ExtendedEdge[];
  allowBackButton?: boolean;
  allowChatButton?: boolean;
}

export function Header({ allowChatButton = true, ...props }: HeaderProps) {
  const navigation = useNavigation();
  const {
    backgroundColor = colors.background,
    safeAreaEdges = ['top'],
    style: $styleOverride,
    containerStyle: $containerStyleOverride,
    allowBackButton,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const goToHomepage = () => {
    if (allowBackButton) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Homepage' as never);
  };

  const renderLeftIcon = () => {
    if (allowBackButton) {
      return (
        <AntDesign name="left" size={24} color={colors.palette.primary500} />
      );
    }

    return (
      <Image
        source={logoWithLetters}
        resizeMethod="resize"
        style={$imageStyle}
      />
    );
  };

  return (
    <View
      style={[
        $container,
        $containerInsets,
        { backgroundColor },
        $containerStyleOverride,
      ]}
    >
      <View style={[$wrapper, $styleOverride]}>
        <TouchableOpacity style={$imageContainerStyle} onPress={goToHomepage}>
          {renderLeftIcon()}
        </TouchableOpacity>
        <TouchableOpacity style={$chatContainer}>
          {allowChatButton && (
            <Ionicons
              name="md-chatbubbles"
              size={24}
              color={colors.palette.primary500}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const $imageStyle: ImageStyle = {
  width: 160,
  resizeMode: 'contain',
  height: 32,
};

export const $imageContainerStyle: ViewStyle = {
  marginLeft: 16,
};

const $wrapper: ViewStyle = {
  height: 56,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $chatContainer: ViewStyle = {
  marginRight: 16,
};

const $container: ViewStyle = {
  width: '100%',
};
