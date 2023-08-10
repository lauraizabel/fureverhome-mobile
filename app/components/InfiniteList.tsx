import { colors, spacing } from 'app/theme';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export interface InfiniteListProps<T> {
  data: T[];
  loading: boolean;
  onLoadMore: () => void;
  renderItem: ListRenderItem<T>;
  style?: StyleProp<ViewStyle>;
}

export function InfiniteList<T>(props: InfiniteListProps<T>) {
  const { data, loading, onLoadMore, renderItem, style } = props;

  const handleEndReached = async () => {
    if (!loading) {
      onLoadMore();
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        style={$footer}
        color={colors.palette.primary500}
        size="large"
      />
    );
  };

  return (
    <View style={[$container, style]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingBottom: 110 }}
      />
    </View>
  );
}

const $container: ViewStyle = {
  justifyContent: 'center',
  paddingBottom: spacing.xxxl,
};

const $footer: ViewStyle = {
  marginVertical: spacing.md,
};
