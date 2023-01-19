import { StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
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
    <Text style={styles.text}>{value}</Text>

 



    

  </View>)
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
        justifyContent:'center',
        alignItems:'center',
      height:'100%',
      width:'100%',
      backgroundColor: '#c123',
    },
    text: {
      fontSize: 36,
    },
  })
  
