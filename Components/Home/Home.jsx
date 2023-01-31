import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react';
import { auth } from '../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 





export default function Home({ navigation }) {

 


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
    
    <ImageBackground source={{uri: "https://media.istockphoto.com/id/144228394/photo/middle-aged-man-deciding-to-eat-an-ice-cream-cone-or-apple.jpg?s=612x612&w=0&k=20&c=yXrWeSVd1AzIiWs1HHN3L9n8EaIAbXaMFuVPvZlwF1E="}} resizeMode= 'cover'>
    <View style={styles.container}>


      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>
      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>
      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>

  

    </View>
    </ImageBackground>
  )
}
else{
 
  return (
    
    <ImageBackground source={{uri: "https://media.istockphoto.com/id/144228394/photo/middle-aged-man-deciding-to-eat-an-ice-cream-cone-or-apple.jpg?s=612x612&w=0&k=20&c=yXrWeSVd1AzIiWs1HHN3L9n8EaIAbXaMFuVPvZlwF1E="}} resizeMode= 'cover'>
    <View style={styles.container}>


    <Text style={{fontSize:30,color:'white'}}>Welcam to ShapeUp</Text>
    <Text style={{fontSize:20,color:'white', padding: 10}}>to be able to use all the features you must open a free account</Text>
    <AntDesign name="arrowdown" size={55} color="#fff" />
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