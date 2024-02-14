import { Image, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import colors from 'tailwindcss/colors'

type HeaderProps = {
  title: string
  cartCount?: number
}

export function Header({ title, cartCount = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image className="h-6 w-32" source={require('@/assets/logo.png')} />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>
      {cartCount > 0 && (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative">
            <View className="bg-lime-300 top-2 -right-3.5 z-10 w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-slate-900 text-xs font-bold ">
                {cartCount}
              </Text>
            </View>
            <Feather name="shopping-bag" size={24} color={colors.white} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
