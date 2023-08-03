import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { colors, typography } from 'app/theme'
import { Text } from 'app/components/Text'

export interface InfiniteListProps {
  style?: StyleProp<ViewStyle>
}

const PAGE_SIZE = 10

export const InfiniteList = observer(function InfiniteList(
  props: InfiniteListProps,
) {
  const [data, setData] = React.useState([]) // Dados da lista
  const [loading, setLoading] = React.useState(false) // Estado para exibir o indicador de carregamento
  const [page, setPage] = React.useState(1) // Número da página atual
  const { style } = props
  const $styles = [$container, style]

  // Função para carregar mais itens
  const loadMoreItems = () => {
    setLoading(true)

    // Simulando uma requisição assíncrona para carregar mais itens
    setTimeout(() => {
      const newData = Array.from({ length: PAGE_SIZE }).map((_, index) => ({
        id: (page - 1) * PAGE_SIZE + index + 1,
        title: `Item ${index + 1}`,
      }))

      setData((prevData) => [...prevData, ...newData])
      setPage((prevPage) => prevPage + 1)
      setLoading(false)
    }, 1000)
  }

  const handleEndReached = () => {
    if (!loading) {
      loadMoreItems()
    }
  }

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator style={$footer} />
  }

  React.useEffect(() => {
    loadMoreItems()
  }, [])

  return (
    <View style={$styles}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: 'center',
}

const $footer: ViewStyle = {
  marginVertical: 20,
}
