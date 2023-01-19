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
      <View style={styles.button}>
      <Button title='add' color='green' width='50%' /> 
      </View>


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
    backgroundColor: '#aff',
  },
  FlatListContainer:{
    height:'70%',
    width:'90%',
    backgroundColor: '#aff',
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
    padding: 10,
  }

})

