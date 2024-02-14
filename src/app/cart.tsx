import { Header } from '@/components/header'
import { ProductCartprops, useCartStore } from '@/stores/cart-store'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@/components/button'
import { Feather } from '@expo/vector-icons'
import { LinkButton } from '@/components/link-button'
import { useState } from 'react'
import { useNavigation } from 'expo-router'

const PHONE_NUMBER = '5541989042299'

export default function Cart() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const [address, setAddress] = useState('')

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleProductRemove(product: ProductCartprops) {
    Alert.alert('Remover produto', `Deseja remover ${product.title}?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.removeProduct(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      Alert.alert('Endereço de entrega', 'Informe o endereço de entrega')
      return
    }

    const products = cartStore.products
      .map((product) => ` \n ${product.quantity} ${product.title}`)
      .join('')

    const message = `
    NOVO PEDIDO
    \n Entregar em: ${address}
    ${products}
    \n Valor Total: ${total}
    `
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    )
    cartStore.clearCart()
    Alert.alert('Pedido enviado', 'Seu pedido foi enviado com sucesso')
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1 ">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product key={product.id} data={product} />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho esta vazio
              </Text>
            )}
            <View className=" flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
              onChangeText={setAddress}
              blurOnSubmit
              onSubmitEditing={handleOrder}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5 ">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
