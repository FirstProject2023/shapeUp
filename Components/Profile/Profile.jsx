import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image, ScrollView  } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { oreng } from '../Globals/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

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
        


        <ImageBackground
        style={{height:'100%',width:'100%'}}
        source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"} }
        resizeMode= 'cover'
        >
          <View style={{height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.6)'}}>

          </View>
        </ImageBackground>



      </View>

      
      <TouchableOpacity style={{zIndex:90}}>
        <View style={styles.circle}>
        <Image style={{height:'100%',width:'100%',borderRadius: 50}} source={{uri: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"}} resizeMode= 'cover'/>
        <EvilIcons name="plus" size={54} color="black" style={{ position:'absolute',top:68,right:0}}/>
        </View>
      </TouchableOpacity>
{/* a */}



      <ScrollView>

<View style={{height:'12%',width:'100%',justifyContent:'center',alignItems:'center' ,backgroundColor:'red'}}>
      <Text style={{fontSize:20,color:'white',marginRight:110,fontSize:20}}> shneor shrybr</Text>
      <Text style={{fontSize:20,color:'white',marginRight:30,fontSize:20}}> 21 </Text>
</View>


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





<View style={{width:'79%',justifyContent:'center',alignItems:'center'}}>


          <View style={styles.details}>
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> shneor shryber </Text>
          <Ionicons style={{marginEnd:20}} name="md-man" size={24} color="black" />
          </View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> 21 </Text>
<MaterialIcons  style={{marginEnd:20}} name="date-range" size={24} color="black" />
</View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> {auth.currentUser?.email} </Text>
<MaterialIcons style={{marginEnd:20}} name="email" size={24} color="black" />
</View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />
<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> Purpose </Text>
<Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />
</View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />
<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>???????? </Text>
<FontAwesome style={{marginEnd:20}}  name="question" size={24} color="black" />
</View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />


<View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> {password} </Text>
<AntDesign style={{marginEnd:20}} name="lock" size={24} color="black" />
</View>
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />

    <View style={{width:'100%', alignItems: 'center',}}>
      <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20}}>Sign Out</Text>
    </TouchableOpacity>  
      </View>

      </View>
      </ScrollView>

     
  
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
   height:50,
   width:160,
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
 top:-55,
left:50,

  
},
weightContainer:{
  marginTop:10,
  width: 200,
  height: 110,
  borderWidth:2,
  borderRadius: 20,
backgroundColor:'#F0FFFF',
alignItems:'center',
justifyContent:'center',
marginLeft:80,
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
