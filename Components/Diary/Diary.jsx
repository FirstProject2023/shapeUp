import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,useWindowDimensions,TextInput,
  Button,Alert,Modal,FlatList,Image,Animated ,PanResponder,Dimensions } from 'react-native'
import React, {useState, useEffect,PureComponent, memo } from 'react'
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc} from 'firebase/firestore';
import { oreng,blue } from '../Globals/colors';
import {Picker} from '@react-native-picker/picker';
import FadeInOut from 'react-native-fade-in-out';
import {openBrowserAsync} from 'expo-web-browser';
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
  const [isWaterInstructions, setIsWaterInstructions] = useState(false);
  const [isSleepInstructions, setIsSleepInstructions] = useState(false);
  const [isActivityInstructions, setIsActivityInstructions] = useState(false);
  const [isFoodInstructions, setIsFoodInstructions] = useState(false);
  const [isCaloriesInstructions, setIsCaloriesInstructions] = useState(false);
  const [isFoodArea, setIsFoodArea] = useState(false);
  
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

  const[index , setIndex]=useState(0);
  // const[testIndex , setTestIndex]=useState(0);

  const[copyIndexDay,setCopyIndexDay] = useState(index);  // change to indexDay.

 
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
  const [modalVisible6, setModalVisible6] = useState(false);
  const [modalVisible7, setModalVisible7] = useState(false);

  const [FavoriteFoodName,setFavoriteFoodName] = useState('');
  const [FavoriteFoodAmount,setFavoriteFoodAmount] = useState('');
  const [FavoriteFoodCal,setFavoriteFoodCal] = useState('');
  const [FavoriteFoodPro,setFavoriteFoodPro] = useState('');
  const [FavoriteFoodFat,setFavoriteFoodFat] = useState('');
  const [FavoriteFoodCarbs,setFavoriteFoodCarbs] = useState('');




  const [text, setText] = useState('');
  const [quantity,setQuantity]=useState('');
 
  const[ dailyDate,setDailyDate]=useState(new Date())


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
  

  

  const policies = [
    'Policy 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Policy 2: Nulla venenatis metus vel feugiat interdum.',
    'Policy 3: Fusce eget sapien aliquet, tempus felis vel, aliquam tellus.',
    'Policy 4: Sed efficitur erat a bibendum pretium.'
    // Add more policies as needed
  ];

  const hendleToFinishApp =()=>{
    setModalVisible6(true);
  }
 
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
    
  /* const {width} = useWindowDimensions(); */

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


  const handleAddToFavorites = (isCreation,id,foodName,foodAmount,itemCalories,itemProteins,itemCarbs,itemFat) => {
    // logic to add product to favorites



if(isCreation==1)
{


    fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&ingr=${foodName}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      updateFavoriteFood(isCreation,id,foodName,foodAmount,itemCalories,itemProteins,itemCarbs,itemFat,data.parsed[0].food)
      setShowModal(true);
    
      setData2Empty(false)
    })
    .catch(error => {
      setData2Empty(true)
  
     
      // handle the error
    });

  }
  else if(isCreation==0)
  {
    updateFavoriteFood(isCreation,id,foodName,foodAmount,itemCalories,itemProteins,itemCarbs,itemFat,data2)
    setShowModal(true);
  }
    
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

setOnAddFood(!onAddFood)
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




const updateFavoriteFood = async (isCreation,id,foodName,foodAmount,itemCalories,itemProteins,itemCarbs,itemFat,data3) => {


  setShowOnAddFood(!ShowOnAddFood)
  if(currentUserData)
  {
      
    const userDoc = doc(db,"users",id)
    let size = currentUserData.dailyFavoriteFood.length;
    /* console.log("siae is:" + size); */
    let currUserData = [...currentUserData.dailyFavoriteFood]
 
if(isCreation==0)
{

/*   console.log(FavoriteFoodCal);
 */  console.log("test-0");

  
  currentUserData.dailyFavoriteFood[size] = {
        Type:0,
        id: size+1,
        name: foodName,
        amount: Number(foodAmount),
        calories: Number(itemCalories),
      proteins: Number(itemProteins),
      fat: Number(itemFat),
      carbs: Number(itemCarbs),
    }

    currUserData =currentUserData.dailyFavoriteFood ;
}
else if(isCreation==1){
 
  let currFoodCalory;


  if(currentUserData && data3)
  {

      currFoodCalory = data3.nutrients.ENERC_KCAL ; 
    
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





const updateDayleFood = async (id,foodAmount,foodName,data3) => {

  let size = currentUserData.daysDetails[copyIndexDay].dailyFood.length;

  const userDoc = doc(db,"users",id)

  let currDaysDetails = [...currentUserData.daysDetails]
  let currFoodCalory = data3.nutrients.ENERC_KCAL ;


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


const futureDate = new Date(currentDate.setDate(currentDate.getDate() - (currentUserData ? currentUserData.indexDeyFirebase: null)));
/* console.log(futureDate); */


const date1 = new Date(`${currentUserData ? currentUserData.birthDate.month : null}/${currentUserData ? currentUserData.birthDate.day : null}/${currentUserData ? currentUserData.birthDate.year : null}`);
const date2 = new Date();

const diffInDays = differenceInDays(date2, date1);
const years = Math.floor(diffInDays / 365);


useEffect(() => {
  const intervalId = setInterval(() => {
    if (currentUserData) {
 

      /* if(testIndex < 10){ */
       if(index < (currentUserData ? currentUserData.daysDetails.length : null)){

        //real code
        setIndex(differenceInDays(new Date(), currentUserData.daysDetails[0].singleDate.toDate()));
        updateIndexDeyFirebase(currentUserData.id, index);
        setDailyDate(currentUserData.daysDetails[index].singleDate)
      //copy 
        setCopyIndexDay((index + 1))
        
        //test code
        // setTestIndex(testIndex + 1)

      }
      else
      {
        clearInterval(intervalId);
        hendleToFinishApp();
        setModalVisible6(true);

      }
    }
  }, 24 * 60 * 60 * 1000); 


  

  return () => clearInterval(intervalId);

}, [currentUserData, index, weight, height]);


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
  updateDayleFood(currentUserData.id,foodAmount , (foodName || finelText2),data2)
  
  if (  foodAmount && (foodName || finelText2)) {
    setModalVisible(true);
    setOnAddFood(!onAddFood);
  
  }
};

}

const handleSubmit2 = (id,foodAmount,foodName) => {

  fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&ingr=${foodName}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
   setData2(data.parsed[0].food) 
   updateDayleFood(id, foodAmount, foodName,data.parsed[0].food )
    setData2Empty(false)
  })
  .catch(error => {
    setData2Empty(true)

   
    // handle the error
  });


   
    
  
    if (  foodAmount && foodName ) {
      setModalVisible(true);
    }
  
  
  }


function RmrCalculate(activity) {
  console.log(activity);
  setWeight(currentUserData ? currentUserData.weight : null);
    setHeight(currentUserData ? currentUserData.height : null);
    // setActivityLevel(currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null);
  if(currentUserData ? currentUserData.gender == 1 : null){

    if(activity != 0){
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * (currentUserData ? currentUserData.weight : null))+(4.7 * (currentUserData ? currentUserData.height : null))-(5.6 * years))  *     activity )) , copyIndexDay);
    }
    else{
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((88.36) + ( (13.39 * (currentUserData ? currentUserData.weight : null))+(4.7 * (currentUserData ? currentUserData.height : null))-(5.6 * years))  *     (currentUserData ? currentUserData.averageActivity : null)  )) , copyIndexDay);
    }
    updateDailyDayTarget(currentUserData ? currentUserData.id: null, (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null)) - (currentUserData ? currentUserData.calToLoseDay : null), copyIndexDay);
   
      }
      
      else{ 

    if(activity != 0){
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((447.593) + ( (9.25 * (currentUserData ? currentUserData.weight : null))+(4.7 * (currentUserData ? currentUserData.height : null))-(5.6 * years))  *     activity )) , copyIndexDay);
    }
    else{
      updateDailyBalancePoint(currentUserData ? currentUserData.id: null, Math.floor(((447.593) + ( (13.39 * (currentUserData ? currentUserData.weight : null))+(4.7 * (currentUserData ? currentUserData.height : null))-(5.6 * years))  *     (currentUserData ? currentUserData.averageActivity : null)  )) , copyIndexDay);
    }
    updateDailyDayTarget(currentUserData ? currentUserData.id: null, (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null)) - (currentUserData ? currentUserData.calToLoseDay : null), copyIndexDay);
  
        
      } 
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
    /* if (gestureState.dx < -50) {
      navigation.navigate('Calc');
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 1900,
        useNativeDriver: false,
      }).start();
  
    } */
    if (gestureState.dx > 150) {
      navigation.navigate('Calc');
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
    <ImageBackground source={{uri: "https://img.freepik.com/free-photo/elevated-view-measuring-tape-healthy-food-white-background_23-2147882055.jpg?size=626&ext=jpg&uid=R102133553&ga=GA1.2.212730937.1683613067&semt=ais"}} resizeMode= 'cover'>
     {/* <ScrollView> */}

{/* al models!! */}


     <Modal 
  visible={modalVisible6}
  animationType='slide'
  transparent={true}
  >

  <View style={styles.modalContainerEnd}>
    <View style={styles.modalContentEnd}>
      <Text style={styles.titleEnd}>End of Process</Text>
      <Text style={styles.descriptionEnd}>
        Thank you for using our application. This is the end of the process.
      </Text>

      <TouchableOpacity style={styles.buttonEnd} onPress={()=>hendleSingOut()}>
        <Text style={styles.buttonTextEnd}>ok</Text>
      </TouchableOpacity>
      
    </View>
  </View>
</Modal>

    <View style={styles.container}>

    <View style={{ width: '90%', height: '8%',marginTop: 15, borderRadius: 8 ,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>

    {
      copyIndexDay!=index ?
    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay+1)} >
    <FontAwesome5 name="arrow-circle-right" size={34} color="#fff" />
    </TouchableOpacity>
    : <View style={{width:34,height:34}}></View>

    }

      <Text style={{color:'#fff' ,fontSize:28,fontWeight:'700'}}>{dailyDate.getDate() + "/" + (dailyDate.getMonth() + 1) + "/" + dailyDate.getFullYear() }</Text>

    {  
      copyIndexDay > 0 ?
    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay-1)}>
    <FontAwesome5 name="arrow-circle-left" size={34} color="#fff"/>
    </TouchableOpacity>
    : <View style={{width:34,height:34}}></View>
    }

    </View>


    <View style={{ width: '90%', height: '70%', marginTop: 5, alignItems: 'center', flexDirection: 'column', borderRadius: 8}}>
  {/* WaterInstructions */}
    <FadeInOut
    visible={isWaterInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width: 280,  height: isWaterInstructions ? 320: 0, alignItems: 'center', position: 'absolute', top: 150,left: 40, padding: 10, borderRadius: 8, zIndex: isWaterInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsWaterInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 5, fontSize: 20, fontWeight: '600'}}>drinking water</Text>
    <Text>Drinking water can aid in weight loss by increasing feelings of fullness, boosting metabolism, and reducing calorie intake when consumed in place of high-calorie beverages. {"\n\n"} Try to make sure you drink enough every day, here you can mark the amount of water you drank so you can keep track of it. {"\n"}</Text>
    <Text style={{fontWeight: '600'}}>How much should you drink a day? 
    <TouchableOpacity onPress={()=> openBrowserAsync('https://www.medindia.net/patients/calculators/daily-water-requirement.asp')}>
    <Text style={{color: '#d8911f', textDecorationLine: 'underline', fontSize: 15, fontWeight: '800'}}>press here</Text>
    </TouchableOpacity>
    </Text>
    </FadeInOut>

  {/* sleepInstructions */}
    <FadeInOut
    visible={isSleepInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width: 320,  height: isSleepInstructions ? 225: 0, alignItems: 'center', position: 'absolute', top: 255,left: 15, padding: 10, borderRadius: 8, zIndex: isSleepInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsSleepInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 5, fontSize: 20, fontWeight: '600'}}>Sleep</Text>
    <Text>Getting sufficient sleep can assist in maintaining or losing weight by regulating appetite hormones, reducing food cravings, and improving metabolism.{"\n"} Try to organize your day so that you can sleep on time.{"\n"}</Text>
    <Text style={{fontWeight: '600'}}>How many hours should you sleep a day?
    <TouchableOpacity onPress={()=> openBrowserAsync('https://www.cdc.gov/sleep/about_sleep/how_much_sleep.html')}>
    <Text style={{color: '#d8911f', textDecorationLine: 'underline', fontSize: 15, fontWeight: '800'}}>press here</Text>
    </TouchableOpacity>
    </Text>
    </FadeInOut>

  {/* activityInstructions */}
    <FadeInOut
    visible={isActivityInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width: 300,  height: isActivityInstructions ? 260: 0, alignItems: 'center', position: 'absolute', top: 5,left: 30, padding: 10, borderRadius: 8, zIndex: isActivityInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsActivityInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 5, fontSize: 20, fontWeight: '600'}}>Activity</Text>
    <Text>Based on your activity level, we can estimate how many calories you will burn today, and based on that, the number of calories you can eat to meet your goal.{"\n"}</Text>
    <Text style={{fontWeight: '600'}}>If you do not select an activity level, the calculation will be based on your average activity level. (as you mentioned in the registration)</Text>
    </FadeInOut>

  {/* foodInstructions */}
    <FadeInOut
    visible={isFoodInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width: 220,  height: isFoodInstructions ? 270: 0, alignItems: 'center', position: 'absolute', top: 120,left: 30, padding: 10, borderRadius: 8, zIndex: isFoodInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsFoodInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 5, fontSize: 20, fontWeight: '600'}}>Food area</Text>
    <Text>In this area you can add the food you ate to a daily list, view its nutritional values, and the calories of each food will be added to the daily calorie intake.{"\n"}</Text>
    <Text>You can also add foods to a list of favorites, and also add your own foods that do not appear in our database</Text>
    </FadeInOut>

  {/* caloriesInstructions */}
    <FadeInOut
    visible={isCaloriesInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width: 300,  height: isCaloriesInstructions ? 280: 0, alignItems: 'center', position: 'absolute', top: 180,left: 30, padding: 10, borderRadius: 8, zIndex: isCaloriesInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsCaloriesInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 5, fontSize: 20, fontWeight: '600'}}>daily calories</Text>
    <Text>In this graph you can see the amount of calories you consumed today, when the graph has two markings, {"\n\n"} the first marks the amount of calories you can eat to meet your goal, {"\n\n"} and the second (at the end of the graph) marks the amount of calories that if you reach it, you will stay at the same weight (ie the number of calories that your body needs per day){"\n"}</Text>
    </FadeInOut>

    {/* instructions */}
    <TouchableOpacity onPress={()=> setIsInstructions(true)} style={{position: 'absolute', right: 5, top: 5}}>
    <AntDesign name="questioncircleo" size={28} color="#fff" />
    </TouchableOpacity>
    <FadeInOut
    visible={isInstructions}
    scale={true}
     style={{backgroundColor: '#d9fcc9' ,marginTop: 30, width:'80%',  height: isInstructions ? '55%': 0, alignItems: 'center', position: 'absolute', top: 75, padding: 10, borderRadius: 8, zIndex: isInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 25, fontSize: 20, fontWeight: '600', marginBottom: 10}}>Welcome to the Diary</Text>
    <Text>In this area you will be able to track various indicators on a daily basis, which will help you meet your goal. The diary is divided into 4 parts, each part has its own explanation.{"\n"}</Text>
    <Text style={{fontWeight: '600'}}>May you be able to track your progress in the process, good luck!</Text>
    </FadeInOut>

    <View style={{borderColor: '#fff',borderWidth: 3,borderRadius: 12, width: '28%', height: '13%',marginBottom: 20, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
    {/* Today */}
    <Text  style={{color: '#fff', fontSize: 17, fontWeight: '400'}} >day</Text>
    <Text style={{color: '#fff', fontSize: 22, fontWeight: '400'}}>
    {copyIndexDay + 1}
    </Text>
    
    </View>


 {/*    <Text style={{fontSize: 16, fontWeight: '500',color:'red'}}>{indexDay ? indexDay : null }</Text> */}

      <Text style={{color:'#fff', fontSize: 16, fontWeight: '600'}}>how much water did you drink today?</Text>
     
    <View style={{backgroundColor: '#FFE7C3', width: '90%', height: '12%', marginTop: 14, borderRadius: 8, flexDirection: 'row'}}>
    {/* <Entypo style={{position: 'absolute',top: 16, right: -30}} name="cup" size={28} color="#fff" /> */}
    <TouchableOpacity  onPress={()=> [setWater(3), updateWater(currentUserData.id,3,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopStartRadius: 8, borderBottomLeftRadius: 8,
     alignItems: 'center', justifyContent: 'center',borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
      <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? '#fff' : '#000' : null}}>12-17</Text>
      <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 3 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(2), updateWater(currentUserData.id,2,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? '#fff' : '#000' : null}}>8-11</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 2 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(1), updateWater(currentUserData.id,1,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? '#fff' : '#000' : null}}>5-7</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].water == 1 ? '#fff' : '#000' : null} />
    </TouchableOpacity>

    {/* WaterInstructions */}
    <TouchableOpacity onPress={()=> setIsWaterInstructions(true)} style={{position: 'absolute', left: -16, top: -22}}>
    <AntDesign name="questioncircleo" size={24} color="#fff" />
    </TouchableOpacity>
    
    </View>

    <Text style={{color:'#fff',fontSize: 16, fontWeight: '600', marginTop: 10}}>How many hours did you sleep last night?</Text>

    <View style={{backgroundColor: '#FFE7C3', width: '90%', height: '12%', marginTop: 20, borderRadius: 8, flexDirection: 'row'}}>
    {/* <FontAwesome style={{position: 'absolute',top: 16, right: -32}} name="bed" size={25} color="#fff" /> */}
    <TouchableOpacity  onPress={()=> [setSleep(3),updateSleep(currentUserData.id,3,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopStartRadius: 8, borderBottomLeftRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
      <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? '#fff' : '#000' : null}}>8-11</Text>
      <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 3 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=> [setSleep(2),updateSleep(currentUserData.id,2,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? '#fff' : '#000' : null}}>7-9</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 2 ? '#fff' : '#000' : null} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setSleep(1),updateSleep(currentUserData.id,1,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: 'rgb(255, 178, 71)', backgroundColor: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? 'rgb(255, 178, 71)' : '#FFE7C3' : null}}>
    <Text style={{fontSize: 20, fontWeight: '500', color: currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? '#fff' : '#000' : null}}>3-6</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color= {currentUserData ? currentUserData.daysDetails[copyIndexDay].sleep == 1 ? '#fff' : '#000' : null} />
    </TouchableOpacity>

    {/* isSleepInstructions */}
    <TouchableOpacity onPress={()=> setIsSleepInstructions(true)} style={{position: 'absolute', left: -16, top: -22}}>
    <AntDesign name="questioncircleo" size={24} color="#fff" />
    </TouchableOpacity>
    </View>
    
    <Text style={{color:'#fff', fontSize: 16, fontWeight: '600', marginTop: 10}}>how much did you move today?</Text>

    <View style={{backgroundColor: '#FFE7C3', width: '90%', height: '12%', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
    {/* <Ionicons style={{position: 'absolute',top: 16, right: -32}} name="ios-barbell" size={28} color="#fff" /> */}
    <Picker
    
  style={{
  width: '96%',
  backgroundColor: '#FFE7C3',
  
  
  


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

    {/* activityInstructions */}
    <TouchableOpacity onPress={()=> setIsActivityInstructions(true)} style={{position: 'absolute', left: -16, top: -22}}>
    <AntDesign name="questioncircleo" size={24} color="#fff" />
    </TouchableOpacity>
    </View>

    <Text style={{color:'#fff', fontSize: 16, fontWeight: '600', marginTop: 10}}>what did you eat today?</Text>
    <TouchableOpacity onPress={()=> setIsFoodArea(true)} style={{backgroundColor: '#FFE7C3', width: '90%', height: '12%', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
    {/* <FontAwesome5 style={{position: 'absolute',top: 16, right: -32}} name="apple-alt" size={28} color="#fff" /> */}
      <Text style={{fontSize: 21}}>Food selection area</Text>

    {/* foodInstructions */}
    <TouchableOpacity onPress={()=> setIsFoodInstructions(true)} style={{position: 'absolute', left: -16, top: -24}}>
    <AntDesign name="questioncircleo" size={24} color="#fff" />
    </TouchableOpacity>
    </TouchableOpacity>

    <FadeInOut
    visible={isFoodArea}
    scale={true}
     style={{backgroundColor: '#eedab6' ,marginTop: 0, width: isFoodArea ? '105%' : 0 ,  height: isFoodArea ? '119%': 0, alignItems: 'center', position: 'absolute', top:-53, padding: 10, borderRadius: 8, zIndex: isFoodArea ? 999 : 0, borderWidth: 1}}>
      
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

    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setOnAddFood(!onAddFood)}>
    <Feather name="x-circle" size={40} color="#fff"/>
    </TouchableOpacity>
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

<Text style={{ fontSize: 20, fontWeight: '900', color: oreng ,marginBottom:10 }}>what did i eat today</Text>
<View style={{width:'100%',height: currentUserData.daysDetails[copyIndexDay].dailyCreationFood.length > 0 ? '50%' : '93%' ,alignItems:'center'/* ,backgroundColor:'red' */}}>
<FlatList
  style={{width:'85%'}}
  
  data={currentUserData.daysDetails[copyIndexDay].dailyFood.map(item => ({...item, key: uuidv4()}))}
  renderItem={({ item }) => (
    <View style={styles.foodContainer} key={item.key}>  
      <TouchableOpacity onPress={()=>[setFinelText2(item.foodName),handleAddToFavorites(1,currentUserData.id,item.foodName,item.foodAmount,item.calories,item.proteins,item.carbs,item.fat ),setQuantity(item.foodAmount)]} style={{alignItems:'center',justifyContent:'center',marginLeft:3}}>
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
           setFavoriteFoodFat(item.fat),handleAddToFavorites(0,currentUserData.id,item.name,item.amount,item.calories,item.proteins,item.carbs,item.fat )]} style={{alignItems:'center',justifyContent:'center',marginLeft:3}}>
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

<View style={{width:'100%',height:'93%',alignItems:'center'}}>
<TouchableOpacity style={{position: 'absolute', right: 12.5, top: 12.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setShowOnAddFood(!ShowOnAddFood)}>
    <Feather name="x-circle" size={40} color="#fff"/>
    </TouchableOpacity>
<Text style={{ fontSize: 25, fontWeight: '900', color: oreng ,marginBottom:6,marginTop:40 }}>Favorites list </Text>

<FlatList
  style={{width:'85%',marginTop:0}}
  
  data={currentUserData.dailyFavoriteFood.map(item => ({...item, key: uuidv4()}))}
  renderItem={({ item }) => (

item.Type==0 ?

    <View style={styles.foodContainer2} key={item.key}>  

     
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
    
    <View style={[styles.foodContainer2]} key={item.key}>  
      
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
    <View style={{width: '90%', height: '15%',marginTop: 10, borderRadius: 8 ,flexDirection:'column',alignItems:'center', zIndex: isFoodArea ? -5: 9999}}>
      {/* {RmrCalculate()} */}
      {/* caloriesInstructions */}
    <TouchableOpacity onPress={()=> setIsCaloriesInstructions(true)} style={{position: 'absolute', right: 5, top: 5}}>
    <AntDesign name="questioncircleo" size={24} color="#fff" />
    </TouchableOpacity>
      <Text style={{marginTop: 4, fontSize: 16, fontWeight: '600',color:'#fff'}}>Daily calories</Text>


    {  (currentUserData ? currentUserData.daysDetails[copyIndexDay].activityLevel : null) == 0 ?
   
     
       // by basic activity
        <View style={{borderColor: '#fff', width: '85%', height: '15%', borderRadius: 8, borderWidth: 2, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>
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


      <Text style={{color:'#fff',fontSize: 9, position: 'absolute', bottom: -13,left: 0, fontWeight: '800'}}>|</Text>
      <Text style={{color:'#fff',fontSize: 11, position: 'absolute', bottom: -27,left: -13}}>{Math.floor((currentUserData ? currentUserData.basicBalancePoint : null))}</Text>

      <Text style={{color:'#fff',fontSize: 9, position: 'absolute', bottom: 16,left: 50, fontWeight: '800'}}>|</Text>
      <Text style={{color:'#fff',fontSize: 11, position: 'absolute', bottom: 27,left: 35}}>{Math.floor((currentUserData ? currentUserData.basicDayTarget : null))}</Text>

      </View>



        // by daley activity
      :  <View style={{borderColor: '#fff', borderColor: '#fff', width: '85%', height: '15%', borderRadius: 8, borderWidth: 2, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end'}}>

      {/* red */}

      <View style={{width: '17.5%', height: '100%', justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width:  (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null) ? `${(((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) - (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null)) / (Math.floor(currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint : null) - (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null))) * 100}%`: '100%', height: '100%',borderTopStartRadius: 8, borderBottomStartRadius: 8, backgroundColor: 'red'}}></View>
      </View>

      
      {/* green */}

      <View style={{width: '82.5%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, justifyContent: 'flex-end', flexDirection: 'row'}}>
      <View style={{width: (currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) <= (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null) ? `${((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyCalories : null) / (currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null)) * 100}%`: '100%', height: '100%',borderTopEndRadius: 8, borderBottomEndRadius: 8, backgroundColor: 'green'}}></View>
      </View>


      <Text style={{color:'#fff', fontSize: 9, position: 'absolute', bottom: -13,left: 0, fontWeight: '800'}}>|</Text>
      <Text style={{color:'#fff', fontSize: 11, position: 'absolute', bottom: -27,left: -13}}>{Math.floor((currentUserData ? currentUserData.daysDetails[copyIndexDay].dailyBalancePoint: null))}</Text>

      <Text style={{color:'#fff', fontSize: 9, position: 'absolute', bottom: 16,left: 50, fontWeight: '800'}}>|</Text>
      <Text style={{color:'#fff', fontSize: 11, position: 'absolute', bottom: 27,left: 35}}>{Math.floor((currentUserData ? currentUserData.daysDetails[copyIndexDay].dayTarget : null))}</Text>
      
      </View>
      
      }
      

      <Text style={{color:'#fff', marginTop: 8, fontWeight: '700', fontSize: 16}}>{currentUserData ? (currentUserData.daysDetails[copyIndexDay].dailyCalories).toFixed(0) : null} calories</Text>
    </View>
      :
      
       null
}



    </View>

    {/* </ScrollView> */}
    </ImageBackground>
    </Animated.View>
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
        <View style={styles.container}>


<Text style={{fontSize:45,color:'#fff', marginTop: 60, fontWeight: '200'}}>Diary</Text>
<Text style={{fontSize:20,color:'#fff', padding: 10}}>To use the diary you must open an account</Text>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
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
foodContainer2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
  padding: 10,
  borderRadius: 10,
  backgroundColor: '#f3d9d9',
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

  modalContainerEnd: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentEnd: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titleEnd: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionEnd: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonEnd: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextEnd: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer7: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent7: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    elevation: 5
  },
  title7: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  policyText7: {
    marginBottom: 10
  }


})