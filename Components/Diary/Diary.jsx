import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,useWindowDimensions,TextInput,Button,Alert,Modal,FlatList,Image } from 'react-native'
import React, {useState, useEffect,PureComponent, memo } from 'react'
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc} from 'firebase/firestore';
import { oreng,blue } from '../Globals/colors';
import {Picker} from '@react-native-picker/picker';
import FadeInOut from 'react-native-fade-in-out';
// שניאור
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

  const [foodNameAdd, setFoodNameAdd] = useState('');
  const [foodAmountAdd, setFoodAmountAdd] = useState('');
  const [foodCalories, setFoodCalories] = useState('');
  const [foodProteins, setFoodProteins] = useState('');
  const [foodFat, setFoodFat] = useState('');
  const [foodCarbs, setFoodCarbs] = useState('');
  const [onAddFood ,setOnAddFood] = useState(false);
  const [ShowOnAddFood ,setShowOnAddFood] = useState(false);


  const [foodName, setFoodName] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);

  const [FavoriteFoodName,setFavoriteFoodName] = useState('');
  const [FavoriteFoodAmount,setFavoriteFoodAmount] = useState('');
  const [FavoriteFoodCal,setFavoriteFoodCal] = useState('');
  const [FavoriteFoodPro,setFavoriteFoodPro] = useState('');
  const [FavoriteFoodFat,setFavoriteFoodFat] = useState('');
  const [FavoriteFoodCarbs,setFavoriteFoodCarbs] = useState('');




  const [text, setText] = useState('');
  const [quantity,setQuantity]=useState('');
 


  const [data2, setData2] = useState([""]);  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [finelText2,setFinelText2] = useState('');
  const [showFlat,setShowFlat] = useState(1);
  const [data2Empty,setData2Empty] = useState(false);

  const [weight,setWeight] = useState(0);
  const [height,setHeight] = useState(0);
  const [activityLevel,setActivityLevel] = useState(0);


  const [showModal, setShowModal] = useState(false);
  

 
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
        setData2Empty(false)
        
        
      })
      .catch(error => {
        setData2Empty(true)

       
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


  const handleAddToFavorites = (isCreation,id,foodName,foodAmount) => {
    // logic to add product to favorites
    setShowModal(true);
    updateFavoriteFood(isCreation,id,foodName,foodAmount)
  };


const handleAddFood = () => {
  // Check that all fields are filled before adding the food
  
  if (!foodName || !foodAmount || !foodCalories || !foodProteins || !foodFat) {
    alert('Please fill all fields.');
    return;
  }

  // Add the food to the list of foods
  let size = currentUserData.daysDetails[copyIndexDay].dailyCreationFood.length;
  

  currentUserData.daysDetails[copyIndexDay].dailyCreationFood[size]=
  {
    id: size+1,
  name: foodName,
  amount: Number(foodAmount),
  calories: Number(foodCalories),
  proteins: Number(foodProteins),
  fat: Number(foodFat),
  carbs: Number(foodCarbs),
};

  updateCreationFood(currentUserData.id ,currentUserData.daysDetails[copyIndexDay].dailyCreationFood)  

  // Clear the form fields
  setFoodName('');
  setFoodAmount('');
  setFoodCalories('');
  setFoodProteins('');
  setFoodFat('');


  Alert.alert(
    `${foodName} `,
    "Added successfully",
    [
      {
        text: 'Ok',
        onPress: () => {
         
        },
        style: 'default',
        marginVertical: 10, // Adjust the vertical spacing here
      },
    
    ],
    { cancelable: false }
  );
  setModalVisible4(false)
  // Close the modal




};
function handleAddFood2(amount,name,calories,proteins,carbs,fat){
  // Check that all fields are filled before adding the food
  
  /* console.log("name====="+name); */
 
  // Add the food to the list of foods
  let size = currentUserData.daysDetails[copyIndexDay].dailyCreationFood.length;
  

  currentUserData.daysDetails[copyIndexDay].dailyCreationFood[size]=
  {
    id: size+1,
  name: name,
  amount: Number(amount),
  calories: Number(calories),
  proteins: Number(proteins),
  fat: Number(fat),
  carbs: Number(carbs),
};

  updateCreationFood(currentUserData.id ,currentUserData.daysDetails[copyIndexDay].dailyCreationFood)  

  // Clear the form fields
  setFoodName('');
  setFoodAmount('');
  setFoodCalories('');
  setFoodProteins('');
  setFoodFat('');


  Alert.alert(
    `${foodName} `,
    "Added successfully",
    [
      {
        text: 'Ok',
        onPress: () => {
         
        },
        style: 'default',
        marginVertical: 10, // Adjust the vertical spacing here
      },
    
    ],
    { cancelable: false }
  );
  setModalVisible4(false)
  // Close the modal




};

const updateCreationFood = async (id,dailyCreationFood) => {

  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.daysDetails]
  

  currDaysDetails[copyIndexDay].dailyCreationFood = dailyCreationFood;

  let sum=0;

  currDaysDetails[copyIndexDay].dailyFood.map((e)=>{
   
sum += e.foodCalory ;

  })
  currDaysDetails[copyIndexDay].dailyCreationFood.map((e)=>{
   
sum += e.calories ;

  })
 
  currDaysDetails[copyIndexDay].dailyCalories = sum;
 
  const newFields ={daysDetails: currDaysDetails } 

  await updateDoc(userDoc , newFields)

}




const updateFavoriteFood = async (isCreation,id,foodName,foodAmount) => {


  if(currentUserData)
  {
      
    const userDoc = doc(db,"users",id)
    let size = currentUserData.dailyFavoriteFood.length;
    /* console.log("siae is:" + size); */
    let currUserData = [...currentUserData.dailyFavoriteFood]

 
if(isCreation==0)
{

  /* console.log(FavoriteFoodCal);
  console.log("test-0"); */

  currentUserData.dailyFavoriteFood[size] = {
        Type:0,
        id: size+1,
        name: foodName,
        amount: Number(foodAmount),
        calories: Number(FavoriteFoodCal),
      proteins: Number(FavoriteFoodPro),
      fat: Number(FavoriteFoodFat),
      carbs: Number(FavoriteFoodCarbs),
    }

    currUserData =currentUserData.dailyFavoriteFood ;
}
else if(isCreation==1){

  let currFoodCalory;

  if(currentUserData)
  {

    currFoodCalory = data2.nutrients.ENERC_KCAL ; 
  }
  /* console.log("test-1");

  console.log(currFoodCalory * (foodAmount/100)); */
  
  currentUserData.dailyFavoriteFood[size] = {
    
    Type:1,
    foodAmount: Number(foodAmount),
    foodName: foodName ,
    foodCalory: Number(currFoodCalory * (foodAmount/100)),
    id: Number(size+1)
  };

  currUserData =currentUserData.dailyFavoriteFood ;
  
}



const newFields ={dailyFavoriteFood: currUserData } 

await updateDoc(userDoc , newFields)

}


} 





const updateDayleFood = async (id,foodAmount,foodName) => {

  let size = currentUserData.daysDetails[copyIndexDay].dailyFood.length;

  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.daysDetails]
  let currFoodCalory = data2.nutrients.ENERC_KCAL ;


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
  currDaysDetails[copyIndexDay].dailyCreationFood.map((e)=>{
   
    sum += e.calories ;
    
      })
 
  currDaysDetails[copyIndexDay].dailyCalories = sum;
 
  const newFields ={daysDetails : currDaysDetails } 

  await updateDoc(userDoc , newFields)

}



const deleateFavoriteFood = async(id,foodAmount,foodName,idNum)=>{
  
if(currentUserData)
{



const newArray =  currentUserData.dailyFavoriteFood.map(item => {
  
    if (item.id == idNum ) {
      return null; // this will remove the item from the array
    }
    return item;

  }).filter(Boolean); 
  

  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.dailyFavoriteFood]

  currentUserData.dailyFavoriteFood = newArray;
  currDaysDetails = newArray;

  const newFields ={dailyFavoriteFood: currDaysDetails } 

  await updateDoc(userDoc , newFields) 

}
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

  let sum = 0;
 
  currDaysDetails[copyIndexDay].dailyFood.map((e,i)=>{

sum += e.foodCalory ;

  })
  currDaysDetails[copyIndexDay].dailyCreationFood.map((e,i)=>{
  
    sum += e.calories ;
    
      })
  

  currDaysDetails[copyIndexDay].dailyCalories = sum;

 
  const newFields ={daysDetails: currDaysDetails } 

  await updateDoc(userDoc , newFields) 
}



const deleateCreationFood = async(id,idNum)=>{
  
  const newArray =  currentUserData.daysDetails[copyIndexDay].dailyCreationFood.map(item => {
    
      if (item.id == idNum ) {
        return null; // this will remove the item from the array
      }
      return item;
  
    }).filter(Boolean); 
    
  
    const userDoc = doc(db,"users",id)
  
    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[copyIndexDay].dailyCreationFood=newArray;
  
    let sum = 0;
   
    currDaysDetails[copyIndexDay].dailyCreationFood.map((e,i)=>{
  
  sum += e.calories ;
  
    })

    
  currDaysDetails[copyIndexDay].dailyFood.map((e,i)=>{

    sum += e.foodCalory ;
    
      })
      
  
    currDaysDetails[copyIndexDay].dailyCalories = sum;
  
   
    const newFields ={daysDetails: currDaysDetails } 
  
    await updateDoc(userDoc , newFields) 
  }

  const updateWater = async (id, water, singleDay) => {

    const userDoc = doc(db,"users",id)

    let currDaysDetails = [...currentUserData.daysDetails]
  
    currDaysDetails[singleDay].water = water;

    const newFields ={daysDetails: currDaysDetails } 

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

  const updateIndexDeyFirebase = async (id, index) => {


    const userDoc = doc(db,"users",id)
    const newFields ={indexDeyFirebase : index } 
    await updateDoc(userDoc , newFields)
  
  }
  
 

  

  const now = Date.now();
const currentDate = new Date(now);


const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
/* console.log(futureDate); */


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
        updateIndexDeyFirebase(currentUserData.id, index);
       /*  console.log(new Date(now));
        console.log(currentUserData.daysDetails[0].singleDate.toDate()); */
        
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
  }, 20000000); 



  // console.log("index in useEffect" +  " " + index);
/*   console.log("_____________________");
  console.log("test index in useEffect" +  " " + testIndex); */

  return () => clearInterval(intervalId);

}, [currentUserData, testIndex, weight, height]);

// console.log("index after useEffect" +  " " + index);
/* console.log("test index after useEffect" +  " " + testIndex); */




 /*  const future = new Date(today.setDate(today.getDate() +4)); */
 


 const handleSubmit = () => {


if(data2Empty)
{
  Alert.alert(
    'Error',
    'Product does not exist, Would you like to add to the list a new product that you will create?',
    [
      {
        text: 'Yes',
        onPress: () => {
          /* console.log('Yes Pressed'); */
          setModalVisible4(true);
        },
        style: 'default',
        marginVertical: 10, // Adjust the vertical spacing here
      },
      {
        text: 'No',
        onPress: () => {
          /* console.log('No Pressed'); */
          // Add code here to handle the "No" response
        },
        style: 'cancel',
       
      },
    ],
    { cancelable: false }
  );

 
}
else
{ 
  updateDayleFood(currentUserData.id,foodAmount , (foodName || finelText2))
  

  if (  foodAmount && (foodName || finelText2)) {
    setModalVisible(true);
    
  }
};

}

const handleSubmit2 = (id,foodAmount,foodName) => {

    updateDayleFood(id, foodAmount, foodName )
    
  
    if (  foodAmount && foodName ) {
      setModalVisible(true);
    }
  
  
  }


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
  
      /*   console.log("copyIndexDay:" + "  " + copyIndexDay);
        console.log("weight:" + "  " + weight);
        console.log("height:" + "  " + height);
        console.log("years:" + "  " + years);
        console.log("activityLevel:" + "  " + activityLevel);
        console.log("balancePoint:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint: null));
        console.log("dayTarget:" + "  " + (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget: null)); */




        // dayTarget

        

      }
      
      else{
        
        
        // setRmrPerDay(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
      } 
}



if(auth.currentUser)
{
  return (
    
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
     {/* <ScrollView> */}
    <View style={styles.container}>

    <View style={{backgroundColor: '#fff', width: '90%', height: '8%',marginTop: 10, borderRadius: 8 ,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>

    {
      copyIndexDay!=testIndex ?
    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay+1)} >
    <FontAwesome5 name="arrow-circle-right" size={34} color="black" />
    </TouchableOpacity>
    : <View style={{width:34,height:34}}></View>

    }

    <Text>{(copyIndexDay + 1)}</Text>
      <Text>{(index + 1)}</Text>
      <Text>{testIndex + 1}</Text>

    {  
      copyIndexDay > 0 ?
    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay-1)}>
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
    
    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>how much did you move today?</Text>

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
     style={{backgroundColor: oreng ,marginTop: 0, width: isFoodArea ? '105%' : 0 ,  height: isFoodArea ? '119%': 0, alignItems: 'center', position: 'absolute', top:-53, padding: 10, borderRadius: 8, zIndex: isFoodArea ? 999 : 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsFoodArea(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 10, fontSize: 25, fontWeight: '600',marginBottom:5}}>Food selection area</Text>
    <TouchableOpacity style={{ position: 'absolute', left: 10, top: 20 }} onPress={()=>setOnAddFood(!onAddFood)}>
       {onAddFood ? <MaterialCommunityIcons name="pen-plus" size={34} color="white" />  : <MaterialCommunityIcons name="pen-plus" size={34} color="#808080" />} 
        </TouchableOpacity>


{
  onAddFood && !ShowOnAddFood ? 
  

  <View style={styles.inputContainer}>
    <Text style={{  fontSize: 24, fontWeight: 'bold', color: oreng ,marginRight:80,padding:4,marginBottom:2}}>Add food</Text>
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
       
        {finelText2 ? <Text style={{fontSize:25,fontWeight: '900',marginBottom:2}}>{finelText2}</Text> :null}

        {query ?
 <TouchableOpacity onPress={handleSearch2} style={{marginBottom:10, backgroundColor: '#3F3F3F',borderRadius:20,paddingVertical:10,alignItems:'center'}}>
      <Text style={{fontSize:17,color:'white',fontWeight: 'bold'}}>Enter</Text>
    </TouchableOpacity>          
   :
   null}
          <FlatList
          data={results}
          renderItem={({ item }) =>
  
          <TouchableOpacity onPress={()=>handleChange(item)}  >

    <View style={{borderWidth:2,borderColor:'black',height:30,width:"100%",flexDirection:'row'}} >

    <Text> {item}</Text>
 
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
            placeholder="Enter amount "
            keyboardType="numeric"
            placeholderTextColor="#BFBFBF"
          />
        </View>
        
          {foodAmount ? <Text style={{fontSize:25,fontWeight: '900',marginBottom:10}}>{foodAmount} gm</Text> :null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setModalVisible4(true)}>
          <Text style={styles.buttonText}>Create your own dish</Text>
        </TouchableOpacity>


        

      </View>
      

:
null
}



       <TouchableOpacity style={{ position: 'absolute', left: 5, top: 63 }} onPress={()=>[setShowOnAddFood(!ShowOnAddFood)]}>
       {ShowOnAddFood ?  <AntDesign name="heart" size={32}   color= "red" /> : <AntDesign name="heart" size={32}   color= "#808080" />} 
        </TouchableOpacity>

      

{
  currentUserData && !ShowOnAddFood && !onAddFood ?
  <View style={{width:'100%',height:'93%',alignItems:'center'/* ,backgroundColor:'yellow' */}}>

<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue',marginBottom:10 }}>what did i eat today</Text>
<View style={{width:'100%',height: currentUserData.daysDetails[copyIndexDay].dailyCreationFood.length > 0 ? '50%' : '93%' ,alignItems:'center'/* ,backgroundColor:'red' */}}>
<FlatList
  style={{width:'85%'}}
  
  data={currentUserData.daysDetails[copyIndexDay].dailyFood.map(item => ({...item, key: uuidv4()}))}
  renderItem={({ item }) => (
    <View style={styles.foodContainer} key={item.key}>  
      <TouchableOpacity onPress={()=>[handleAddToFavorites(1,currentUserData.id,item.foodName,item.foodAmount ),setQuantity(item.foodAmount), setFinelText2(item.foodName)]} style={{alignItems:'center',justifyContent:'center',marginLeft:3}}>
      <MaterialCommunityIcons name="heart-plus-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginLeft:5}}>
        <FontAwesome name="wpexplorer" size={35} color="black" onPress={()=>[setQuantity(item.foodAmount), setFinelText2(item.foodName),setModalVisible3(true)]} />
      </TouchableOpacity>
      
        
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.foodName}   <Text style={{fontSize: 12 ,fontWeight: '400', marginBottom: 5,}}>{item.foodAmount}g</Text></Text>
        <Text style={styles.foodAmount}>{item.foodCalory.toFixed(0)} calory</Text>
      </View>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={24} color="black" onPress={()=>[deleateFood(currentUserData.id ,item.foodAmount,item.foodName,item.id), setModalVisible2(true)]} />
      </TouchableOpacity>
    </View>
  )}
/>
</View>
<View style={{width:'100%',height: currentUserData.daysDetails[copyIndexDay].dailyCreationFood.length > 0  ? '29%' : '0%' ,alignItems:'center'/* ,backgroundColor:'green' */}}>
<Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green',marginBottom:6,marginTop:10 }}>good chooize (Personal products)</Text>
<FlatList
  style={{width:'85%'}}
  data={currentUserData.daysDetails[copyIndexDay].dailyCreationFood}
  renderItem={({ item }) => (
    <View style={styles.foodContainer} key={item.key}>

<TouchableOpacity onPress={()=>[setQuantity(item.amount), setFinelText2(item.name),setFavoriteFoodAmount(item.amount),
           setFavoriteFoodName(item.name),setFavoriteFoodCal(item.calories),setFavoriteFoodPro(item.proteins),setFavoriteFoodCarbs(item.carbs),
           setFavoriteFoodFat(item.fat),handleAddToFavorites(0,currentUserData.id,item.name,item.amount )]} style={{alignItems:'center',justifyContent:'center',marginLeft:3}}>
      <MaterialCommunityIcons name="heart-plus-outline" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginLeft:3}}>
        <FontAwesome name="wpexplorer" size={35} color="black" onPress={()=>[setFavoriteFoodAmount(item.amount),
           setFavoriteFoodName(item.name),setFavoriteFoodCal(item.calories),setFavoriteFoodPro(item.proteins),setFavoriteFoodCarbs(item.carbs),
           setFavoriteFoodFat(item.fat) , setModalVisible5(true)]} />
      </TouchableOpacity>
      <View style={styles.foodInfoB}>
        <Text style={styles.foodName}>{item.name}   <Text style={{fontSize: 12 ,fontWeight: '400', marginBottom: 5}}>{item.amount}g</Text></Text>
        <Text style={styles.foodAmountB}>{item.calories} calory</Text>
       
      </View>
     {/*  <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.foodName}   <Text style={{fontSize: 12 ,fontWeight: '400', marginBottom: 5,}}>{item.foodAmount}g</Text></Text>
        <Text style={styles.foodAmount}>{item.foodCalory.toFixed(0)} calory</Text>
      </View> */}
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={24} color="black" onPress={()=>[deleateCreationFood(currentUserData.id,item.id), setModalVisible2(true)]} />
      </TouchableOpacity>
    </View>
  )}
/>


           </View>

           

           
  </View>


: 

null
}


{
  
 currentUserData && ShowOnAddFood ?

<View style={{width:'100%',height:'93%',alignItems:'center'/* ,backgroundColor:'yellow' */}}>
<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue',marginBottom:6,marginTop:10 }}>Favorites list </Text>

<FlatList
  style={{width:'85%'}}
  
  data={currentUserData.dailyFavoriteFood.map(item => ({...item, key: uuidv4()}))}
  renderItem={({ item }) => (

item.Type==0 ?

    <View style={styles.foodContainer} key={item.key}>  

   <TouchableOpacity onPress={()=>handleAddFood2(item.amount,item.name,item.calories,item.proteins,item.carbs,item.fat)}  style={{alignItems:'center',justifyContent:'center'}}>
      <MaterialIcons name="addchart" size={38} color={oreng} />
      </TouchableOpacity>    
  
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginLeft:25}}>
        <FontAwesome name="wpexplorer" size={35} color="black" onPress={()=>[setQuantity(item.foodAmount), setFinelText2(item.foodName),setModalVisible5(true)]} />
      </TouchableOpacity>
      
        
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}   <Text style={{fontSize: 12 ,fontWeight: '400', marginBottom: 5,}}>{item.amount}g</Text></Text>
        <Text style={styles.foodAmount}>{item.calories.toFixed(0)} calory</Text>
      </View>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={24} color="black" onPress={()=>[deleateFavoriteFood(currentUserData.id ,item.foodAmount,item.foodName,item.id), setModalVisible2(true)]} />
      </TouchableOpacity>
    </View>
    :
    
    <View style={[styles.foodContainer]} key={item.key}>  
      
      <TouchableOpacity onPress={()=>[setQuantity(item.foodAmount), setFinelText2(item.foodName),setFoodAmount(item.foodAmount),
         setFoodName(item.foodName), handleSubmit2(currentUserData.id,item.foodAmount,item.foodName)]}  style={{alignItems:'center',justifyContent:'center'}}>
      <MaterialIcons name="addchart" size={38} color={oreng} />
      </TouchableOpacity>
       <TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginLeft:25}}>
        <FontAwesome name="wpexplorer" size={32} color="black" onPress={()=>[setQuantity(item.foodAmount), setFinelText2(item.foodName),setModalVisible3(true)]} />
      </TouchableOpacity> 
     
      
        
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.foodName}   <Text style={{fontSize: 12 ,fontWeight: '400', marginBottom: 5,}}>{item.foodAmount}g</Text></Text>
        <Text style={styles.foodAmount}>{item.foodCalory.toFixed(0)} calory</Text>
      </View>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={24} color="black" onPress={()=>[deleateFavoriteFood(currentUserData.id ,item.foodAmount,item.foodName,item.id), setModalVisible2(true)]} />
      </TouchableOpacity>
    </View>

  )}
/>
</View>
:
null
}



  {!ShowOnAddFood ? 

<View style={{width:'65%'}}>
<Text style={[styles.caloriesText,{textAlign:'center'}]}>
      {currentUserData ? (currentUserData.daysDetails[copyIndexDay].dailyCalories).toFixed(0) : null} cal
    </Text>
</View>
:
null}



<Modal 
  visible={showModal} 
  animationType="slide" 
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Food Info</Text>
      <View style={styles.modalTextContainer}>
        <Text style={styles.modalText}>
        Product added to favorites!
        </Text>
      </View>
        <MaterialCommunityIcons name="heart-plus" size={44} color={oreng} />
      <TouchableOpacity 
        style={styles.modalButton} 
        onPress={() => {
          setShowModal(false);
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
<Modal visible={modalVisible4} animationType="slide">
      <View style={styles.containerC}>
        <Text style={styles.titleB}>Add Food Details</Text>
        <TextInput
          style={styles.inputB}
          placeholder="Food Name"
          value={foodName}
          onChangeText={setFoodName}
        />
        <TextInput
          style={styles.inputB}
          placeholder="Amount (in grams)"
          keyboardType="numeric"
          value={foodAmount}
          onChangeText={setFoodAmount}
        />
        <TextInput
          style={styles.inputB}
          placeholder="Calories"
          keyboardType="numeric"
          value={foodCalories}
          onChangeText={setFoodCalories}
        />
        <TextInput
          style={styles.inputB}
          placeholder="Proteins"
          keyboardType="numeric"
          value={foodProteins}
          onChangeText={setFoodProteins}
        />
        <TextInput
          style={styles.inputB}
          placeholder="Fat"
          keyboardType="numeric"
          value={foodFat}
          onChangeText={setFoodFat}
        />
        <TextInput
          style={styles.inputB}
          placeholder="carbs"
          keyboardType="numeric"
          value={foodCarbs}
          onChangeText={setFoodCarbs}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButtonB} onPress={()=>setModalVisible4(false)}>
          <Text style={styles.buttonTextB}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
   
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
              <Text style={styles.detailText}>{data2.nutrients.CHOCDF ? (data2.nutrients.CHOCDF * (quantity/100)).toFixed(1) : 0   }</Text>
            </View>
           
            <View style={styles.detailCircle}>
              <Text style={styles.detailTitle}>Fats</Text>
              <Text style={styles.detailText}>{data2.nutrients.FAT ? (data2.nutrients.FAT * (quantity/100)).toFixed(1) : null}</Text>
            </View>

            <View style={styles.detailCircleCarbsProtein}>
              <Text style={styles.detailTitle}>Protein</Text>
              <Text style={styles.detailText}>{data2.nutrients.PROCNT ? (data2.nutrients.PROCNT * (quantity/100)).toFixed(1) : null}</Text>
            </View>

            <View style={styles.detailCircleCalories}>
              <Text style={styles.detailTitle}>Calories</Text>
              <Text style={styles.detailText}>{data2.nutrients.ENERC_KCAL ? (data2.nutrients.ENERC_KCAL * (quantity/100)).toFixed(0) : null}</Text>
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

{currentUserData ? 
  <Modal
      visible={modalVisible5}
      animationType='slide'
      transparent={true}
    >

      <View style={styles.modalBackground}>
        <View style={styles.modalContainer2}>
          <TouchableOpacity style={{position: 'absolute', right: 4.5, top: 4.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=>setModalVisible5(false)}>
          <Feather name="x-circle" size={30} color="#fff"/>
          </TouchableOpacity>
        <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:30}}>{FavoriteFoodName}</Text>
              
        </View>

          {
            currentUserData.daysDetails[copyIndexDay].dailyCreationFood ?

          <View style={styles.foodDetailsContainer}>
            <View style={styles.detailCircleCarbsProtein}>
              <Text style={styles.detailTitle}>Carbs</Text>
              <Text style={styles.detailText}>{FavoriteFoodCarbs}</Text>
            </View>
           
            <View style={styles.detailCircle}>
              <Text style={styles.detailTitle}>Fats</Text>
              <Text style={styles.detailText}>{FavoriteFoodFat}</Text>
            </View>

            <View style={styles.detailCircleCarbsProtein}>
              <Text style={styles.detailTitle}>Protein</Text>
              <Text style={styles.detailText}>{FavoriteFoodPro}</Text>
            </View>

            <View style={styles.detailCircleCalories}>
              <Text style={styles.detailTitle}>Calories</Text>
              <Text style={styles.detailText}>{FavoriteFoodCal}</Text>
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
{
    !isFoodArea ? 
    <View style={{backgroundColor: '#fff', width: '90%', height: '15%',marginTop: 10, borderRadius: 8 ,flexDirection:'column',alignItems:'center', zIndex: isFoodArea ? -5: 9999}}>
      {/* {RmrCalculate()} */}
      <Text style={{marginTop: 4, fontSize: 16, fontWeight: '600'}}>Daily calories</Text>


    {  (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) == 0 ?
   
     
       // by basic activity
        <View style={{width: '85%', height: '15%', borderRadius: 8, borderWidth: 1.5, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>
     {/*  {console.log("basicBalancePoint:" + " " + currentUserData ? currentUserData.basicBalancePoint : null)}
      {console.log("basicDayTarget:" + " " + currentUserData ? currentUserData.basicDayTarget : null)} */}

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
      :
      
       null
}



    </View>

    {/* </ScrollView> */}
    </ImageBackground>
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
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
    opacity: 1,
    maxWidth: 400,
    elevation: 3,
    marginTop:60,
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
      marginTop:10,
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
  shadowColor: '#000a',
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
  marginRight: 33,
},
foodInfoB: {
 
  flex: 1,
  marginRight: 23,
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
foodAmountB: {
  fontSize: 16,
  color: '#888',
  marginRight:10,
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
containerC: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  paddingHorizontal: 20,
},
titleB: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
inputB: {
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
},
addButton: {
  backgroundColor: 'green',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop: 20,
},
closeButtonB: {
  backgroundColor: 'red',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop:10,
},
buttonTextB: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
  },
  caloriesText: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 13,
    color: oreng, // example color
    backgroundColor: 'white', // example background color
    padding: 10, // example padding
    borderRadius: 5, // example border radius
    borderWidth: 1, // example border width
    borderColor: 'green', // example border color
    textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textShadowOpacity: 0.8,
      paddingVertical: 8,
    
  },


})