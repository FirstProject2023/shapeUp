import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image, ScrollView,TextInput  } from 'react-native'
import React, { useState,useEffect } from 'react'
import { oreng,blue } from '../Globals/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';


export default function Profile({ navigation }) {

  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);


const [password,setPassword]=useState('12378asd3');
const [nameInputPresented,setNameInputPresented] = useState(1);
const [ageInputPresented,setAgeInputPresented] = useState(1);
const [emailInputPresented,setEmailInputPresented] = useState(1);
const [purposeInputPresented,setPurposeInputPresented] = useState(1);
const [dateInputPresented,setDateInputPresented] = useState(1);
const [passwordInputPresented,setPasswordInputPresented] = useState(1);

useEffect(()=>{

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc)=> ({...doc.data() , id: doc.id })));
  }
  getUsers();
},[]);
if(auth.currentUser){
  useEffect(() => {
    
    const currentUser = users.find((user) => user.email.toLowerCase() == auth.currentUser.email.toLowerCase());
    
    if (currentUser !== null) {
      console.log(currentUser);
      setCurrentUserData(currentUser);
    }
    
  }, [users]);
}


  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }

  function ChangeNameInpout()
  {
    setNameInputPresented(!nameInputPresented)
  }
  function ChangeDateInput()
  {
    setDateInputPresented(!dateInputPresented)
  }

  function ChangeEmailInpout()
  {
    setEmailInputPresented(!emailInputPresented)
  }
  function ChangePurposeInpout()
  {
    setPurposeInputPresented(!purposeInputPresented)
  }
  function ChangePasswordInput()
  {
    setPasswordInputPresented(!passwordInputPresented)
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
          <View style={{height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.6)',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:30,color:'white'}}>{currentUserData ? currentUserData.firstName : null}</Text>
          </View>
        </ImageBackground>

      </View>

      
    <View style={{zIndex:90}}>
        <View style={styles.circle}>
        <Image style={{height:'100%',width:'100%',borderRadius: 50}} source={{uri: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"}} resizeMode= 'cover'/>
        </View>
    </View>
  

      <TouchableOpacity style={{zIndex:100}}>
        <View style={{ width:28,height:30,backgroundColor:'white',borderRadius:50,position:'absolute',top:12,left:113}} />
       <Feather name="plus-circle" size={36} color="black" style={{ position:'absolute',top:10,left:110}} /> 
        </TouchableOpacity>
{/* a */}



      <ScrollView>

<View style={{height:'12%',width:'100%',justifyContent:'center',alignItems:'center' }}>
      <Text style={{fontSize:20,color:blue,marginRight:130,fontSize:25}}> shneor shrybr</Text>
      <Text style={{fontSize:20,color:blue,marginRight:30,fontSize:20}}> 21 </Text>
</View>


<View style={{flexDirection:'row'}}>

      <View style={{height:100,width:100,borderRadius:50,position:'absolute',top:10,right:270,zIndex:100,backgroundColor:'#F0FFFF'
      ,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
             <Text style={{fontSize:15,color:oreng,textAlign:'center'}}> 70Kg </Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> Purpose</Text>
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
         

      </View>


<View style={{width:'90%',justifyContent:'center',alignItems:'center'}}>


            {
                 nameInputPresented
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangeNameInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> shneor shryber </Text>
          <Ionicons style={{marginEnd:20}} name="md-man" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
                
            
              <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeNameInpout}
               />
  
              <TextInput placeholder=' Enter here ...' 
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'80%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
        </View>



            }
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />
  
{
  
  dateInputPresented 
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangeDateInput}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>21/10/22</Text>
          <MaterialIcons  style={{marginEnd:20}} name="date-range" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeDateInput}
               />
              <TextInput placeholder=' Enter here ...' 
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'80%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
        </View>



            }

<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />

{
  emailInputPresented
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangeEmailInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>{auth.currentUser?.email}</Text>
          <MaterialIcons style={{marginEnd:20}} name="email" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeEmailInpout}
               />
              <TextInput placeholder=' Enter here ...' 
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'80%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
        </View>



            }

<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />



{/* <View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> Purpose </Text>
<Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />
</View> */}


{
  purposeInputPresented
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangePurposeInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>Purpose</Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangePurposeInpout}
               />
              <TextInput placeholder=' Enter here ...' 
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'80%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
        </View>



            }

<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />


{/* <View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> {password} </Text>
<AntDesign style={{marginEnd:20}} name="lock" size={24} color="black" />
</View> */}

{
  passwordInputPresented
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangePasswordInput}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>Password</Text>
          <AntDesign style={{marginEnd:20}} name="lock" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangePasswordInput}
               />
              <TextInput placeholder=' Enter here ...' 
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'80%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
        </View>



            }

<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />

    <View style={{width:'100%', height:85,alignItems:'center' }}>
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
    <ImageBackground source={{uri: "https://img.freepik.com/free-photo/healthy-lifestyle-people-food-concept-reluctant-handsome-young-man-pointing-finger-disgusting-salad-unwilling-eat-this-smirking-dissatisfied-tilting-head-sad-yellow-background_1258-59808.jpg?size=626&ext=jpg&ga=GA1.2.1278374744.1675142697&semt=ais"}} resizeMode= 'cover'>
    <View style={styles.guestContainer}>


    <Text style={{fontSize:35,color:'white', marginTop: 60}}>Profile</Text>
    <Text style={{fontSize:20,color:'white', padding: 10}}>Profile information is only visible to registered users</Text>
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    
  },
  guestContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
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
  width: 80,
  height: 80,
  borderWidth:2,
  borderRadius: 50,
 position:'absolute',
 top:-46,
left:70,
},
weightContainer:{
  
  marginTop:5,
  width: 200,
  height: 110,
  borderWidth:2,
  borderRadius: 20,
backgroundColor:'#F0FFFF',
alignItems:'center',
justifyContent:'center',
marginLeft:120,
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