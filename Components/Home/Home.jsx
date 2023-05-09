import { StyleSheet, Text, View,Image, ImageBackground,TouchableOpacity,Button,ScrollView ,
   TouchableHighlight, TouchableHighlightComponent, StatusBar,Animated ,PanResponder,Modal,
   Dimensions,TouchableWithoutFeedback,Linking , InteractionManager   } from 'react-native'
import React,{useState,useEffect} from 'react';


import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 

import LottieView from 'lottie-react-native';

import tipsData from '../Jsons/tips.json'
import FadeInOut from 'react-native-fade-in-out';

import { MaterialIcons } from '@expo/vector-icons';

import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';
import {oreng,blue } from "../Globals/colors";

import { SceneView } from 'react-navigation';

import tips from '../Jsons/tips.json';

import { useRoute } from '@react-navigation/native';


export default function Home({ navigation  }) {

 

    useEffect(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Perform your animations or long-running tasks here
      });
  
      return () => {
        task.cancel(); // Cancel the task if the component unmounts
      };
    }, []);


  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isTipsView, setIsTipsView] = useState(false);

  const [tipIndex, setTipIndex] = useState(1);
  const [isOpened, setIsOpened] = useState(false);

  const [showTip, setShowTip] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible7, setModalVisible7] = useState(false);
  const [modalVisible8, setModalVisible8] = useState(false);

  const privacyPolicyText = `
  Your privacy matters to us. We are committed to protecting your personal information and ensuring its confidentiality.
  
  We collect only the necessary data required to provide you with our services, and we never share or sell your information to third parties.
  
  Our privacy policy explains in detail what data we collect, how we use it, and the security measures we have in place to safeguard your information.
  
  We respect your choices and provide options to manage your privacy preferences. You are in control of your data.`;

const termsOfServiceText = `
  By using our app, you agree to abide by our Terms of Service, which outline the rules and guidelines for using our platform.
  
  We encourage responsible and respectful use of our app. Prohibited activities include harassment, hate speech, and any form of unlawful behavior.
  
  Our Terms of Service ensure fair usage, protect intellectual property rights, and maintain a positive community environment.
  
  We value your feedback and encourage you to report any violations or concerns regarding the Terms of Service.`;

const contentGuidelinesText = `
  Our app fosters a community where users can share content and engage with others. To maintain a safe and inclusive environment, we have content guidelines in place.
  
  We encourage you to express yourself freely, but please ensure that your content aligns with our guidelines.
  
  We do not tolerate any form of hate speech, harassment, explicit content, or violations of intellectual property rights.
  
  By adhering to these guidelines, you help us create a respectful and enjoyable experience for all users.`;

const securityDataProtectionText = `
  We take the security of your data seriously. We implement robust security measures to protect your personal information from unauthorized access.
  
  Your data is encrypted during transmission and securely stored on our servers. We regularly update our systems to stay ahead of potential threats.
  
  In the event of a security breach, we have procedures in place to promptly respond, mitigate the impact, and notify affected users as necessary.
  
  We are committed to transparency and will keep you informed about our security practices and any updates related to data protection.`;

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
      Animated.timing(slideIn,{
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








const latitude = 32.187434 ; // Example latitude
    const longitude = 34.953375; // Example longitude
    const url = `geo:${latitude},${longitude}`;

    /* 32.186562038552445, 34.953032008751535 */




    const phoneNumber1 = '0542588518'; // Replace with the phone number you want to message
    const message = `Thank you for choosing our application! We invite you to join and experience its features. Click the link to download: https://www.example.com/app`; // Customize the message and replace the link with your application's download link

    const whatsappUrlTest2 = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const whatsappUrlTest = `whatsapp://send?phone=${phoneNumber1}&text=${encodeURIComponent(message)}`;
  
    const whatsappToMaoz = `whatsapp://send?phone=${phoneNumber1}`;

    const phoneNumber2 = '0542588518'; // Replace with the phone number you want to message
  
    const whatsappUrlToShneor = `whatsapp://send?phone=${phoneNumber2}`;




 
  
   
    const openGooglePlayStore = (packageName) => {
      const playStoreUrl = `market://details?id=${packageName}`;
      Linking.openURL(playStoreUrl)
        .catch(() => {
          // Handle error if opening the Google Play Store fails
          console.log('Failed to open the Google Play Store');
        });
    };



    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
     
          if(counter < 60){

                setCounter(counter+1);

          }
          else
          {
            setCounter(0);
          }
        
      }, 300000);     
      return () => clearInterval(intervalId);
    
    }, [counter]);


    const updateDailyTipDay = async (id,singleDay) => {

      const userDoc = doc(db,"users",id)
  
/*       console.log(singleDay);
 */      let currDaysDetails = [...currentUserData.daysDetails]
    
      currDaysDetails[singleDay].WatchTheTip = true;
  
      const newFields ={daysDetails: currDaysDetails } 
  
      await updateDoc(userDoc , newFields)
    
    }



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
  

    <View style={styles.container}>

      <View style={{marginEnd: 8, width: '100%', height: '10%', alignItems: 'flex-end', justifyContent: 'center'}}>
    
<View style={{width:'100%', flexDirection:'row',justifyContent:'space-between'}}>

<TouchableOpacity>
<FontAwesome style={{  marginLeft:20}} name="envelope" size={35} color="rgb(255, 178, 71)" onPress={()=>[setShowTip(true),updateDailyTipDay(currentUserData ? currentUserData.id : null , currentUserData.indexDeyFirebase ) ]}/>
{
  currentUserData && !(currentUserData.daysDetails[0].WatchTheTip) ?

<MaterialIcons style={{position:'absolute',left:12,top:-2}} name="brightness-1" size={15} color="red" />

  :
  null
}
</TouchableOpacity>

      <TouchableOpacity onPress={toggleModalVisible}>
        <Entypo name="menu" size={40} color="#000" />
      </TouchableOpacity>
</View>


<Modal visible={showTip} animationType="slide" transparent={true}>
        <View style={styles.modalContainer9}>
          <View style={styles.modalContent9}>
            <Text style={styles.tipTitle9}>The Daily Tip</Text>
            <Text style={styles.tipText9}>
              {tips[counter].tip}
            </Text>
            <TouchableOpacity style={styles.closeButton9} onPress={()=>setShowTip(false)}>
              <Text style={styles.closeButtonText9}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>




<Modal
        visible={modalVisible7}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible7(false)}
      >
        <View style={styles.modalContainer7}>
          <View style={styles.modalContent7}>
            <ScrollView>
              <Text style={styles.sectionTitle7}>Privacy Policy</Text>
              <Text style={styles.policyText7}>{privacyPolicyText}</Text>

              <Text style={styles.sectionTitle7}>Terms of Service</Text>
              <Text style={styles.policyText7}>{termsOfServiceText}</Text>

              <Text style={styles.sectionTitle7}>Content Guidelines</Text>
              <Text style={styles.policyText7}>{contentGuidelinesText}</Text>

              <Text style={styles.sectionTitle7}>Security and Data Protection</Text>
              <Text style={styles.policyText7}>{securityDataProtectionText}</Text>
            </ScrollView>

            <Button title="Close" onPress={() => setModalVisible7(false)} />
          </View>
          </View>

          </Modal>
<Modal
        visible={modalVisible8}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible8(false)}
      >
        <View style={styles.modalContainer8}>
          <View style={styles.modalContent8}>
            <Button title="Contact via Email" /* onPress={openEmail8} */ />
            <Button title="Contact via Phone" /* onPress={openPhone8} */ />
            <Button title="Contact via WhatsApp" /* onPress={openWhatsApp8} */ />
            <Button title="Contact via SMS" /* onPress={openSMS8} */ />
            <Button title="Close" onPress={() => setModalVisible8(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisible8}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible8(false)}
      >
        <View style={styles.modalContainer8}>
          <View style={styles.modalContent8}>
            <Text style={styles.title8}>Contact Options</Text>

            <View style={styles.buttonContainer8}>

            <TouchableOpacity style={styles.contactButton} onPress={ ()=> Linking.openURL(whatsappToMaoz)}>
              <Text style={styles.contactButtonText}>Contact via WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}  onPress={()=>Linking.openURL('mailto:shmproject2023@gmail.com')}>
              <Text style={styles.contactButtonText}>Contact via Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}  onPress={()=>Linking.openURL('tel:0585710584')}>
              <Text style={styles.contactButtonText}>Contact via Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={()=>Linking.openURL('sms:0585710584')}>
              <Text style={styles.contactButtonText}>Contact via SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton2} onPress={()=>Linking.openURL(url)}>
              <Text style={styles.contactButtonText}>Where are we located?</Text>
            </TouchableOpacity>

           


            <TouchableOpacity style={{backgroundColor:'#0974c0', borderRadius: 8,paddingVertical: 10,paddingHorizontal: 16,marginBottom: 10,marginTop:20}}
             onPress={() => setModalVisible8(false)}>
              <Text style={styles.contactButtonText}>Close</Text>
            </TouchableOpacity>
           

             
            </View>

           
          </View>
        </View>
      </Modal>


<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisible}
      >
        <TouchableWithoutFeedback onPress={toggleModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.modalButton} onPress={()=>  Linking.openSettings()}>
                <Text style={styles.modalButtonText}>Settings</Text>
              </TouchableOpacity>
            {/*   <TouchableOpacity style={styles.modalButton} onPress={() => Linking.openURL('https://www.youtube.com/watch?v=wrKWEaTYxjw')}>
                <Text style={styles.modalButtonText}>youtube</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={()=> openGooglePlayStore('com.instagram.android')}>
                <Text style={styles.modalButtonText}>instegramAppStore</Text>
              </TouchableOpacity>
             
              <TouchableOpacity style={styles.modalButton} onPress={()=> Linking.openURL(url)}>
                <Text style={styles.modalButtonText}>map</Text>
              </TouchableOpacity> */}
             

    
              <TouchableOpacity style={styles.modalButton} onPress={()=>setModalVisible8(true)}>
                <Text style={styles.modalButtonText}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={()=>setModalVisible7(true)}>
                <Text style={styles.modalButtonText}>Company Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={()=>hendleSingOut()}>
                <Text style={styles.modalSignOutText}>sign out</Text>
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
  
    <Text style={{fontSize:40,color:blue,fontWeight:'200'}}>hey {currentUserData ? currentUserData.firstName : null} !</Text>


    <View style={styles.detailsHome}>
    <TouchableOpacity style={[styles.sidesDetails, {position: 'absolute', left: 20, top: 80}]}>
    
    <Text style={{fontSize: 20, fontWeight: '800',color: '#fff'}}> {currentUserData ? currentUserData.weightGoal : null}kg</Text>
    <Text style={{fontSize: 11, fontWeight: '600',color: '#fff'}}>goal weight</Text>

  
    </TouchableOpacity>
   
     
    <TouchableOpacity style={styles.mainDetail}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize: 35, fontWeight: '800', color: '#fff'}}>{currentUserData  ? currentUserData.daysDetails[0].dailyCalories : null}</Text>
    <Text style={{fontSize: 22, fontWeight: '600', color: '#fff'}}>cal</Text>
      </View>

    </TouchableOpacity>
    <TouchableOpacity style={[styles.sidesDetails, , {position: 'absolute', right: 20, top: 80}]}>
    <Text style={{fontSize: 20,color: '#fff', fontWeight: '600'}}>{currentUserData ? currentUserData.weight : null}kg</Text>
    <Text style={{fontSize: 11, fontWeight: '600',color: '#fff'}}>starting weight</Text>          
    </TouchableOpacity>
    
    </View>
    </View>
     
  
      <View style={{width: '100%', height: '25%', marginTop: 70, alignItems: 'center', justifyContent: 'center'}}>
      
      <Text style={{padding: 10, fontSize: 28, fontWeight: '600',color: blue, padding: 10 }}> your progress</Text>

      <View style={{backgroundColor: '#f5ecdc',width: '85%', height: '24%', borderRadius: 8, borderWidth: 1.5, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
      <Text style={{position: 'absolute', right: 5, top: -21, fontWeight: '600'}}>{(currentUserData ? currentUserData.indexDeyFirebase: null)}/{(currentUserData ? currentUserData.daysDetails.length : null)} days</Text>
      <Foundation style={{ color: '#fff', fontWeight: '700', position: 'absolute', left: -25, top: 8}}  name="target-two" size={22} color="red" />
  
      <View style={{backgroundColor: '#36a605' ,height: '100%', width: `${((currentUserData ? currentUserData.indexDeyFirebase: null) / (currentUserData ? currentUserData.daysDetails.length : null)  ) * 100 }%`,borderTopEndRadius: 7, borderBottomEndRadius: 7,borderTopStartRadius: 5, borderBottomStartRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
      {
        (currentUserData ? currentUserData.daysDetails.length : null) != (currentUserData ? currentUserData.indexDeyFirebase: null) ?
      <LottieView style={{height: 53, position: 'absolute', left: -7.7}}  autoPlay source={require('../lottieAnimation/walk_progress.json')}/> :
      <LottieView style={{height: 50, position: 'absolute', left: -7.7}}  autoPlay source={require('../lottieAnimation/standing_man.json.json')}/> 

      }
      </View>
      </View>
      {
        (currentUserData ? currentUserData.indexDeyFirebase: null) == 0 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>good luck!</Text> : 
        (currentUserData ? currentUserData.indexDeyFirebase: null) == 5 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>no excuses! keep persevering...</Text> : 
        (currentUserData ? currentUserData.indexDeyFirebase: null) == 10 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>They say the first ten days are the hardest...</Text> : 
        (currentUserData ? currentUserData.indexDeyFirebase: null) == ((currentUserData ? currentUserData.daysDetails.length : null) * 0.5) ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You are halfway there!</Text> :
        (currentUserData ? currentUserData.indexDeyFirebase: null) == ((currentUserData ? currentUserData.daysDetails.length : null) * 0.75) ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>Come on! Just a little more!</Text> :

      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 10 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>Wow, 10 days and you're done!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 9 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You reach the goal in 9 days!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 8 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>8 days from now!!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 7 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You reach the goal in 7 days!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 6 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You reach the goal in 6 days!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 5 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>5 days and it's yours!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 4 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>4 days left, come on!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 3 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You reach the goal in 3 days!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 2 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>Last two days.. last-ditch effort!</Text> : 
      (currentUserData ? currentUserData.daysDetails.length : null) - (currentUserData ? currentUserData.indexDeyFirebase: null) == 1 ? 
      <Text style={{marginTop: 8, fontSize: 16, fontWeight: '300'}}>You reach the goal in 1 day!</Text> : null
      
      }        
      </View>
      <View style={{flexDirection:'row',width:170,justifyContent:'center',justifyContent:'space-evenly',marginTop:30}}>

      <Entypo  name="bar-graph" size={50} color={oreng} />
      <View>
        <Text style={{fontSize:20,fontWeight:'300'}}>{(((currentUserData ? currentUserData.indexDeyFirebase: null) / (currentUserData ? currentUserData.daysDetails.length : null)  ) * 100 ).toFixed(0)}%</Text>
        <Text style={{fontSize:17,fontWeight:'200'}}>of progress</Text>
      </View>
      </View>
    
        
    </View>
    
    </TouchableOpacity>
    </Animated.View>
  )
}
else{
 
  return (
    
    <ImageBackground source={{uri: "https://images.creativemarket.com/0.1.0/ps/8436210/1820/1214/m1/fpnw/wm1/m44uvmmozdjmkaqion0pl0hrji1w6bklbgvybnufi8zayuvvg6brwped97rcsa0n-.jpg?1590762533&s=a010240a0998e1429431994509765bc0"}} resizeMode= 'cover'>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>


    <Text style={{fontSize:32,color:'white', marginTop: 60, fontWeight: '300'}}>Welcome to ShapeUp</Text>
    <Text style={{fontSize:20,color:'white', padding: 10}}>to be able to use all the features you must open a free account</Text>
    <AntDesign name="arrowdown" size={55} color="#fff" />
    <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 22, fontWeight: '500'}}>Create a user</Text>
    </TouchableOpacity>  

    
    </View>
    </ImageBackground>
  )
}
}





const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
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
    marginTop:20,
    width: '100%',
    height: '75%',

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  mainDetail:{
    width: 170,
    height: 170,
    backgroundColor: '#d89b5c',
    borderWidth: 7.5,
    borderColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  sidesDetails:{
    width: 110,
    height: 110,
    backgroundColor: 'rgb(230,190,99)',
   /*  borderWidth: 3.5, */
   /*  borderColor: '#fff', */
    borderRadius: 100,
    // marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',


  },

  loginButton:{
    width: '60%',
    height: '10%',
    backgroundColor: 'rgb(255, 178, 71)',
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
modalSignOutText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'blue',
},
modalContainer7: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent7: {
  backgroundColor: '#FFF',
  padding: 20,
  borderRadius: 8,
  elevation: 5,
  maxHeight: '80%', // Set a maximum height to allow scrolling
},
sectionTitle7: {
  fontSize: 22, // Increase the font size
  fontWeight: 'bold',
  marginBottom: 10,
},
policyText7: {
  fontSize: 14, // Increase the font size
  marginBottom: 10,
},
container8: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
modalContainer8: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent8: {
  height:'60%',
  width:'80%',
  backgroundColor: '#FFF',
  padding: 20,
  borderRadius: 8,
  elevation: 5,
},
title8: {
  fontSize: 22,
  fontWeight: 'bold',
  
  marginBottom: 10,
},
buttonContainer8: {
  marginBottom: 20,
  
},
contactButton: {
  backgroundColor: '#2ecc71',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginBottom: 10,
},
contactButton2: {
  backgroundColor: '#2ecca1',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginBottom: 10,
},
contactButtonText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},
container9: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
button9: {
  backgroundColor: '#007bff',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 5,
},
buttonText9: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
modalContainer9: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent9: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  width: '80%',
},
tipTitle9: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
tipText9: {
  fontSize: 16,
  marginBottom: 20,
  textAlign: 'center',
},
closeButton9: {
  backgroundColor: 'green',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 5,
  alignSelf: 'center',
},
closeButtonText9: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},




})