import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
       source={{uri:'https://cdn.shopify.com/s/files/1/0509/1210/0549/products/WhatsAppImage2022-12-21at12.25.13_5000x.jpg?v=1671618694'}}
       style={{width: 200, height: 200,borderRadius:10}}
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#71c0fc'
  },

})

