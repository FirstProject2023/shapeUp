import { StyleSheet, Text, View,TouchableOpacity,ImageBackground, ScrollView, FlatList, useWindowDimensions, VirtualizedList } from 'react-native'
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

  const[indexDay,setIndexDay] = useState(10);
  const[copyIndexDay,setCopyIndexDay] = useState(indexDay);


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
  
  const[index,setIndex]=useState();

  

  const now = Date.now();
const currentDate = new Date(now);


const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
console.log(futureDate);

useEffect(()=>
{
  if(currentUserData)
  {
    setIndex(differenceInDays(new Date(now), currentUserData.daysDetails[0].singleDate.toDate() ) )
    /* setCopyIndexDay(index) */
    console.log(index);
    console.log(new Date(now));
    console.log(currentUserData.daysDetails[0].singleDate.toDate());
  }

},[new Date(now)])

 /*  const future = new Date(today.setDate(today.getDate() +4)); */

if(auth.currentUser)
{
  return (
    
    <ImageBackground source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"}} resizeMode= 'cover'>
     {/* <ScrollView> */}
    <View style={styles.container}>

    <View style={{backgroundColor: '#fff', width: '90%', height: '10%',marginTop: 10, borderRadius: 8 ,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>

    {
      copyIndexDay!=indexDay ?
    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay+1)} >
    <FontAwesome5 name="arrow-circle-right" size={30} color="black" />
    </TouchableOpacity>
    : <View style={{width:30,height:30}}></View>

    }

      <Text>{copyIndexDay}</Text>

    <TouchableOpacity onPress={()=>setCopyIndexDay(copyIndexDay-1)}>
    <FontAwesome5 name="arrow-circle-left" size={30} color="black" />
    </TouchableOpacity>

    </View>


    <View style={{backgroundColor: '#fff', width: '90%', height: '80%', marginTop: 5, alignItems: 'center', flexDirection: 'column', borderRadius: 8}}>
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
     alignItems: 'center', justifyContent: 'center',borderColor: '#11a1f9'}}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>12-17</Text>
      <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(2), updateWater(currentUserData.id,2,copyIndexDay)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: '#11a1f9'}}>
    <Text style={{fontSize: 20, fontWeight: '500'}}>8-11</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setWater(1), updateWater(currentUserData.id,1,copyIndexDay)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9'}}>
    <Text style={{fontSize: 20, fontWeight: '500'}}>5-7</Text>
    <Entypo style={{position: 'absolute', bottom: 2, left: 2}} name="cup" size={19} color="black" />
    </TouchableOpacity>
    </View>

    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>How many hours did you sleep last night?</Text>

    <View style={{backgroundColor: '#d4f1f9', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, flexDirection: 'row'}}>
    <TouchableOpacity  onPress={()=> [setSleep(3),updateSleep(currentUserData.id,3,0)]}  style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopStartRadius: 8, borderBottomLeftRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9'}}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>8-11</Text>
      <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color="black" />
    </TouchableOpacity>
    <TouchableOpacity  onPress={()=> [setSleep(2),updateSleep(currentUserData.id,2,0)]} style={{height: '100%', width: '33.3333333333%', borderTopWidth: 2, borderBottomWidth: 2, alignItems: 'center',
     justifyContent: 'center', borderColor: '#11a1f9'}}>
    <Text style={{fontSize: 20, fontWeight: '500'}}>7-9</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> [setSleep(1),updateSleep(currentUserData.id,1,0)]} style={{height: '100%', width: '33.3333333333%', borderWidth: 2, borderTopEndRadius: 8, borderBottomRightRadius: 8,
     alignItems: 'center', justifyContent: 'center', borderColor: '#11a1f9'}}>
    <Text style={{fontSize: 20, fontWeight: '500'}}>3-6</Text>
    <FontAwesome style={{position: 'absolute', bottom: 2, left: 2}} name="bed" size={19} color="black" />
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
selectedValue={activeValue}
onValueChange={(itemValue) => setActiveValue(itemValue)}
>
<Picker.Item  label='Basic' value={1} />
<Picker.Item  label='Little or no activity - office work at a desk' value={1} />
<Picker.Item  label='Little activity - 1-3 times a week' value={2} />
<Picker.Item  label='Average activity - 3-5 times a week' value={3} />
<Picker.Item  label='Intensive activity - every day' value={4} />
<Picker.Item  label='Intense activity combined with physical work - every day' value={5} />

</Picker>

    </View>

    <Text style={{fontSize: 16, fontWeight: '500', marginTop: 10}}>what did you eat today?</Text>
    <TouchableOpacity onPress={()=> setIsFoodArea(true)} style={{backgroundColor: '#11f1f1', width: '90%', height: '11%', marginTop: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 21}}>Food selection area</Text>
    </TouchableOpacity>

    <FadeInOut
    visible={isFoodArea}
    scale={true}
     style={{backgroundColor: '#d4f1f9' ,marginTop: 30, width:'105%',  height: isFoodArea ? '95%': 0, alignItems: 'center', position: 'absolute', top: 35, padding: 10, borderRadius: 8, zIndex: isFoodArea ? 999 : 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsFoodArea(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 20, fontSize: 25, fontWeight: '600'}}>Food selection area</Text>
    </FadeInOut>

    {/* <View style={{backgroundColor: '#fff', width: '90%', height: '60%', marginTop: 15, alignItems: 'center', flexDirection: 'column', borderRadius: 8}}>

    </View> */}

    </View>






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

})