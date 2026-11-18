import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from '../Globals/Animation';

export default function Transition({navigation}) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Nav'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    // <SafeAreaView style={{flex: 0, backgroundColor: 'rgb(255, 178, 71)'}}>
    <SafeAreaView style={styles.transitionScreenContainer}>

    <LottieView style={{width: 170, height: 170}} autoPlay speed={1} source={require('../lottieAnimation/animation_start.json')}/>
      
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