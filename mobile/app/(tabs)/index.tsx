import { ScrollView, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import SafeScreen from '@/components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'
import ProductsGrid from '@/components/ProductsGrid';
import useProducts from '@/hooks/useProducts';

const CATEGORIES = [
  { name: "All", icon: "grid-outline" as const },
  { name: "Electronics", image: require("@/assets/images/electronics.png") },
  { name: "Fashion", image: require("@/assets/images/fashion.png") },
  { name: "Sports", image: require("@/assets/images/sports.png") },
  { name: "Books", image: require("@/assets/images/books.png") },
];

const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const{data:products,isLoading,isError}=useProducts();

  const filteredProducts = useMemo(()=>{
    if(!products) return []

    let filtered = products

    //filtering by categoty
    if(selectedCategory!=="All"){
      filtered = filtered.filter(products=>products.category===selectedCategory)
    }

    //filtering by search query
    if(searchQuery.trim()){
      filtered = filtered.filter(products=>products.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered

  },[products,selectedCategory,searchQuery])
  
  return (
    <SafeScreen>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="px-6 pb-4 pt-6" >
          <View className='flex-row items-center justify-between mb-6'>
            <View>
              <Text className='text-text-primary text-3xl font-bold tracking-tight'>Shop</Text>
              <Text className='text-text-secondary text-sm mt-1'>Browse all product</Text>
            </View>
            <TouchableOpacity className='bg-surface/50 p-3 rounded-full'
              activeOpacity={0.7}
            >
              <Ionicons name='options-outline' size={22} color={"#fff"} />
            </TouchableOpacity>
          </View>

          {/* SEARCH BAR */}
          <View className='bg-surface flex-row items-center px-5 py-2 rounded-2xl mb-4'>
            <Ionicons color={"#666"} size={22} name='search' />
            <TextInput placeholder='Search for Products'
              placeholderTextColor={"#666"}
              className='flex-1 ml-3 text-base text-text-primary'
              value={searchQuery}
              onChangeText={setSearchQuery} />
          </View>

          {/* CATEGORY FILTER */}
          <View className='mb-6'>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:10}}
            >
              {CATEGORIES.map(category=>{
                const isSelected = selectedCategory === category.name
                return(<TouchableOpacity
                key={category.name}
                onPress={()=>setSelectedCategory(category.name)}
                className={`mr-3 rounded-2xl size-20 overflow-hidden items-center justify-center ${isSelected ?"bg-primary":"bg-surface"}`}>
                  {category.icon ?(
                  <Ionicons name = {category.icon} size={36} color={isSelected ? "#121212":"#fff"} />
                  ) : (
                    <Image source = {category.image} className="size-12" resizeMode="contain" />
                  )}
                </TouchableOpacity>)
              })}

            </ScrollView>
          </View>

          <View className='px-6 mb-6'>
            <View className='flex-row items-center justify-between mb-4'>
              <Text className='text-text-primary text-lg font-bold'>Product</Text>
              <Text className='text-text-primary text-sm'>{filteredProducts.length} items</Text>
            </View>
          </View>

          {/* PRODUCTS GRID */}
          <ProductsGrid products={filteredProducts} isLoading={isLoading} isError={isError}/>
        </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default ShopScreen