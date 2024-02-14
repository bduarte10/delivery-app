import { ProductProps } from '@/utils/data/products'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as cartInMemory from './helpers/cart-in-memory'

export type ProductCartprops = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartprops[]
  addProduct: (product: ProductProps) => void
  removeProduct: (productId: string) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      addProduct: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),
      removeProduct: (productId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        })),
      clearCart: () => set(() => ({ products: [] })),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
