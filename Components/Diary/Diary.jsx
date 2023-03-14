import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,useWindowDimensions,TextInput,Button,Alert,Modal,FlatList,Image, ScrollView, StatusBar } from 'react-native'
import React, {useState, useEffect,PureComponent, memo } from 'react'
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc} from 'firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import FadeInOut from 'react-native-fade-in-out';

import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

export default function Diary({ navigation }) {

  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  const [isInstructions, setIsInstructions] = useState(false);
  const [isFoodArea, setIsFoodArea] = useState(false);
  
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

  const[index , setIndex]=useState(0);
  const[testIndex , setTestIndex]=useState(0);

  const[indexDay,setIndexDay] = useState(9);
  const[copyIndexDay,setCopyIndexDay] = useState(testIndex);  // change to indexDay.

  const [foodName, setFoodName] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const [text, setText] = useState('');
  const [quantity,setQuantity]=useState('');
 


  const [data2, setData2] = useState([""]);  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [finelText2,setFinelText2] = useState('');
  const [showFlat,setShowFlat] = useState(1);

  const [weight,setWeight] = useState(0);
  const [height,setHeight] = useState(0);
  const [activityLevel,setActivityLevel] = useState(0);
  
  // const [rmrPerDay,setRmrPerDay] = useState(0);
  // const [dayTarget,setDayTarget] = useState(0);

  
  

  






  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }


  const handleSearch = (text) => {
    setQuery(text);
  };
  const handleSearch2 = (text) => {
    setFinelText2(query);
    setQuery("");
    setResults([]);

  };

  const handleChange = (item) => {
    setFinelText2(item);
    setQuery("");
    setResults([]);
  }

  useEffect(() => {
    
    fetch(`https://api.edamam.com/auto-complete?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&q=${query}`)
    .then((response) => response.json())
    .then((data) => setResults(data))
    .catch((error) => console.error(error));
    
  }, [query]);
  
   useEffect(() => {
    fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&ingr=${finelText2}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData2(data.parsed[0].food)
        
        
      })
      .catch(error => {
        // handle the error
      });
    }, [finelText2]);


  const {width} = useWindowDimensions();

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


 /*  let indexDay = 0;
  let counter = 0;
  
  if(currentUserData)
  {
    counter = currentUserData.daysDetails.length;  

  let intervalId = setInterval(function() {
  
     indexDay = currentUserData.daysDetails.length - counter;          
    console.log("real " + indexDay);

    counter--;
    // If the counter has reached 0, clear the interval
    if (counter === 0) {
      clearInterval(intervalId);
      console.log("finel app");
    }
  
  }, 4000);

} */

const updateDayleFood = async (id,foodAmount,foodName) => {

  let size=currentUserData.daysDetails[copyIndexDay].dailyFood.length;


  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.daysDetails]
  let currFoodCalory= data2.nutrients.ENERC_KCAL ;

console.log(currFoodCalory);
  currDaysDetails[copyIndexDay].dailyFood[size] = {

    foodAmount: Number(foodAmount),
    foodName: foodName ,
    foodCalory: Number(currFoodCalory * (foodAmount/100)),
    id: Number(size+1)
  };

  let sum=0;

  currDaysDetails[copyIndexDay].dailyFood.map((e)=>{
   
sum += e.foodCalory ;

  })
 
  currDaysDetails[copyIndexDay].dailyCalories= sum;
 
  const newFields ={daysDetails: currDaysDetails } 

  await updateDoc(userDoc , newFields)

}

const deleateFood = async(id,foodAmount,foodName,idNum)=>{
  
  

const newArray =  currentUserData.daysDetails[copyIndexDay].dailyFood.map(item => {
  

   
    if (item.id == idNum ) {
      return null; // this will remove the item from the array
    }
    return item;

  }).filter(Boolean); 

  

  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.daysDetails]

  currDaysDetails[copyIndexDay].dailyFood=newArray;

  let sum=0;
 
  currDaysDetails[copyIndexDay].dailyFood.map((e,i)=>{

sum += e.foodCalory ;

  })

  currDaysDetails[copyIndexDay].dailyCalories= sum;

 
  const newFields ={daysDetails: currDaysDetails } 

  await updateDoc(userDoc , newFields) 
}


  const updateWater = async (id, water, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].water = water;

    const newFields ={daysDetails: currDaysDetails} 

    await updateDoc(userDoc , newFields)
  
  }
  const updateSleep = async (id, sleep, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].sleep = sleep;

    const newFields ={daysDetails: currDaysDetails } 

    await updateDoc(userDoc , newFields)
  
  }

  const updateActivityLevel = async (id, level, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].activityLevel = level;

    const newFields ={daysDetails: currDaysDetails } 

    await updateDoc(userDoc , newFields)
  
  }

  const updateDailyBalancePoint = async (id, Calories, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].dailyBalancePoint = Calories;

    const newFields ={daysDetails: currDaysDetails } 

    await updateDoc(userDoc , newFields)
  
  }

  const updateDailyDayTarget = async (id, Calories, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].dayTarget = Calories;

    const newFields ={daysDetails: currDaysDetails } 

    await updateDoc(userDoc , newFields)
  
  }
  


  

  const now = Date.now();
const currentDate = new Date(now);


const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
/* console.log(futureDate); */



// useEffect(()=>
// {
//   if(currentUserData)
//   {
//     setIndex(differenceInDays(new Date(now), currentUserData.daysDetails[0].singleDate.toDate() ) )
//     /* setCopyIndexDay(index) */

//    /*  console.log(new Date(now));
//     console.log(currentUserData.daysDetails[0].singleDate.toDate()); */
//    /*  console.log(new Date(now))
//     console.log(index); */

//     console.log(new Date(now));
//     console.log(currentUserData.daysDetails[0].singleDate.toDate());
//   }
  
//   console.log("index in useEffect" +  " " + index);
  
// },[new Date(now)])

// console.log("index after useEffect" +  " " + index);
  

const date1 = new Date(`${currentUserData ? currentUserData.birthDate.month : null}/${currentUserData ? currentUserData.birthDate.day : null}/${currentUserData ? currentUserData.birthDate.year : null}`);
const date2 = new Date();

const diffInDays = differenceInDays(date2, date1);
const years = Math.floor(diffInDays / 365);

 
useEffect(() => {
  const intervalId = setInterval(() => {
    if (currentUserData) {
 
      if(testIndex < 25){
      // if(testIndex < (currentUserData ? currentUserData.daysDetails.length : null)){

        //real code
        setIndex(differenceInDays(new Date(), currentUserData.daysDetails[0].singleDate.toDate()));
        console.log(new Date(now));
        console.log(currentUserData.daysDetails[0].singleDate.toDate());
        
        //test code
        setTestIndex(testIndex + 1)
        setCopyIndexDay(testIndex + 1)

  //      setWeight(currentUserData ? currentUserData.weight : null);
  //   setHeight(currentUserData ? currentUserData.height : null);
  //   setActivityLevel(currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null);
  // if(currentUserData ? currentUserData.gender == 1 : null){

  //   if(activityLevel != 0){
  //     updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     activityLevel )) , copyIndexDay);
  //   }
  //   else{
  //     updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     (currentUserData ? currentUserData.averageActivity : null)  )) , copyIndexDay);
  //   }

  //   // updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *   (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) )) , copyIndexDay);
  //   updateDailyDayTarget(currentUserData ? currentUserData.id: null, (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null)) - (currentUserData ? currentUserData.calToLoseDay : null), copyIndexDay);
  
  //       console.log("copyIndexDay:" + "  " + copyIndexDay);
  //       console.log("weight:" + "  " + weight);
  //       console.log("height:" + "  " + height);
  //       console.log("years:" + "  " + years);
  //       console.log("activityLevel:" + "  " + activityLevel);
  //       console.log("balancePoint:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint: null));
  //       console.log("dayTarget:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget: null));




  //       // dayTarget

        

  //     }
      
  //     else{
        
        
  //       // setRmrPerDay(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
  //     } 




      }
    }
  }, 2000); 



  // console.log("index in useEffect" +  " " + index);
  console.log("_____________________________________________________________");
  console.log("test index in useEffect" +  " " + testIndex);

  return () => clearInterval(intervalId);

}, [currentUserData, testIndex, weight, height]);

// console.log("index after useEffect" +  " " + index);
console.log("test index after useEffect" +  " " + testIndex);




 /*  const future = new Date(today.setDate(today.getDate() +4)); */


 const handleSubmit = () => {

  
  updateDayleFood(currentUserData.id,foodAmount,(foodName || finelText2))

   if (  foodAmount && (foodName || finelText2)) {
    setModalVisible(true);
   
  }
};



function RmrCalculate(activity) {
  setWeight(currentUserData ? currentUserData.weight : null);
    setHeight(currentUserData ? currentUserData.height : null);
    // setActivityLevel(currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null);
  if(currentUserData ? currentUserData.gender == 1 : null){

    if(activity != 0){
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     activity )) , copyIndexDay);
    }
    else{
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     (currentUserData ? currentUserData.averageActivity : null)  )) , copyIndexDay);
    }

    // updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *   (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) )) , copyIndexDay);
    updateDailyDayTarget(currentUserData ? currentUserData.id: null, (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null)) - (currentUserData ? currentUserData.calToLoseDay : null), copyIndexDay);
  
        console.log("copyIndexDay:" + "  " + copyIndexDay);
        console.log("weight:" + "  " + weight);
        console.log("height:" + "  " + height);
        console.log("years:" + "  " + years);
        console.log("activityLevel:" + "  " + activityLevel);
        console.log("balancePoint:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint: null));
        console.log("dayTarget:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget: null));




        // dayTarget

        

      }
      
      else{
        
        
        // setRmrPerDay(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
      } 
}







// const date1 = new Date(`${currentUserData ? currentUserData.birthDate.month : null}/${currentUserData ? currentUserData.birthDate.day : null}/${currentUserData ? currentUserData.birthDate.year : null}`);
// const date2 = new Date();

// const diffInDays = differenceInDays(date2, date1);
// const years = Math.floor(diffInDays / 365);

// function RmrCalculate() {
// useEffect(() =>{
//     setWeight(currentUserData ? currentUserData.weight : null);
//     setHeight(currentUserData ? currentUserData.height : null);
//     setActivityLevel(currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null);
//   if(currentUserData ? currentUserData.gender == 1 : null){

  
//     updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     (activityLevel > 1)  ?   activityLevel :   (currentUserData ? currentUserData.averageActivity : null)      )) , copyIndexDay);

//     // updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *   (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) )) , copyIndexDay);
//     updateDailyDayTarget(currentUserData ? currentUserData.id: null, (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null)) - (currentUserData ? currentUserData.calToLoseDay : null), copyIndexDay);
  
//         console.log("copyIndexDay:" + "  " + copyIndexDay);
//         console.log("weight:" + "  " + weight);
//         console.log("height:" + "  " + height);
//         console.log("years:" + "  " + years);
//         console.log("activityLevel:" + "  " + activityLevel);



//         // dayTarget

        

//       }
      
//       else{
        
        
//         // setRmrPerDay(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
//       }


//       // console.log(Math.floor(rmrPerDay));
//       // console.log(Math.floor(rmrPerDay));
//       // const rmrPerDay = Array(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null).fill(null)
  




//     },[ weight, height])
  // }   
    // }

    if(auth.currentUser)
    {
  return (
    
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
   {console.log("test index after useEffect" +  " " + testIndex)}

    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    <View style={styles.container}>
     {/* <ScrollView> */}
    
    <View style={{backgroundColor: '#fff', width: '90%', height: '7%',marginTop: 30, borderRadius: 8 ,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>

    {
      copyIndexDay!=testIndex ?  // change to indexDay.
    <TouchableOpacity onPress={()=>  [setCopyIndexDay(copyIndexDay+1)] } >
    <FontAwesome5 name="arrow-circle-right" size={34} color="black" />
    </TouchableOpacity>
    : <View style={{width:34,height:34}}></View>

    }

      <Text>{(copyIndexDay + 1)}</Text>
      <Text>{(index + 1)}</Text>
      <Text>{testIndex + 1}</Text>

    {  
      copyIndexDay > 0 ?
    <TouchableOpacity onPress={()=> [setCopyIndexDay(copyIndexDay-1)]}>
    <FontAwesome5 name="arrow-circle-left" size={34} color="black" />
    </TouchableOpacity>
    : <View style={{width:34,height:34}}></View>
    }

    </View>


    <View style={{backgroundColor: '#fff', width: '90%', height: '70%', marginTop: 5, alignItems: 'center', flexDirection: 'column', borderRadius: 8}}>
    <TouchableOpacity onPress={()=> setIsInstructions(true)} style={{position: 'absolute', left: 5, top: 5}}>
    <AntDesign name="questioncircleo" size={25} color="black" />
    </TouchableOpacity>

    <FadeInOut
    visible={isInstructions}
    scale={true}
     style={{backgroundColor: '#d4f1f9' ,marginTop: 30, width:'80%',  height: isInstructions ? '75%': 0, alignItems: 'center', position: 'absolute', top: 25, padding: 10, borderRadius: 8, zIndex: isInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 20, fontSize: 20, fontWeight: '600'}}>instructions</Text>
    </FadeInOut>

    <View style={{ width: '70%', height: '10%', marginTop: 10,marginBottom: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
 
    <Ionicons name="ios-barbell" size={30} color="black" />
    <FontAwesome name="bed" size={30} color="black" />
    <Entypo name="cup" size={30} color="black" />
    </View>


 {/*    <Text style={{fontSize: 16, fontWeight: '500',color:'red'}}>{indexDay ? indexDay : null }</Text> */}

      <Text style={{fontSize: 16, fontWeight: '500'}}>how much water did you drink today?</Text>
     
    <View style={{backgroundColor: '#d4f1f9', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, flexDirection: 'row'}}>
    <TouchableOpacity  onPress={()=> [setWater(3), updateWater(currentUserData.id,3,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopStartRadius: 8, borderBottomLeftRadius: 8,
     alignItems: 'center', justifyContent: 'center',borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? '#11a1f9' : '#d4f1f9' : null}}>
      <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? '#fff' : '#000' : null}}>12-17</Text>
      <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(2), updateWater(currentUserData.id,2,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? '#11a1f9' : '#d4f1f9' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? '#fff' : '#000' : null}}>8-11</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(1), updateWater(currentUserData.id,1,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? '#11a1f9' : '#d4f1f9' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? '#fff' : '#000' : null}}>5-7</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    </View>

    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>How many hours did you sleep last night?</Text>

    <View style={{backgroundColor: '#d4f1f9', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, flexDirection: 'row'}}>
    <TouchableOpacity  onPress={()=> [setSleep(3),updateSleep(currentUserData.id,3,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopStartRadius: 8, borderBottomLeftRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? '#11a1f9' : '#d4f1f9' : null}}>
      <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? '#fff' : '#000' : null}}>8-11</Text>
      <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=> [setSleep(2),updateSleep(currentUserData.id,2,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? '#11a1f9' : '#d4f1f9' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? '#fff' : '#000' : null}}>7-9</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setSleep(1),updateSleep(currentUserData.id,1,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? '#11a1f9' : '#d4f1f9' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? '#fff' : '#000' : null}}>3-6</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    </View>
    
    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>How active were you today?</Text>

    <View style={{backgroundColor: '#d4f1f9', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
    <Picker
    
  style={{
    marginTop:17,
  width: '96%',
  backgroundColor: '#d4f1f9',
  marginBottom:20,
  
  


}}
selectedValue={currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null}
onValueChange={(itemValue) => [setActiveValue(itemValue), updateActivityLevel(currentUserData.id, itemValue, copyIndexDay), RmrCalculate(itemValue)]}
>
<Picker.Item style={{fontSize: 13}} label="Choose an activity level from 1 to 5" value={0}/>
<Picker.Item  label='1' value={1.2} />
<Picker.Item  label='2' value={1.375} />
<Picker.Item  label='3' value={1.55} />
<Picker.Item  label='4' value={1.725} />
<Picker.Item  label='5' value={1.9} />
</Picker>

    </View>

    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>what did you eat today?</Text>
    <TouchableOpacity onPress={()=> setIsFoodArea(true)} style={{backgroundColor: '#11f1f1', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 21}}>Food selection area</Text>
    </TouchableOpacity>

    <FadeInOut
    visible={isFoodArea}
    scale={true}
     style={{backgroundColor: '#d4f1f9' ,marginTop: 0, width: isFoodArea ?'105%' : 0,  height: isFoodArea ? '119%': 0, alignItems: 'center', position: 'absolute', top: -53, padding: 10, borderRadius: 8, zIndex: isFoodArea ? 999 : 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsFoodArea(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 10, fontSize: 25, fontWeight: '600'}}>Food selection area</Text>
 
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
            <View style={{flexDirection:'row'}}>
          <View style={styles.inputIcon}>
          <MaterialCommunityIcons name="food-fork-drink" size={30} color="black" />
          </View>
          
          <TextInput
            style={styles.input}
            value={query}
        onChangeText={handleSearch}
            placeholder="Enter food name"
            placeholderTextColor="#BFBFBF"
            />
            </View>
          
        </View>
       
        {finelText2 ? <Text style={{fontSize:25,fontWeight: '600',marginBottom:2}}>{finelText2}</Text> :null}

 <TouchableOpacity onPress={handleSearch2} style={{marginBottom:10, backgroundColor: '#3F3F3F',borderRadius:20,paddingVertical:10,alignItems:'center'}}>
      <Text style={{fontSize:17,color:'white',fontWeight: 'bold'}}>Enter</Text>
    </TouchableOpacity>          
          <FlatList
          data={results}
          renderItem={({ item }) =>
  <TouchableOpacity onPress={()=>handleChange(item)}>

    <View style={{borderWidth:2,borderColor:'black',height:30,width:"100%",flexDirection:'row'}} >

<Text>{item}</Text>
 
  </View>

  </TouchableOpacity>
  }
 
  bounces= {false}
  
/>



        <View style={styles.inputRow}>
          <View style={styles.inputIcon}>
          <FontAwesome name="balance-scale" size={30} color="black" />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => setFoodAmount(text)}
            value={foodAmount}
            placeholder="Enter amount in grams"
            keyboardType="numeric"
            placeholderTextColor="#BFBFBF"
          />
        </View>
          {foodAmount ? <Text style={{fontSize:25,fontWeight: '600',marginBottom:10}}>{foodAmount} gm</Text> :null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      
      <Modal 
  visible={modalVisible} 
  animationType="slide" 
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Food Info</Text>
      <View style={styles.modalTextContainer}>
        <Text style={styles.modalText}>
          You entered {foodAmount} grams of {foodName || finelText2}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.modalButton} 
        onPress={() => {
          setModalVisible(false);
          setFoodName("");
          setFoodAmount("");
          setFinelText2("");
        }}
      >
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{
currentUserData ?
/* currentUserData.daysDetails[0].dailyFood.map((e)=>{

  return (
    <View style={styles.foodContainer}>
    <Text style={styles.foodName}>{e.foodName}</Text>
    <Text style={styles.foodAmount}>{e.foodAmount}g</Text>
  </View>
  )
}) */

<FlatList
style={{marginTop:10,width:'80%'}}
  data={currentUserData.daysDetails[copyIndexDay].dailyFood}
  renderItem={({ item }) => (
    <View style={styles.foodContainer}>
        <View style={{alignItems:'center',justifyContent:'center',marginLeft:10}}>
        <FontAwesome name="wpexplorer" size={35} color="black" onPress={()=>[setQuantity(item.foodAmount), setFinelText2(item.foodName),setModalVisible3(true)]} />
        </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.foodName}</Text>
        <Text style={styles.foodAmount}>{item.foodAmount}g</Text>
      </View>
      <View style={{alignItems:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={24} color="black" onPress={()=>[deleateFood(currentUserData.id ,item.foodAmount,item.foodName,item.id), setModalVisible2(true)]} />
      </View>
    </View>
  )}
 
/>
: 
null
}
   
<Modal 
  visible={modalVisible2} 
  animationType="slide" 
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Item deleted !</Text>
      <View style={styles.modalTextContainer}>
        <Text style={styles.modalText}>
        One item has been removed from the list
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.modalButton} 
        onPress={() => {
          setModalVisible2(false);
         
        }}
      >
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{data2 ? 
  <Modal
      visible={modalVisible3}
      animationType='slide'
      transparent={true}
    >

      <View style={styles.modalBackground}>
        <View style={styles.modalContainer2}>
          <TouchableOpacity style={{position: 'absolute', right: 4.5, top: 4.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=>setModalVisible3(false)}>
          <Feather name="x-circle" size={30} color="#fff"/>
          </TouchableOpacity>
        <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>{finelText2 ? finelText2 : null}</Text>
              
        </View>

          {
            data2.nutrients ?

          <View style={styles.foodDetailsContainer}>
            <View style={styles.detailCircleCarbsProtein}>
              <Text style={styles.detailTitle}>Carbs</Text>
              <Text style={styles.detailText}>{data2.nutrients.CHOCDF ? data2.nutrients.CHOCDF * (quantity/100).toFixed(1) : 0}</Text>
            </View>
           
            <View style={styles.detailCircle}>
              <Text style={styles.detailTitle}>Fats</Text>
              <Text style={styles.detailText}>{data2.nutrients.FAT ? data2.nutrients.FAT * (quantity/100).toFixed(1) : null}</Text>
            </View>

            <View style={styles.detailCircleCarbsProtein}>
              <Text style={styles.detailTitle}>Protein</Text>
              <Text style={styles.detailText}>{data2.nutrients.PROCNT ? data2.nutrients.PROCNT * (quantity/100).toFixed(1) : null}</Text>
            </View>

            <View style={styles.detailCircleCalories}>
              <Text style={styles.detailTitle}>Calories</Text>
              <Text style={styles.detailText}>{data2.nutrients.ENERC_KCAL ? data2.nutrients.ENERC_KCAL * (quantity/100).toFixed(0) : null}</Text>
            </View>
          </View>
            :
            null
            }
        </View>
      </View>
    </Modal>
:
null}



    </FadeInOut>

    {/* <View style={{backgroundColor: '#fff', width: '90%', height: '60%', marginTop: 15, alignItems: 'center', flexDirection: 'column', borderRadius: 8}}>

    </View> */}

    </View>


    <View style={{backgroundColor: '#fff', width: '90%', height: '15%',marginTop: 10, borderRadius: 8 ,flexDirection:'column',alignItems:'center'}}>
      {/* {RmrCalculate()} */}
      <Text style={{marginTop: 4, fontSize: 16, fontWeight: '600'}}>Daily calories</Text>


      { (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) == 0 ?
   
     
       // by basic activity
        <View style={{width: '85%', height: '15%', borderRadius: 8, borderWidth: 1.5, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>
      {console.log("basicBalancePoint:" + " " + currentUserData ? currentUserData.basicBalancePoint : null)}
      {console.log("basicDayTarget:" + " " + currentUserData ? currentUserData.basicDayTarget : null)}

      {/* red */}

      <View style={{width: '17.5%', height: '100%', justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width:  (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= Math.floor(currentUserData ? currentUserData.basicBalancePoint : null) ? `${(((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) - (currentUserData ? currentUserData.basicDayTarget : null)) / (Math.floor(currentUserData ? currentUserData.basicBalancePoint : null) - (currentUserData ? currentUserData.basicDayTarget : null))) * 100}%`: '100%', height: '100%',borderTopStartRadius: 8, borderBottomStartRadius: 8, backgroundColor: 'red'}}></View>
      </View>


      {/* green */}

      <View style={{width: '82.5%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width: (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= (currentUserData ? currentUserData.basicDayTarget : null) ? `${((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) / (currentUserData ? currentUserData.basicDayTarget : null)) * 100}%`: '100%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, backgroundColor: 'green'}}></View>
      </View>


      <Text style={{fontSize: 9, position: 'absolute', bottom: -13,left: 0, fontWeight: '800'}}>|</Text>
      <Text style={{fontSize: 11, position: 'absolute', bottom: -27,left: -13}}>{currentUserData ? currentUserData.basicBalancePoint : null}</Text>

      <Text style={{fontSize: 9, position: 'absolute', bottom: 16,left: 50, fontWeight: '800'}}>|</Text>
      <Text style={{fontSize: 11, position: 'absolute', bottom: 27,left: 35}}>basic({(currentUserData ? currentUserData.basicDayTarget : null)})</Text>

      </View>



        // by daley activity
      :  <View style={{width: '85%', height: '15%', borderRadius: 8, borderWidth: 1.5, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>

      {/* red */}

      <View style={{width: '17.5%', height: '100%', justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width:  (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null) ? `${(((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) - (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null)) / (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null) - (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null))) * 100}%`: '100%', height: '100%',borderTopStartRadius: 8, borderBottomStartRadius: 8, backgroundColor: 'red'}}></View>
      </View>

      
      {/* green */}

      <View style={{width: '82.5%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width: (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null) ? `${((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) / (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null)) * 100}%`: '100%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, backgroundColor: 'green'}}></View>
      </View>


      <Text style={{fontSize: 9, position: 'absolute', bottom: -13,left: 0, fontWeight: '800'}}>|</Text>
      <Text style={{fontSize: 11, position: 'absolute', bottom: -27,left: -13}}>{currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint: null}</Text>

      <Text style={{fontSize: 9, position: 'absolute', bottom: 16,left: 50, fontWeight: '800'}}>|</Text>
      <Text style={{fontSize: 11, position: 'absolute', bottom: 27,left: 35}}>target({(currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null)})</Text>

      </View>
      }

      <Text style={{marginTop: 8, fontWeight: '700', fontSize: 16}}>{currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null} calories</Text>
    </View>








    {/* </ScrollView> */}
    </View>
    </ImageBackground>
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
      <StatusBar backgroundColor="rgb(255, 178, 71)" />
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
}

const styles = StyleSheet.create({
  containerB: {
    
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    color: '#3F3F3F',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputIcon: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    marginRight:15 },
    input: {
     
      fontSize: 18,
      color: '#3F3F3F',
      marginLeft: 10,
    },
    inputIconText: {
      fontSize: 20,
    },
    button: {
      backgroundColor: '#3F3F3F',
      borderRadius: 20,
      paddingVertical: 12,
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 20,
      width: '80%',
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#3F3F3F',
    },
    modalTextContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    modalText: {
      fontSize: 24,
      color: '#3F3F3F',
    },
    modalTextHighlight: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#3F3F3F',
      marginHorizontal: 5,
    },
    modalButton: {
      backgroundColor: '#3F3F3F',
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 25,
      marginTop: 20,
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    

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
listContainer: {
  paddingHorizontal: 20,
  paddingBottom: 20,
},
foodContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
  padding: 10,
  borderRadius: 10,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
},
foodInfo: {
 
  flex: 1,
  marginRight: 40,
},
foodName: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
foodAmount: {
  fontSize: 16,
  color: '#888',
},
modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  alignItems: 'center',
  justifyContent: 'center',
},
modalContainer2: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  minWidth: '80%',
},
closeButton: {
  alignSelf: 'flex-end',
  marginBottom: 10,
  padding: 5,
  borderRadius: 20,
  backgroundColor: '#ddd',
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
},
closeButtonText: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#333',
},
foodDetailsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  marginTop: 20,
},
detailCircle: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eee',
  borderRadius: 50,
  width: 100,
  height: 100,
  marginBottom: 40,
},
detailCircleCalories: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eeb',
  borderRadius: 50,
  width: 100,
  height: 100,
},
detailCircleCarbsProtein: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eee',
  borderRadius: 50,
  width: 100,
  height: 100,
  marginBottom: 0,
  marginTop:10
},
detailTitle: {
  fontWeight: 'bold',
  fontSize: 14,
  color: '#333',
  marginBottom: 5,
},
detailText: {
  fontSize: 16,
  color: '#666',
},

})