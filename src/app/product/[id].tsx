import { Image, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/format-currency';

export default function Product() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.filter((product) => product.id === id)[0];

  return (
    <View className="flex-1 bg-slate-900">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 font-heading text-2xl my-2">
          {formatCurrency(product.price)}
        </Text>
        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>
        {product.ingredients.map((ingredient) => (
          <Text
            className="text-slate-400 font-body text-base leading-6 "
            key={ingredient}
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>
    </View>
  );
}
