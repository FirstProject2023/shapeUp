import React from 'react'
import { View,Text } from 'react-native'

export default function Articles() {
  const options = {method: 'GET'};

  fetch('https://shneor.p.rapidapi.com/%7BPATH%7D', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
  return (
   <View>
    <Text>Articles</Text>
   </View>
  )
}
