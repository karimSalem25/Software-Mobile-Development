import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavOptions from '../components/NavOptions';


const HomeScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <ImageBackground source={require('../assets/aboutrika.jpg')} resizeMode="cover" style={styles.backgroundImage}>
        
        <Image
          style={styles.image}
          source={require('../assets/google_logo.png')}
        />
        <TextInput style={styles.searchInput}
          placeholder="Type Here..."
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          autoCapitalize='none'
        />
        <NavOptions term={search} />
        </ImageBackground>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  backgroundImage:{
    flex: 1,
    justifyContent: "center",
    width:"100%"
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'    
  },
  searchInput: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  }
});

export default HomeScreen
