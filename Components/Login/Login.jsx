import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'

export default function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            console.log(`email: ${user._tokenResponse.email}\npassword: ${user._tokenResponse.password}`);
        } catch (error){
            console.log("error");
           
        }
    }

    const  handleLogin =  async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(`email: ${user._tokenResponse.email}\npassword: ${user._tokenResponse.password}`);
        } catch (error){
            console.log("error");
           
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
    onPress={handleLogin}
    style={styles.loginButton}
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
    onPress={()=> navigation.navigate('Nav')}
    style={styles.loginButton}
    >
        <Text style={{color: '#fff', fontSize: 20,}}>Continue as a guest</Text>
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