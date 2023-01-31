import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react';
import { auth } from '../../firebase';



export default function Home({ navigation }) {

 


  const handleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error=> log("dddd"))
  }

  return (


    <ImageBackground source={{uri: "https://media.istockphoto.com/id/144228394/photo/middle-aged-man-deciding-to-eat-an-ice-cream-cone-or-apple.jpg?s=612x612&w=0&k=20&c=yXrWeSVd1AzIiWs1HHN3L9n8EaIAbXaMFuVPvZlwF1E="}} resizeMode= 'cover'>
    <View style={styles.container}>


      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>
      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>
      <Text style={{fontSize:30,color:'white'}}>{auth.currentUser?.email}</Text>

    <TouchableOpacity
    style={styles.loginButton}
    onPress={handleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20,}}>Out</Text>
    </TouchableOpacity>  


  
      {/* <Image
       source={{uri:'https://cdn.shopify.com/s/files/1/0509/1210/0549/products/WhatsAppImage2022-12-21at12.25.13_5000x.jpg?v=1671618694%27'}}
       style={{width: 200, height: 200,borderRadius:10}}
      /> */}

     
    </View>
    </ImageBackground>
  )
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
    height: '5%',
    backgroundColor: '#0782f9',
    marginTop: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

},

})