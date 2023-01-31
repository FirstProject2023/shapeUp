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
    <ImageBackground source={{uri: "https://img.freepik.com/free-photo/portrait-sports-man-measuring-his-waist-with-tape_171337-15818.jpg"}} resizeMode='cover'>

    <View style={styles.loginContainer}>
    <Text style={styles.title}>shapeup</Text>
    <View style={styles.inputsContainer}>
      <TextInput 
      style={styles.textInput}
      placeholder='Email'
        onChangeText={text => setEmail(text)}
      />
      

      <TextInput 
       style={styles.textInput}
      placeholder='Password'
        onChangeText={text => setPassword(text)}
        secureTextEntry
        />
    </View>

    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={styles.loginButton}
    onPress={handleLogin}
    >
        <Text style={{color: '#fff', fontSize: 20,}}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={handleSignUp}
    style={styles.loginButton}
    >
        <Text style={{color: '#fff', fontSize: 20,}}>Sign Up</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{ navigation.navigate('Nav')}}
    style={[styles.loginButton,{backgroundColor: 'rgba(243,243,243,0.9)', marginTop: 20}]}
    >
        <Text style={{color: '#000', fontSize: 20,}}>Continue as  a guest</Text>
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
   
        backgroundColor: 'rgba(0,0,0,0.5)'


    },
    title:{
        fontSize: 35,
        color: '#fff',
        fontWeight: '900',
        marginTop: 70,
        marginBottom: 20,

        

    },
    inputsContainer:{
        width: '100%',
        height: '20%',
        alignItems: 'center',

    },
    textInput:{
        width: '70%',
        height: '50%',
        backgroundColor: '#fff',
        marginTop: 5,
        borderWidth: 2,
        padding: 10,

    },

    buttonContainer:{
        width: '100%',
        height: '20%',
        alignItems: 'center',
        marginTop: 30,

    },
    loginButton:{
        width: '70%',
        height: '40%',
        backgroundColor: '#0782f9',
        marginTop: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
})