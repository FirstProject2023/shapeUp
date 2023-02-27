import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';


export default function Home({ navigation }) {

  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(()=>{

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc)=> ({...doc.data() , id: doc.id })));
    }
    getUsers();
  },[]);


  if(auth.currentUser)
  {  

    useEffect(() => {
      
      const currentUser = users.find((user) => user && user.email ? user.email.toLowerCase() == auth.currentUser.email.toLowerCase() : null );
      
    if (currentUser !== null) {
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

if(auth.currentUser)
{
  return (
    <ImageBackground source={{uri: "https://images.creativemarket.com/0.1.0/ps/8436210/1820/1214/m1/fpnw/wm1/m44uvmmozdjmkaqion0pl0hrji1w6bklbgvybnufi8zayuvvg6brwped97rcsa0n-.jpg?1590762533&s=a010240a0998e1429431994509765bc0"}} resizeMode= 'cover'>

    <View style={styles.container}>

    <View style={styles.detailsHomeContainer}>
    <View style={styles.detailsHome}>
    <TouchableOpacity style={[styles.sidesDetails, {position: 'absolute', left: 32, top: 80}]}>
    
    <Text style={{fontSize: 20, fontWeight: '800'}}>right</Text>

    </TouchableOpacity>

    <TouchableOpacity style={styles.mainDetail}>
    
    <Text style={{fontSize: 35, fontWeight: '600', color: '#fff'}}>5436</Text>

    </TouchableOpacity>
    <TouchableOpacity style={[styles.sidesDetails, , {position: 'absolute', right: 32, top: 80}]}>
    <Text style={{fontSize: 20, fontWeight: '800'}}>left</Text>

    </TouchableOpacity>
    

    </View>
    </View>


     
      <Text style={{fontSize:30,color:'white'}}>hello {currentUserData ? currentUserData.firstName : null} </Text>

  

    </View>
    </ImageBackground>
  )
}
else{
 
  return (
    
    <ImageBackground source={{uri: "https://images.creativemarket.com/0.1.0/ps/8436210/1820/1214/m1/fpnw/wm1/m44uvmmozdjmkaqion0pl0hrji1w6bklbgvybnufi8zayuvvg6brwped97rcsa0n-.jpg?1590762533&s=a010240a0998e1429431994509765bc0"}} resizeMode= 'cover'>
    <View style={styles.container}>


    <Text style={{fontSize:30,color:'white', marginTop: 60}}>Welcome to ShapeUp</Text>
    <Text style={{fontSize:20,color:'white', padding: 10}}>to be able to use all the features you must open a free account</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    
    // justifyContent: 'center',
  },

  detailsHomeContainer:{
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',

  },

  detailsHome:{
    width: '100%',
    height: '75%',

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  mainDetail:{
    width: '46%',
    height: '95%',
    backgroundColor: 'rgba(0,0,0,1)',
    borderWidth: 3.5,
    borderColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  sidesDetails:{
    width: '27%',
    height: '56%',
    backgroundColor: 'rgba(249, 199, 46,0.5)',
    borderWidth: 3.5,
    borderColor: '#fff',
    borderRadius: 100,
    // marginTop: 50,
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