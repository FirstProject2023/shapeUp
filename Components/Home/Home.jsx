import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity,
   TouchableHighlight, TouchableHighlightComponent, StatusBar,Animated ,PanResponder,Modal,
   Dimensions,TouchableWithoutFeedback  } from 'react-native'
import React,{useState,useEffect} from 'react';


import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 

import LottieView from 'lottie-react-native';


import tipsData from '../Jsons/tips.json'
import FadeInOut from 'react-native-fade-in-out';



import Svg, { Circle, Path } from 'react-native-svg';

import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';



export default function Home({ navigation }) {



  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isTipsView, setIsTipsView] = useState(false);

  const [tipIndex, setTipIndex] = useState(1);
  const [isOpened, setIsOpened] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };
  
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
  useEffect(() => {
  const intervalId = setInterval(() => {
    const currDate = new Date();
    const tipIndex = currDate.getDate() % tipsData.length;
    setTipIndex(tipIndex);
    setIsOpened(false);
  }, 86400000); // 24 hours in milliseconds;
  return () => clearInterval(intervalId);
}, [])

const currentTip = tipsData[tipIndex];

  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }


  const width = Dimensions.get('window').width;
  const [slideIn, setSlideIn] = useState(new Animated.Value(-width));

const position = new Animated.ValueXY();


const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (evt, gestureState) => {
    // Only set pan responder if the swipe is greater than 20 pixels
    if (Math.abs(gestureState.dx) > 20) {
      return true;
    }
    return false;
  },
  /* onMoveShouldSetPanResponderCapture: (evt, gestureState) => {

    position.setValue({x: gestureState.dx, y: 0})
    
  } */
  onPanResponderRelease: (evt, gestureState) => {
    // If swipe is greater than 50 pixels and it's a left swipe, navigate to another component
    if (gestureState.dx < -150) {
      navigation.navigate('Calc');
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 1900,
        useNativeDriver: false,
      }).start();
  
    }
    if (gestureState.dx > 150) {
      navigation.navigate('Articles');
    }
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    useNativeDriver: false,
  }).start();
  },
  onPanResponderMove: Animated.event([
    null,
    { dx: position.x, dy: position.y },
  ],{ useNativeDriver: false })
});











if(auth.currentUser)
{
  return (

<Animated.View  
         {...panResponder.panHandlers}
         
        style={{
         
          transform: [{ translateX: position.x }, ],
        }}
    
        >
    
    <TouchableOpacity activeOpacity={1} onPress={()=> setIsTipsView(false) }>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    <ImageBackground source={{uri: "https://images.creativemarket.com/0.1.0/ps/8436210/1820/1214/m1/fpnw/wm1/m44uvmmozdjmkaqion0pl0hrji1w6bklbgvybnufi8zayuvvg6brwped97rcsa0n-.jpg?1590762533&s=a010240a0998e1429431994509765bc0"}} resizeMode= 'cover'>

    <View style={styles.container}>

      <View style={{marginEnd: 8, width: '100%', height: '10%', alignItems: 'flex-end', justifyContent: 'center'}}>
    
<View style={{width:'100%', flexDirection:'row',justifyContent:'space-between'}}>

      <TouchableOpacity onPress={()=> [setIsTipsView(true), setIsOpened(true)]} style={{borderWidth: 3, width: '50%', height: '70%', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(255, 178, 71)',marginLeft:16}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>The daily tip</Text>
      {!isOpened ? <FontAwesome style={{position: 'absolute', left: 6}} name="envelope" size={20} color="#fff"/>: null}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleModalVisible}>
        <Entypo name="menu" size={50} color="#000" />
      </TouchableOpacity>
</View>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisible}
      >
        <TouchableWithoutFeedback onPress={toggleModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Communication</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Company Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={()=>hendleSingOut()}>
                <Text style={styles.modalButtonText}>Log out</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCancelButton} onPress={toggleModalVisible}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
           
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      </View>

    <FadeInOut
    visible={isTipsView}
    scale={true}
     style={{backgroundColor: '#fff' ,marginTop: 0, width: '90%', height: '15%', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 355, padding: 10, borderRadius: 8}}>
      {/* {console.log(currentTip)} */}
      {currentTip && <Text style={{fontSize: 16, fontWeight: '600'}}>{currentTip.tip}</Text>}
      
    <TouchableOpacity style={{position: 'absolute', right: 1, top: 1, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsTipsView(false)}>
    <Feather name="x-circle" size={24} color="#fff"/>
    </TouchableOpacity>
    </FadeInOut>

    <View style={styles.detailsHomeContainer}>
    <View style={styles.detailsHome}>
    <TouchableOpacity style={[styles.sidesDetails, {position: 'absolute', left: 32, top: 80}]}>
    
    <Text style={{fontSize: 20, fontWeight: '800'}}> {currentUserData ? currentUserData.weightGoal : null}kg</Text>

  
    </TouchableOpacity>
   
   

    
    <TouchableOpacity style={styles.mainDetail}>
  




      
    <Text style={{fontSize: 35, fontWeight: '600', color: '#fff'}}>5431</Text>

    </TouchableOpacity>
    <TouchableOpacity style={[styles.sidesDetails, , {position: 'absolute', right: 32, top: 80}]}>
    <Text style={{fontSize: 20, fontWeight: '800'}}>{currentUserData ? currentUserData.weight : null}kg</Text>

    </TouchableOpacity>
    

    </View>
    </View>
     
      <Text style={{fontSize:30,color:'white'}}>hello {currentUserData ? currentUserData.firstName : null} </Text>
  

      <View style={{width: '100%', height: '15%', marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{padding: 10, fontSize: 18, color: '#fff', fontWeight: '700'}}>progress</Text>

      <View style={{backgroundColor: 'rgba(255,255,255, 0.5)',width: '85%', height: '40%', borderRadius: 8, borderWidth: 1.5, flexDirection: 'row', justifyContent: 'flex-end'}}>
    
      <Foundation style={{ color: '#fff', fontWeight: '700', position: 'absolute', left: -25, top: 8}}  name="target-two" size={22} color="red" />
  
      <View style={{backgroundColor: '#0974c0',height: '100%', width: `${((currentUserData ? currentUserData.indexDeyFirebase: null) / (currentUserData ? currentUserData.daysDetails.length : null)  ) * 100 }%`,borderTopEndRadius: 8, borderBottomEndRadius: 8,borderTopStartRadius: 8, borderBottomStartRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 12, color: '#fff', fontWeight: '700'}}>{currentUserData ? currentUserData.indexDeyFirebase: null} days</Text>
      <LottieView style={{height: 50, position: 'absolute', left: -5.7}}  autoPlay source={require('../lottieAnimation/walk_progress.json')}/>
      </View>
      </View>
      </View>
        



    </View>
    </ImageBackground>
    </TouchableOpacity>
    </Animated.View>
  )
}
else{
 
  return (
    
    <ImageBackground source={{uri: "https://images.creativemarket.com/0.1.0/ps/8436210/1820/1214/m1/fpnw/wm1/m44uvmmozdjmkaqion0pl0hrji1w6bklbgvybnufi8zayuvvg6brwped97rcsa0n-.jpg?1590762533&s=a010240a0998e1429431994509765bc0"}} resizeMode= 'cover'>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
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
    // marginTop: 10,

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
buttonText: {
  fontSize: 20,
  fontWeight: 'bold',
  padding: 10,
},

modalContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
modalButton: {
  marginVertical: 10,
  padding: 10,
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
},
modalButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
},
modalCancelButton: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
},
modalCancelButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#f00',
},

})