import { StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
/* import {Slider} from '@react-native-community/slider' */


export default function CalculatorsArrayOfFunctions({num}) {

/* const [arrOfFunctions,setArrOfFunctions]=useState(); */
const {width} = useWindowDimensions();

let arrOfFunctions = [Bmi(),ProteinIntake(), RMR(), WaterCalculator(), WhatIsFatter()];

  return (
            arrOfFunctions[num]
  )
}

function Bmi() {

    const [value, setValue] = useState(0);
    const {width} = useWindowDimensions();

    return(
      <View style={[styles.container,{ width: width * 0.9}]}>
      <Text style={styles.text}>Bmi</Text>

    <View style={styles.icons} >
  <Entypo name="man" size={34} color="black"  />
  <Ionicons name="woman" size={34} color="black" />
      </View>

    <Text style={styles.text}>{value}</Text>

 
  </View>
  )
}
function ProteinIntake() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width * 0.9}]}>
    <Text style={styles.text}>ProteinIntake</Text>
  </View>)
}
function RMR() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width * 0.9}]}>
    <Text style={styles.text}>RMR</Text>
  </View>)
}
function WaterCalculator() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width * 0.9}]}>
    <Text style={styles.text}>WaterCalculator</Text>
  </View>)
}
function WhatIsFatter() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width * 0.9}]}>
    <Text style={styles.text}>WhatIsFatter</Text>
  </View>)
}
const styles = StyleSheet.create({
    container: {
        alignItems:'center',
      height:'100%',
      width:'100%',
      backgroundColor: '#c123',
    },
    text: {
      marginTop:20,
       fontSize: 36,
    },
    icons:{
      flexDirection:'row',
      width:"100%",
      alignItems:'center',
      justifyContent:'center',
      justifyContent:'space-evenly',


    }
  })
  
