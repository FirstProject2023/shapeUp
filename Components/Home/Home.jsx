import { StyleSheet, Text, View,Image, ImageBackground } from 'react-native'
import React from 'react';



export default function Home() {

  return (
    <ImageBackground source={{uri: "https://media.istockphoto.com/id/144228394/photo/middle-aged-man-deciding-to-eat-an-ice-cream-cone-or-apple.jpg?s=612x612&w=0&k=20&c=yXrWeSVd1AzIiWs1HHN3L9n8EaIAbXaMFuVPvZlwF1E="}} resizeMode= 'cover'>
    <View style={styles.container}>


     
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

