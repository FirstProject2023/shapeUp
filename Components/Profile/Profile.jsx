import { StyleSheet, Text, View,TouchableOpacity,ImageBackground  } from 'react-native'
import React from 'react'
import { auth } from '../../firebase';

export default function Profile({ navigation }) {



  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }


if(auth.currentUser)
{
  return (
    
    <ImageBackground source={{uri: "https://as1.ftcdn.net/v2/jpg/01/87/90/02/1000_F_187900292_o4XwYpEOSmQZPcijWhMv9qjlJPhYoCMT.jpg"}} resizeMode= 'cover'>
    <View style={styles.container}>


      <Text style={{fontSize:30,color:'white'}}> Your Profile</Text>
      <Text style={{fontSize:20,color:'white'}}>your email: {auth.currentUser?.email}</Text>

      <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20}}>Sign Out</Text>
    </TouchableOpacity>  
     

    </View>
    </ImageBackground>
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://as1.ftcdn.net/v2/jpg/01/87/90/02/1000_F_187900292_o4XwYpEOSmQZPcijWhMv9qjlJPhYoCMT.jpg"}} resizeMode= 'cover'>
    <View style={styles.container}>


    <Text style={{fontSize:30,color:'white'}}>Your Profile </Text>
    <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20}}>Creat auser</Text>
    </TouchableOpacity>  

    </View>
    </ImageBackground>
  )
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton:{
    width: '60%',
    height: '10%',
    backgroundColor: 'rgba(255, 178, 71,0.8)',
    marginTop: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

},
})