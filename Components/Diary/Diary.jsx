import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native'
import React from 'react'
import { auth } from '../../firebase';
import { AntDesign } from '@expo/vector-icons'; 


export default function Diary({ navigation }) {

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
    
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
    <View style={styles.container}>


      <Text style={{fontSize:30,color:'white'}}>Diary</Text>
      <Text style={{fontSize:20,color:'white'}}>your email: {auth.currentUser?.email}</Text>
     

    </View>
    </ImageBackground>
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
        <View style={styles.container}>


<Text style={{fontSize:35,color:'white', marginTop: 60}}>Diary</Text>
<Text style={{fontSize:20,color:'white', padding: 10}}>To use the diary you must open an account</Text>
<AntDesign name="arrowdown" size={55} color="#fff" />
<TouchableOpacity
style={styles.loginButton}
onPress={hendleSingOut}
>
    <Text style={{color: '#fff', fontSize: 20}}>Create a user</Text>
</TouchableOpacity>  

</View>
    </ImageBackground>
  )
}

    // <View style={styles.container}>


    // <Text style={{fontSize:30,color:'white'}}>Diary  </Text>
    // <TouchableOpacity
    // style={styles.loginButton}
    // onPress={hendleSingOut}
    // >
    //     <Text style={{color: '#fff', fontSize: 20}}>Creat auser</Text>
    // </TouchableOpacity>  

    // </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
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