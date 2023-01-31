import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'


export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
console.log("aaaa"); 

useEffect(()=>{
   const unSubscribe = auth.onAuthStateChanged(user=>{
    if(user){
      navigation.navigate('Nav')
    }
    return unSubscribe
  })
},[])


    const  handleSignUp =  async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);
           
        } catch (error){
            console.log("b");
           
        }
    
    }
    const  handleLogin =  async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            Alert.alert(
              'Erro',
              'Login ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          
        } catch (error){
            console.log("b");
           
        }
    
    }
   
  return (
    <ImageBackground source={{uri: "https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-11-23/3b788920-2d79-11eb-9dcd-8b2ef5358591.jpg"}} resizeMode='cover'>

    <View style={styles.loginContainer}>
    <Text style={styles.title}>ShapeUp</Text>
    <View style={styles.inputsContainer}>
      <TextInput 
      style={styles.textInput}
      placeholder='Email'
    //   placeholderTextColor={'#fff'}
    //   onPointerCancelCapture={}
        onChangeText={text => setEmail(text)}
      />
      

      <TextInput 
       style={styles.textInput}
      placeholder='Password'
    //   placeholderTextColor={'#fff'}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        />
    </View>

    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={styles.loginButton}
    onPress={handleLogin}
    >
        <Text style={{color: '#fff', fontSize: 22,}}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={handleSignUp}
    style={styles.loginButton}
    >
        <Text style={{color: '#fff', fontSize: 22,}}>Sign Up</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{ navigation.navigate('Nav')}}
    style={[styles.loginButton,{backgroundColor: 'rgba(243,243,243,0.9)', marginTop: 24, height: '30%', borderWidth: 2, borderColor: '#78ab04'}]}
    >
        <Text style={{color: '#000', fontSize: 17,}}>Continue as  a guest</Text>
    </TouchableOpacity>

    </View>
    </View>

    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
    loginContainer:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
   
        backgroundColor: 'rgba(0,0,0,0.4)'


    },
    title:{
        fontSize: 38,
        color: '#fff',
        fontWeight: '900',
        marginTop: 70,
        marginBottom: 20,

        

    },
    inputsContainer:{
        width: '100%',
        height: '18%',
        alignItems: 'center',

    },
    textInput:{
        width: '70%',
        height: '50%',
        // backgroundColor: 'rgba(0,0,0,0.01)',
        marginTop: 10,
        borderWidth: 3.5,
        borderColor: '#fff',
        color: '#fff',
        paddingRight: 15,
        borderRadius: 5,
        // fontSize: 15,


        

        

    },

    buttonContainer:{
        width: '100%',
        height: '20%',
        alignItems: 'center',
        marginTop: 30,
        

    },
    loginButton:{
        width: '70%',
        height: '36%',
        backgroundColor: 'rgba(255, 178, 71,0.9)',
        
        marginTop: 5,
        borderWidth: 2.5,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        
        

    },
})