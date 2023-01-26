import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
       source={{uri:'https://img.mako.co.il/2021/08/03/AP21215415918898_autoOrient_w.jpg'}}
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

