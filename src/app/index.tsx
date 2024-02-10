import { CategoryButton } from '@/components/category-button';
import { Header } from '@/components/header';
import { View, FlatList, SectionList, Text } from 'react-native';
import { Link } from 'expo-router';

import { CATEGORIES, MENU } from '@/utils/data/products';
import { useState, useRef } from 'react';
import { Product } from '@/components/product';

export default function Home() {
  const [categorie, setCategories] = useState<string>(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);

  const handleCategorieSelected = (selectedCategorie: string) => {
    setCategories(selectedCategorie);
    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategorie);
    if (sectionListRef.current) {
      sectionListRef.current?.scrollToLocation({ animated: true, sectionIndex, itemIndex: 0 });
    }
  };

  return (
    <View className="pt-8 flex-1">
      <Header title="Faça seu pedido" cartCount={5} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item: title }) => (
          <CategoryButton
            title={title}
            isSelected={title === categorie}
            onPress={() => handleCategorieSelected(title)}
          />
        )}
        horizontal
        className="max-h-10 mt-5 mb-2"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item: product }) => (
          <Link href={`/product/${product.id}`} asChild>
            <Product data={product} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white font-heading text-xl mt-8 mb-3">{title}</Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
