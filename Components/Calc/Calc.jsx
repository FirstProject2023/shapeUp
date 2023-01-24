import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CalculatorsArrayOfFunctions from './CalculatorsArrayOfFunctions'


export default function Calc() {
  const [numbers,setNumbers] = useState([0, 1, 2, 3, 4]);
  

  return (

<View style={styles.container}>

    <View style={styles.FlatListContainer}>

<FlatList data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} />}
      horizontal 
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces= {false}
      />

      

    </View>
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    width:'100%',
    backgroundColor: 'white',
  },
  FlatListContainer:{
    height:'70%',
    width:'100%',
    backgroundColor: '#00BFFF',
    borderRadius:14,
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
    padding: 10,
  }

})

