import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image, ScrollView  } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { oreng } from '../Globals/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export default function Profile({ navigation }) {

const [password,setPassword]=useState('12378asd3');

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
    
    <View style={styles.container}>


      <View style={styles.profileImg}>
        <Image style={{height:'100%',width:'100%'}} source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'/>

      </View>

      
      <TouchableOpacity>
        <View style={styles.circle}>
        <Image style={{height:'100%',width:'100%',borderRadius: 50}} source={{uri: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"}} resizeMode= 'cover'/>
        </View>
      </TouchableOpacity>
{/* a */}




      <Text style={{fontSize:20,color:'white',marginRight:80}}> 12/01/2022</Text>







 

        <View style={styles.weightContainer}>


          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

          <View >
          <Text style={{fontSize:15,color:oreng,textAlign:'center',}}> 1.78 </Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> height </Text>
          </View>

          <View style={{marginLeft:20}}>
          <Text style={{fontSize:15,color:oreng,textAlign:'center'}}> 78.3 </Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> weight </Text>
          </View>


          <View style={{marginLeft:20}}>
          <Text style={{fontSize:15,color:oreng,textAlign:'center'}}> 21 </Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> Age </Text>
          </View>

          </View>

      </View>

          <View style={styles.details}>
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> shneor shryber </Text>
          <Ionicons style={{marginEnd:20}} name="md-man" size={24} color="black" />
          </View>
<View
    style={{
      height: 3,
      width:'97%',
      backgroundColor: 'black',
      borderRadius:6,
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> 21 </Text>
<FontAwesome style={{marginEnd:20}} name="pagelines" size={24} color="black" />
</View>
<View
    style={{
      height: 3,
      width:'97%',
      backgroundColor: 'black',
      borderRadius:6,
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> {auth.currentUser?.email} </Text>
<MaterialIcons style={{marginEnd:20}} name="email" size={24} color="black" />
</View>
<View
    style={{
      height: 3,
      width:'97%',
      backgroundColor: 'black',
      borderRadius:6,
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> {password} </Text>
<AntDesign style={{marginEnd:20}} name="lock" size={24} color="black" />
</View>
<View
    style={{
      height: 3,
      width:'97%',
      backgroundColor: 'black',
      borderRadius:6,
    }}
  />

     

      <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20}}>Sign Out</Text>
    </TouchableOpacity>  
     
  
{/* a */}


    </View>
   
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    
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
profileImg:
{

  width:'100%',
  height: '25%',
},
circle: {
  width: 100,
  height: 100,
  borderWidth:2,
  borderRadius: 50,
 position:'absolute',
 top:-30,
left:18,
  
},
weightContainer:{
  marginTop:50,
  width: 220,
  height: 150,
  borderWidth:2,
  borderRadius: 20,
backgroundColor:'#F0FFFF',
alignItems:'center',
justifyContent:'center'
},
details:{
  flexDirection:'row',
  height:50,
  width:'100%',
  alignItems:'center',
  justifyContent:'center',
  justifyContent:'space-between'



},

})
