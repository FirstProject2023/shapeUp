import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity,ScrollView,Modal,
  modelVisible,StatusBar,onScroll,Animated ,PanResponder,Dimensions,TouchableWithoutFeedback,Linking   } from 'react-native'
import FadeInOut from 'react-native-fade-in-out';
import React, { useEffect, useState,useRef } from 'react'
import CalculatorsArrayOfFunctions from './CalculatorsArrayOfFunctions'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { blue, oreng } from '../Globals/colors';
import LottieView from 'lottie-react-native';
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';


export default function Calc({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
const [isEnglish,setIsEnglish]= useState(1);


  //ebrow 
  const[heightOfResView,setHeightOfResView] = useState(0);
  const [bmiSearchResult,setBmiSearchResult] = useState(0);
  const[whatCalcIs,setWhatCalcIs]=useState(0);
  const [finelText, setFinelText] = useState('');
  const [finelTextB, setFinelTextB] = useState('');
  const [fatValue, setFatValue] = useState(0);
  const [carbohydratesValue,setCarbohydratesValue] = useState(0);
  const [proteinValue,setProteinValue] = useState(0);
  const [caloriesValue,setCaloriesValue]= useState(-1);

  const [calorValueA,setCalorValueA]= useState(0);
  const [calorValueB,setCalorValueB]= useState(0);
  const[moreCalory,setMoreCalory]= useState(0);
  const[isMan,setIsMan]=useState(1);
  const[whatPoint,setWhatPoint]=useState(1);

  const flatListRef = useRef(null);

 
  const darts = [
    { id: '4', score: 10 },
    { id: '3', score: 5 },
    { id: '2', score: 20 },
    { id: '1', score: 3 },
    { id: '0', score: 15 },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };


  const handleScroll = (event) => {

setHeightOfResView(0);
handleScrollToTop();

const position = event.nativeEvent.contentOffset.x / 360;

setWhatPoint(position)
  };

  


  const handleModalOpen = () => {
    setIsModalVisible(true);
  };
  
  const handleModalChange1 = () => {
    setIsEnglish(1);
    setIsModalVisible(false);
  };
  const handleModalChange2 = () => {
    setIsEnglish(0);
    setIsModalVisible(false);
  };

const[showSubjects,setShowSubjects] = useState();
  const [numbers,setNumbers] = useState([0, 1, 2, 3, 4]);



  let arrOfClalcName=["Bmi","ProteinIntake","BMR","SavingStatus","WhatIsFatter"];

  const scrollViewRef = useRef();

  const handleButtonClick = () => {
    
    scrollViewRef.current.scrollToEnd({ animated: true });
   
  };
  const handleScrollToTop = () => {
  
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  let arrOfFunctions = [
    BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop),
    ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,
      fatValue,carbohydratesValue,proteinValue,finelText,caloriesValue,handleScrollToTop),
    BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView,isMan,handleScrollToTop),
    SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop),
    WhatIsFatterRes(heightOfResView,bmiSearchResult,setHeightOfResView,
      calorValueA,calorValueB,moreCalory,finelText,finelTextB,handleScrollToTop),
    ProteinIntakeResEb(heightOfResView,bmiSearchResult,setHeightOfResView,
      fatValue,carbohydratesValue,proteinValue,finelText,caloriesValue,handleScrollToTop),
    BmiResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop,handleScrollToTop),
    BmrResEb(heightOfResView,bmiSearchResult,setHeightOfResView,isMan,handleScrollToTop),
    SavingStatusResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop),
    WhatIsFatterResEb(heightOfResView,bmiSearchResult,setHeightOfResView,
      calorValueA,calorValueB,moreCalory,finelText,finelTextB,handleScrollToTop)
  ];
  const [isOpened, setIsOpened] = useState(false);
  const [isTipsView, setIsTipsView] = useState(false);





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
      navigation.navigate('Diary');
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 1900,
        useNativeDriver: false,
      }).start();
  
    }
    if (gestureState.dx > 150) {
      navigation.navigate('Home');
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



  

  return (

<Animated.View  
         {...panResponder.panHandlers}
         
        style={{
         
          transform: [{ translateX: position.x }, ],
        }}
    
        >
<ScrollView ref={scrollViewRef}>



<StatusBar backgroundColor="rgb(255, 178, 71)" />
<View style={{height:1180}}>



<View style={styles.container}>



      <TouchableOpacity style={[styles.buttonTosearch]} onPress={handleModalOpen}>
        
        {isEnglish ? <Text style={styles.buttonText}>Select Language</Text> 
        :
        <Text style={styles.buttonText}>בחר שפה</Text>
        }   


      </TouchableOpacity>

      <View style={styles.containerB}>
 
    </View>
      <Modal visible={isModalVisible} >
        <View style={styles.modalContainer}>
        <TouchableOpacity  style={{position:'absolute' ,top:15,right:15}} onPress={()=>setIsModalVisible(false)}>
          <Feather name="x-circle" size={34} color={oreng} />
           </TouchableOpacity>

          <Text style={styles.modalTitle}> select a language</Text>
          <View style={{marginTop:50,width:'100%' ,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalChange1}>
            <Text style={styles.modalButtonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalChange2}>
            <Text style={styles.modalButtonText}>Hebrew</Text>
          </TouchableOpacity>
          </View>
        
        </View>
      </Modal>


      <Text style={{fontSize: 32,fontWeight: '200',color: '#333', textAlign: 'center',}}>Nutrition Calculators</Text>
      <View style={styles.line} />

     

        <FadeInOut

visible={isTipsView}
scale={true}
 style={{   zIndex: isTipsView ? 900 : 0 , backgroundColor: '#d8f3dc' ,marginTop: 20, width: isTipsView ? '90%' : '0%', height: isTipsView ? '25%' : '0%',
  alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 5, 
  padding: 10, borderRadius: 8 , shadowColor:'red' ,shadowOpacity: 0.8, shadowRadius: 2,elevation: 35,}}>
 <Text style={{fontSize: 16,position: 'absolute', fontWeight: '600',top: 30}}>In front of you are five nutrition and fitness calculators, you are welcome to browse through them and enjoy their service To switch between calculators you have to move the screen with your finger to the left</Text>

 <LottieView autoPlay  style={{ height: 100, width:50,transform: [{ translateX: 55 }, { translateY: 29 }] , zIndex: isTipsView ? 999 : 0 }}   source={require('../lottieAnimation/swapToSide.json')}/>

<TouchableOpacity style={{position: 'absolute', right: 5, top: 8, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsTipsView(false)}>
<Feather name="x-circle" size={24} color="#fff"/>
</TouchableOpacity>
</FadeInOut>


      <TouchableOpacity onPress={()=> setIsTipsView(true)} style={{position: 'absolute', left: 20, top: 8}}>
    <AntDesign name="questioncircleo" size={30} color="black" />
    </TouchableOpacity>
  


    <View style={styles.row}>
      {darts.map((dart) => (
        /* console.log(whatPoint+"   whatPoint"), */
        <View key={dart.id} style={[styles.dart,{backgroundColor: dart.id == whatPoint.toFixed(0) ? oreng : 'white'} ]}>
          {/* <Text style={styles.dartText}>{dart.score}</Text> */}
        </View>
      ))}
    </View>

         

{
  isEnglish ?
  
  <View style={styles.FlatListContainer}>


    

<FlatList  ref={flatListRef} onScroll={onScroll || handleScroll} data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} 
heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} setIsMan={setIsMan}
setBmiSearchResult={setBmiSearchResult} setWhatCalcIs={setWhatCalcIs} fatValue={fatValue} setFatValue={setFatValue}
 carbohydratesValue={carbohydratesValue} setCarbohydratesValue={setCarbohydratesValue}
  proteinValue={proteinValue} setProteinValue={setProteinValue} finelText={finelText} setFinelText={setFinelText} setFinelTextB={setFinelTextB}
  caloriesValue={caloriesValue} setCaloriesValue={setCaloriesValue} calorValueA={calorValueA}
   setCalorValueA={setCalorValueA} calorValueB={calorValueB}  setCalorValueB={setCalorValueB} setMoreCalory={setMoreCalory} 
   handleButtonClick={handleButtonClick} isEnglish={isEnglish}
  
   />}
      horizontal 
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces= {false}
       
      />
  
    </View>
   
 :
 
  <View style={styles.FlatListContainer}>

<FlatList onScroll={onScroll || handleScroll}  onEndReachedThreshold={0.1} data={numbers} renderItem={({item}) =>
 <CalculatorsArrayOfFunctions num={item} onSelectItem={(selectedItemValue) => setWhatPoint(item)}
heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} setIsMan={setIsMan}
setBmiSearchResult={setBmiSearchResult} setWhatCalcIs={setWhatCalcIs} fatValue={fatValue} setFatValue={setFatValue}
 carbohydratesValue={carbohydratesValue} setCarbohydratesValue={setCarbohydratesValue}
  proteinValue={proteinValue} setProteinValue={setProteinValue} finelText={finelText} setFinelText={setFinelText}
  caloriesValue={caloriesValue} setCaloriesValue={setCaloriesValue} calorValueA={calorValueA}
   setCalorValueA={setCalorValueA} calorValueB={calorValueB}  setCalorValueB={setCalorValueB} setMoreCalory={setMoreCalory} 
   handleButtonClick={handleButtonClick}
   />}
   horizontal 
   showsHorizontalScrollIndicator
   pagingEnabled
   bounces= {false}
   />
  
    </View>
   
}
  {
   arrOfFunctions[whatCalcIs]
   }
     
      </View>
     
      </View>
        

</ScrollView>
      </Animated.View>
    
  )
}

const styles = StyleSheet.create({

  buttonTosearch: {
    marginTop:10,
    backgroundColor: blue,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  modalContainer: {
    height:'100%',
    backgroundColor: '#FFFFdf',
    alignItems: 'center',
  },
  modalTitle: {
    color:blue,
    fontSize: 40,
    marginTop: 140,
    fontWeight:'700'
  },
  modalButton: {
    width:'80%',
    height:'22%',
    backgroundColor:oreng,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    ,justifyContent:'center',
    alignItems:'center'
  },
  modalButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight:'700'
  },

 


  container: {
    alignItems:'center',
    height:'100%',
    backgroundColor: 'white',
  },
  FlatListContainer:{
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:'white',
   shadowColor: 'black',
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 25,

    marginTop:20,
    height:'50%',
    width:'100%',
   
    borderRadius:14,
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
    padding: 10,
  },
  resBmi: {
    marginTop:0,
      width:'100%',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:20,   
      fontWeight: 'bold',
      color: '#fff',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      
  },
  resBmi2: {
    marginTop:0,
      width:'100%',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:0,   
      fontWeight: 'bold',
      color: '#fff',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      
  },
  graphResults:{
    height:50,
    width:100,
    alignItems:'center',

  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderColor:'#d89b5c'
    ,borderWidth:2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winCircle: {
    width: 120,
    height: 120,
    borderColor: blue
    ,borderWidth:4,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerB: {
    marginTop:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dart: {
    width: 18,
    height: 18,
    borderRadius: 25,
    borderWidth:2,
    marginHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent:'space-evenly'
  },
  dartText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  modalContainer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton2: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCancelButton2: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelButtonText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f00',
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: oreng ,
    width: '85%',
    marginTop: 8,

    backgroundColor:'red',

  },

  

})


function BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{
  
  let message="";
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

 



if(bmiSearchResult > 30)
{
  message="This result puts you in the 'Obese' category. Ideally, your BMI should be between 18.5-24.9. The result means that your body weight may significantly increase the chance that you will suffer from health problems such as: heart disease, diabetes, hypertension, certain types of cancer and more."; 
}else if(bmiSearchResult < 30 && bmiSearchResult > 25)
{
  
  message="This result puts you in the Overweight' category. Ideally, your BMI should be between 18.5-24.9. The result means that your body weight may increase the chance that you will suffer from health problems such as: heart disease, diabetes, hypertension, certain types of cancer and more.";
}
else if(bmiSearchResult < 24.9 && bmiSearchResult > 18.5)
{
  
  message="This result puts you in the 'Healthy Weight' category. The result means that your body weight significantly reduces the chance that you will suffer from health problems such as: heart disease, diabetes, hypertension, certain types of cancer and more.";
}
else{
  message="This result puts you in the 'underweight' category. Which indicates that your nutritional menu does not match the nutritional requirements of your body (you eat too little). Ideally, your BMI should be between 18.5-24.9. This condition increases the chance of damage to your heart, bones and other tissues in your body. It is recommended that you start increasing your caloric intake to maintain a healthy level of body fat."; 
  
}

const WhatsAppMessage = `Hey! ${currentUserData ? currentUserData.firstName : 'A friend'}  wanted to share his BMI result with you.\n\nTheir BMI is *${bmiSearchResult.toFixed(
  1
)}*, which indicates that they are ${message}.\n\nI invite you to download the app and try it yourself!`;

const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(WhatsAppMessage)}`;

function toBack()
{
  
  handleScrollToTop();
 setHeightOfResView(0);
}

  return(
    
    <View style={{height:`${heightOfResView}%`,width:'90%',backgroundColor:'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10 }}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMI is:</Text>
    
    <View style={{flexDirection:'row', marginTop:20, marginStart:7, marginBottom:10, alignItems: 'center'}}>
  <View style={{alignItems:'center'}}>
    {  bmiSearchResult > 30 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#F44336" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#F44336',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >
      
      <Text style={{color:'white',marginTop:-6,fontSize:13}}>obesity</Text>
         
    </View>
    <View style={{
      height: 10,
      width:  heightOfResView != 0 ? 2 : 0 ,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >30</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 30 && bmiSearchResult > 24 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#FF5733" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#FF5733',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} > 
     
     <Text style={{color:'white',marginTop:-6,fontSize:13}}>over-weight</Text>
        
    </View>
    <View style={{
      height: 10,
      width:  heightOfResView != 0 ? 2 : 0 ,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >25</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 24.9 && bmiSearchResult > 18.5 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#4CAF50" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >

<Text style={{color:'white',marginTop:-6,fontSize:12}}>proper weight</Text>
         
    </View>
    <View style={{
      height: 10,
      width:  heightOfResView != 0 ? 2 : 0 ,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >18</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 18 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#8BC34A" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#8BC34A',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
      ,textAlign:'center'
    }}
    >
      
        <Text style={{color:'white',marginTop:-6,fontSize:13}}> Underweight</Text>
    
    
    </View>
    <View style={{
      height: 10,
      width:  heightOfResView != 0 ? 2 : 0 ,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:66}} >0</Text>
  </View>
</View>

  <View>
    <Text style={{fontSize: message.length > 274 ? 11 : 14   }}>{message ? message : null}</Text>
  </View>
  

  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textAlign: 'center',
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>



  <TouchableOpacity style={{ width:'50%' ,marginTop:10 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

  <TouchableOpacity style={{ position:'absolute',top:25,left:0 }} onPress={()=>Linking.openURL(whatsappUrl)}>
    { heightOfResView !=0 ? 

    <View style={{justifyContent:'center',alignItems:'center' }}>
<Text style={{fontSize:10,color:'green',fontWeight:'800'}}>Share the result </Text>
     <FontAwesome name="whatsapp" size={44} color="green" />
    </View>
      : null
     }


  </TouchableOpacity>


  </View>
   

    </View>
   

    )
    
}
function ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,fatValue,carbohydratesValue
  ,proteinValue,finelText,caloriesValue,handleScrollToTop)
{
  function toBack()
{
  handleScrollToTop();
 setHeightOfResView(0);
}

  return(
    <View style={{height: heightOfResView ,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none'  }}>
    
    <View style={{flexDirection:'row'}}>
<View style={{alignItems:'center',justifyContent:'center', fontSize:15,textAlign:'center',marginTop:18,color:'#0a2946',width:'40%',height:40,
     borderColor:'#d89b5c',borderWidth:2,marginLeft:30,borderRadius:15}}>
    <Text  style={{fontSize:15,textAlign:'center',color:'#0a2946'}}>{finelText}</Text>
     </View>
 <View style={{fontSize:30,textAlign:'center',marginTop:38,color:'#0a2946',width:'55%'}}>
      <Text  style={{fontSize:30,textAlign:'center',color:'#0a2946'}}>calories{"\n"} {caloriesValue.toFixed(0)}</Text>
 </View>
    
     </View>
    

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={{color:'#0a2946',fontSize:30}}>fat</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{fatValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:12}}>carbohydrate</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{carbohydratesValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>

      </View>
      <TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>protein</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{proteinValue.toFixed(1)}</Text>
        </View>
      </View>
      </TouchableOpacity>




  <TouchableOpacity style={{width:'50%' ,marginStart:80,marginTop:18 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

  
    </View>

  )

}
function BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView,isMan,handleScrollToTop)
{

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


  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }

  const WhatsAppMessage = `Hey! ${currentUserData ? currentUserData.firstName : 'A friend'}  wanted to share his BMR result with you.\n\nTheir BMR is *${bmiSearchResult.toFixed(
    1
  )}*  \n The BMR (Basal Metabolic Rate) calculator is a tool that estimates the number of calories your body burns at rest to maintain basic bodily functions such as breathing, blood circulation, and body temperature regulation. The calculator takes into account factors such as age, gender, height, weight, and body composition to assess the BMR. \n\nI invite you to download the app and try it yourself!`;
  
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(WhatsAppMessage)}`;

  return(
    


    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMR is:</Text>
    
   

  
    <View style={styles.resBmi}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   <View style={{width:'80%',alignItems:'center',justifyContent:'center',marginLeft:30}}>
  <Text style={{fontSize:15}}>The BMR (Basal Metabolic Rate) calculator is a tool that estimates the number of calories your body burns at rest to maintain basic bodily functions such as breathing, blood circulation, and body temperature regulation. The calculator takes into account factors such as age, gender, height, weight, and body composition to assess the BMR.</Text>
   </View>

  <TouchableOpacity style={{ width:'50%' ,marginStart:80,marginTop:30 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>
  <TouchableOpacity style={{ position:'absolute',top:85,left:0 }} onPress={()=>Linking.openURL(whatsappUrl)}>
    { heightOfResView !=0 ? 

    <View style={{justifyContent:'center',alignItems:'center' }}>
<Text style={{fontSize:10,color:'green',fontWeight:'800'}}>Share the result </Text>
     <FontAwesome name="whatsapp" size={44} color="green" />
    </View>
      : null
     }


  </TouchableOpacity>
 
  
    </View>

    )
    
}
function SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{

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

const WhatsAppMessage = `Hey! ${currentUserData ? currentUserData.firstName : 'A friend'}  wanted to share his SavingStatus result with you.\n\nTheir number of calory to SavingStatus is *${bmiSearchResult.toFixed(
  1
)}*,\n\nI invite you to download the app and try it yourself!`;

const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(WhatsAppMessage)}`;

  
  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }
  return(
    bmiSearchResult ? 
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:48}}>the calory to stay :</Text>
    
  
    <View style={styles.resBmi}>
     <Text style={{fontSize:50,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{ width:'50%' ,marginStart:80,marginTop:30 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>
  <TouchableOpacity style={{ position:'absolute',top:135,left:0 }} onPress={()=>Linking.openURL(whatsappUrl)}>
    { heightOfResView !=0 ? 

    <View style={{justifyContent:'center',alignItems:'center' }}>
<Text style={{fontSize:10,color:'green',fontWeight:'800'}}>Share the result </Text>
     <FontAwesome name="whatsapp" size={44} color="green" />
    </View>
      : null
     }


  </TouchableOpacity>
  
  
    </View>
    : null

    )
    
}
function WhatIsFatterRes(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,
  moreCalory,finelText,finelTextB,handleScrollToTop)
{

  
  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none'}}>
    
    <Text  style={{fontSize:18,textAlign:'center',marginTop:4}}>The food and weight you chose to contain more calories:</Text>

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
        <Text style={{color:'#0a2946',fontSize:20}}>{finelTextB}</Text>
          <Text style={{color:'#d89b5c',fontSize:20}}>{calorValueA.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>{finelText}</Text>
          <Text style={{color:'#d89b5c',fontSize:20}}>{calorValueB.toFixed(1)} 
      
           </Text>
        </View>
      </View>
</TouchableOpacity>
</View>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
        
          <Text style={{color:'#0a2946',fontSize:30,textShadowOffset: { width: 2, height: 2 },
             textShadowColor: '#d89b5c',textShadowRadius: 5}}>win</Text>
          <Text style={{color:'#0a2946',fontSize:20}}>{finelTextB}</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA>calorValueB ? calorValueA.toFixed(1) : calorValueB.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>




  <TouchableOpacity style={{ width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

  {/* <View style={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10
    }}/> */}
  
    </View>

    )
    
}

function BmiResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{
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

  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }

let message="";

if(bmiSearchResult > 30)
{
  message="תוצאה זאת מכניסה אותך לקטגוריה של 'השמנה' (Obese). במצב האידיאלי ה-BMI שלך צריך להיות בערכים של 18.5-24.9. משמעות התוצאה היא שמשקל גופך עלול להגדיל משמעותית את הסיכוי שתסבול מבעיות בריאות כגון: מחלות לב, סוכרת, יתר לחץ דם, סוגים מסוימים של סרטן ועוד."; 
}else if(bmiSearchResult < 30 && bmiSearchResult > 25)
{
 
  message="תוצאה זאת מכניסה אותך לקטגוריה של 'עודף משקל' (Overweight). במצב האידיאלי ה-BMI שלך צריך להיות בערכים של 18.5-24.9. משמעות התוצאה היא שמשקל גופך עלול להגדיל את הסיכוי שתסבול מבעיות בריאות כגון: מחלות לב, סוכרת, יתר לחץ דם, סוגים מסוימים של סרטן ועוד.";
}
 else if(bmiSearchResult < 24.9 && bmiSearchResult > 18.5)
{

  message="תוצאה זאת מכניסה אותך לקטגוריה של 'משקל בריא' (Healthy Weight). משמעות התוצאה היא שמשקל גופך מקטין משמעותית את הסיכוי שתסבול מבעיות בריאות כגון: מחלות לב, סוכרת, יתר לחץ דם, סוגים מסוימים של סרטן ועוד.";
}
else{
  message="תוצאה זאת מכניסה אותך לקטגוריה של 'תת משקל' (Underweight). דבר המעיד על כך שהתפריט התזונתי שלך אינו תואם את הדרישות התזונתיות של    הגוף שלך (אתה אוכל פחות מדי). במצב האידיאלי ה-BMI שלך צריך להיות בערכים של 18.5-24.9. מצב זה מגביר את הסיכוי לנזק ללב, לעצמות ולרקמות אחרות בגופך. מומלץ כי תתחיל להגביר את הצריכה הקלורית שלך, כדי לשמור על רמה בריאה של שומן בגוף."

}

const WhatsAppMessage = `שלום! ${currentUserData ? currentUserData.firstName : 'חבר'} רצה לשתף את התוצאות של המדד BMI שלו איתך.\n\nתוצאת הBMI שלו הינה *${bmiSearchResult.toFixed(
  1
  )}*,  ${message}.\n\nאני מזמין אותך להוריד את האפליקציה ולנסות זאת בעצמך!`;

  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(WhatsAppMessage)}`;



function toBack()
{

  handleScrollToTop();
 setHeightOfResView(0);
}

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10 }}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>התוצאה שלך:</Text>
    
    <View style={{flexDirection:'row', marginTop:20, marginStart:7, marginBottom:10, alignItems: 'center'}}>
  <View style={{alignItems:'center'}}>
    {  bmiSearchResult > 30 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#F44336" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#F44336',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >
      
        <Text style={{color:'white'}}>השמנה</Text>
         
    </View>
    <View style={{
      height: 10,
      width: 2,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >30</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 30 && bmiSearchResult > 25 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#FF5733" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#FF5733',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} > 
     
        <Text style={{color:'white'}}>עודף משקל</Text>
        
    </View>
    <View style={{
      height: 10,
      width: 2,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >25</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 24.9 && bmiSearchResult > 18.5 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#4CAF50" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >

        <Text style={{color:'white'}}>משקל תקין</Text>
         
    </View>
    <View style={{
      height: 10,
      width: 2,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:62}} >18</Text>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 18 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#8BC34A" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 80 : 0,
      backgroundColor: '#8BC34A',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }}
    >
      
        <Text style={{color:'white'}}>תת משקל</Text>
    
    
    </View>
    <View style={{
      height: 10,
      width: 2,
      backgroundColor: 'black',
      borderRadius: 5,
      marginTop: 5,
      marginStart:70
    }} ></View>
    <Text style={{marginStart:66}} >0</Text>
  </View>
</View>

  <View>
    <Text style={{fontSize: message.length > 244 ? 11 : 14   }}>{message ? message : null}</Text>

  </View>
  
  <View style={styles.resBmi2}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>

  <TouchableOpacity style={{ position:'absolute',top:285,left:0 }} onPress={()=>Linking.openURL(whatsappUrl)}>
    { heightOfResView !=0 ? 

    <View style={{justifyContent:'center',alignItems:'center' }}>
<Text style={{fontSize:10,color:'green',fontWeight:'800'}}>שתף את התוצאה </Text>
     <FontAwesome name="whatsapp" size={44} color="green" />
    </View>
      : null
     }

  </TouchableOpacity>
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>
  
 

    </View>

    )
    
}
function ProteinIntakeResEb(heightOfResView,bmiSearchResult,setHeightOfResView,fatValue,carbohydratesValue
  ,proteinValue,finelText,caloriesValue,handleScrollToTop)
{
  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }
  return(
    <View style={{height: heightOfResView ,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none' }}>
    
    <View style={{flexDirection:'row',width:'100%'}}>

<View style={{width:'45%',height:'100%', marginTop:8}}>
    <Text  style={{fontSize:15,textAlign:'center',color:'#0a2946',
     borderColor:'#d89b5c',borderWidth:2,marginLeft:30,borderRadius:15,justifyContent:'center'}}>{finelText}</Text>
     </View>
     <View style={{width:'100%'}}>
      <Text  style={{fontSize:40,textAlign:'center',marginTop:3,color:'#0a2946',width:'55%'}}>קלוריות{"\n"} {caloriesValue.toFixed(0)}</Text>
     </View>
    
     </View>
    

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={{color:'#0a2946',fontSize:20}}>שומנים</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{fatValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:12}}>פחמימות</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{carbohydratesValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>

      </View>
      <TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>חלבונים</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{proteinValue.toFixed(1)}</Text>
        </View>
      </View>
      </TouchableOpacity>




  <TouchableOpacity style={{ width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

  
    </View>

  )

}
function BmrResEb(heightOfResView,bmiSearchResult,setHeightOfResView,isMan,handleScrollToTop)
{

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


const WhatsAppMessage = `שלום! ${currentUserData ? currentUserData.firstName : 'חבר'} רצה לשתף את תוצאת ה-BMR שלו איתך.\n\nה-BMR שלו הוא ${bmiSearchResult.toFixed(
  1
  )} \n מחשבון BMR (Basal Metabolic Rate) הוא כלי שמעריך את מספר הקלוריות שגופך שורף במנוחה כדי לשמור על תפקודי גוף בסיסיים כמו נשימה, זרימת דם ושמירה על טמפרטורת הגוף. המחשבון לוקח בחשבון גורמים כמו גיל, מין, גובה, משקל והרכב הגוף כדי להעריך את ה-BMR.\n\nאני מזמין אותך להוריד את האפליקציה ולנסות זאת בעצמך!`;

const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(WhatsAppMessage)}`;


  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    <View style={{textAlign:'center', width:'100%',alignItems:'center',justifyContent:'center' }}>
    <Text  style={{fontSize:13,textAlign:'center',marginTop:18,width:'80%'}}>מחשבון BMR (Basal Metabolic Rate) הוא כלי שמעריך את מספר הקלוריות שגופך שורף במנוחה כדי לשמור על תפקודי גוף בסיסיים כמו נשימה, זרימת דם ושמירה על טמפרטורת הגוף. המחשבון לוקח בחשבון גורמים כמו גיל, מין, גובה, משקל והרכב הגוף כדי להעריך את ה-BMR.</Text>
    </View>
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>התוצאה שלך:</Text>
    
   

  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
  
  <TouchableOpacity style={{ width:'50%' ,marginStart:80,marginTop:30 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>
  <TouchableOpacity style={{ position:'absolute',top:225,left:0 }} onPress={()=>Linking.openURL(whatsappUrl)}>
    { heightOfResView !=0 ? 

    <View style={{justifyContent:'center',alignItems:'center' }}>
<Text style={{fontSize:10,color:'green',fontWeight:'800'}}>Share the result </Text>
     <FontAwesome name="whatsapp" size={44} color="green" />
    </View>
      : null
     }


  </TouchableOpacity>
 
  
    </View>

    )
    
}
function SavingStatusResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{
  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }
  return(
    bmiSearchResult ? 
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <View style={{width:'100%',alignItems:'center',marginTop:30}}>
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18,width:'70%'}}>מספר הקלוריות היומי לשמירת המשקל:</Text>
    </View>
    
    <View style={styles.resBmi}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>
  
    </View>
    : null

    )
    
}
function WhatIsFatterResEb(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,
  moreCalory,finelText,finelTextB,handleScrollToTop)
{

  function toBack()
  {
    handleScrollToTop();
   setHeightOfResView(0);
  }


  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none'}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>המאכל המשמין יותר:</Text>

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>

          <Text style={{color:'#0a2946',fontSize:20}}>מאכל א'</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA.toFixed(2)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
        
          <Text style={{color:'#0a2946',fontSize:20}}>מאכל ב'</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueB.toFixed(2)}</Text>
        </View>
      </View>
</TouchableOpacity>
</View>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
          <Text style={{color:'#0a2946',fontSize:30,textShadowOffset: { width: 2, height: 2 },
             textShadowColor: '#d89b5c',
               textShadowRadius: 5}}>המנצח</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA>calorValueB ? calorValueA : calorValueB}</Text>
        </View>
      </View>
</TouchableOpacity>




  <TouchableOpacity style={{width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

  {/* <View style={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10
    }}/> */}
  
    </View>

    )
    
}