import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Transition({navigation}) {
  function start() {
    setTimeout(()=> {
      
      navigation.navigate('Nav')
    },2500)
    
  }
  return (
    // <SafeAreaView style={{flex: 0, backgroundColor: 'rgb(255, 178, 71)'}}>
    <SafeAreaView style={styles.transitionScreenContainer}>

    <LottieView style={{width: 170, height: 170}} autoPlay speed={1} source={require('../lottieAnimation/animation_start.json')}/>
      {start()}
      
    </SafeAreaView>
      // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    transitionScreenContainer:{
      flex: 1,
        // width: '100%',
        // height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
         backgroundColor: 'rgb(255, 178, 71)'
    },


})