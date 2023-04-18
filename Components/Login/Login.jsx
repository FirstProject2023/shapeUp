import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert, Button, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import FadeInOut from 'react-native-fade-in-out';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';



// import {  } from '@react-native-community/datetimepicker';

import LottieView from 'lottie-react-native';

import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc } from 'firebase/firestore';



export default function Login({ navigation }) {
  
  const userCollectionRef = collection(db,"users");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(1);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [daysDetails,setDaysDetails] = useState([]);
  const [dailyFavoriteFood,setDailyFavoriteFood] = useState([]);
  const [birthDate, setBirthDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [weightGoal, setWeightGoal] = useState(0);
  
  //One of them
  const [WeeklyGoal, setWeeklyGoal] = useState(0);
  const [endDate, setEndDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [finelDate,setFinelDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [calToLoseDay, setCalToLoseDay] = useState(0);
  const [averageActivity, setAverageActivity] = useState(1);

  const [basicBalancePoint, setBasicBalancePoint] = useState(1);
  const [basicDayTarget, setBasicDayTarget] = useState(1);
  
  const [users,setUsers]=useState([]);
  
  const [animationStartIsVisible, setAnimationStartIsVisible] = useState(true);
    const [firstScreenIsVisible, setFirstScreenIsVisible] = useState(true);
    const [loginIsVisible, setLoginIsVisible] = useState(false);
    const [signUpIsVisible, setSignUpIsVisible] = useState(false);
    const [nameIsVisible, setNameIsVisible] = useState(false);
    const [genderIsVisible, setGenderIsVisible] = useState(false);
    const [heightAndWeightIsVisible, setHeightAndWeightIsVisible] = useState(false);
    const [averageActivityIsVisible, setAverageActivityIsVisible] = useState(false);
    const [birthDateIsVisible, setBirthDateIsVisible] = useState(false);

      //One of them
  const [WeeklyGoalIsVisible, setWeeklyGoalIsVisible] = useState(false);
  const [endDateIsVisible, setEndDateIsVisible] = useState(false);

    const [date, setDate] = useState(new Date(0));
  

    const [flagToShowDate,setFlagToShowDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
   
   
  };

  const showMode = (currentMode) => {
    const currentDate = new Date();

    DateTimePickerAndroid.open({
      value: currentDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };


    const [goalIsVisible, setGoalIsVisible] = useState(false);



    const HeightMap = [];
    for (let i = 100; i <= 300; i += 1) {
      HeightMap.push(i);
    }
  
          const WeightMap = [];
    for (let i = 30; i <= 200 ; i += 1) {
      WeightMap.push(i);
    }
          const WeightMap2 = [];
    for (let i = 30; i <= weight-1 ; i += 1) {
      WeightMap2.push(i);
    }
    


useEffect(()=>{
   const unSubscribe = auth.onAuthStateChanged(user=>{
    if(user){
      navigation.navigate('Nav')
    }
    return unSubscribe
  })
},[])

useEffect(()=>{

 
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc)=> ({...doc.data() , id: doc.id })));
  }
  getUsers();
},[]);

const hendelUpdateGool = async () => {

  let today = new Date() ;
  let futureDate=0;
  let diffInDays = 0;

  let currEndDate = new Date(date) 
 
  if(WeeklyGoal==0)
  {
    
    setEndDate({day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})

    setFinelDate({
      day: date.getDate(),
      month: date.getMonth()+1,
      year: date.getFullYear(),
    })

    diffInDays = differenceInDays(currEndDate,today) ;

    /* setFinelDate(endDate); */

    
/* console.log(currEndDate); */


  }
  else{

    let numberOfDaysToAdd = 0 ;
  
    if(WeeklyGoal == 1){

       numberOfDaysToAdd = ( ((weight-weightGoal) / 0.25) * 7 )    
    }
    else if(WeeklyGoal == 2){
       numberOfDaysToAdd = ( ((weight-weightGoal) / 0.5) * 7 )
    }
    else if(WeeklyGoal == 3){
       numberOfDaysToAdd = ( ((weight-weightGoal) / 0.75) * 7 )
    }
    else if(WeeklyGoal == 4){
       numberOfDaysToAdd = ( ((weight-weightGoal) / 1) * 7 )
       
    }
   
     today = new Date();
     futureDate = new Date(today.getTime() + numberOfDaysToAdd * 24 * 60 * 60 * 1000);
    
    
    setFinelDate({
      day: futureDate.getDate(),
      month: futureDate.getMonth()+1,
      year: futureDate.getFullYear(),
    })

    console.log({
      day: futureDate.getDate(),
      month: futureDate.getMonth() + 1,
      year: futureDate.getFullYear(),
    });
  


    diffInDays = differenceInDays(futureDate , today);
  
  }

let daysArr=[];

 for(let i = 0; i < diffInDays ; i++)
{
  daysArr[i] = {
    
    singleDate: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
    activityLevel: 0,
    dailyCalories: 0,
    dailyBalancePoint: 0,
    dayTarget: 0,
    dailyFood:[],
    dailyCreationFood:[],
    isTarget: false,
    sleep: 0,
    steps: 0,
    water: 0,
  } 
  
}

setDaysDetails(daysArr); 

setCalToLoseDay(Math.floor(((weight - weightGoal) * 7700) / diffInDays));
setBasicBalancePoint(Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     averageActivity)));
    setBasicDayTarget(basicBalancePoint - calToLoseDay);

}

const  handleSignUp =  async () => {
  

  setGoalIsVisible(false);
   setFirstScreenIsVisible(true);
   
   
    try{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(userCollectionRef, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            weight: weight,
            height: height,
            birthDate: birthDate,
            weightGoal: weightGoal,
            WeeklyGoal: WeeklyGoal, 
            endDate: endDate, 
            finelDate: finelDate,
            img: null,
            daysDetails: daysDetails,
            dailyFavoriteFood: dailyFavoriteFood,
            calToLoseDay: calToLoseDay,
            averageActivity: averageActivity,
            basicBalancePoint: basicBalancePoint,
            basicDayTarget: basicDayTarget,
            

          });
          setWeeklyGoal(0);
          setEndDate({day: null})
          setFinelDate({day: null})
        console.log("a");
       
    } catch (error){
        console.log("b");
       
    }

}
    const  handleLogin =  async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
           
          
        } catch (error){
            console.log("error");
           
        }
    
    }

    
    const removeStartAnimation = (activity) => {
      setTimeout(() => {[setAnimationStartIsVisible(false), setFirstScreenIsVisible(true)]}, 2000);
  }

  const BalanceEndTargetCreate = () => {
    setBasicBalancePoint(Math.floor(((88.36) + ( (13.39 * weight)+(4.7 * height)-(5.6 * years))  *     activity)));
    setBasicDayTarget(basicBalancePoint);
  }

function EmailTextInput()
 {
 /*  console.log(email);
  console.log(password); */

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)  ) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    
  }else if( password.length < 5)
  {
    Alert.alert(
      'Invalid Password',
      'Password must contain at least 5 characters.'
    );
  } 
  else {
   /*  Alert.alert('Valid Email', 'Email address is valid.'); */
    setSignUpIsVisible(false), setNameIsVisible(true)
  }
 
   }
   function nameTextInput(){

    if(firstName == "")
    {
      Alert.alert('Invalid Name', 'Please enter a name.');
    }
    else if( lastName == "")
    {
      Alert.alert('Invalid last Name', 'Please enter a last name.');
    }
    else{

      setNameIsVisible(false), setGenderIsVisible(true)
    }
    
   }
   function HeightWeightTextInput(){

      if(height==0)
      {
        Alert.alert('Invalid Height', 'Please enter a Height.');
      }
      else if(weight==0)
      {
        Alert.alert('Invalid weight', 'Please enter a weight.');
      }
      else{
        setHeightAndWeightIsVisible(false), setAverageActivityIsVisible(true)
      }

   }
   function BirthdayTextInput(date){

    const currentDate = new Date();
    const ageDiff = currentDate.getFullYear() - date.getFullYear();
   
    if (
      ageDiff < 18 ||
      (ageDiff === 18 && currentDate.getMonth() < birthDate.month) ||
      (ageDiff === 18 && currentDate.getMonth() === birthDate.month && currentDate.getDate() < birthDate.day)
    ) {
      Alert.alert('Invalid Age', 'You must be at least 18 years old to use this app.');
      
    }
    else if (ageDiff > 120) {
    Alert.alert('Invalid Age', 'You cannot be more than 120 years old.');
    
  } else {
      
      setBirthDate({day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})
      setBirthDateIsVisible(false)
       setGoalIsVisible(true)
     
    }

    
    
    
  }

 

  return (
    
    <ImageBackground source={{uri: "https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-11-23/3b788920-2d79-11eb-9dcd-8b2ef5358591.jpg"}} resizeMode='cover'>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    
    <View style={styles.loginContainer}>
    
    {/* <FadeInOut style={{ 
        //firstScreen
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(255, 178, 71)',
        alignItems: 'center',
        // justifyContent: 'center',
        zIndex: animationStartIsVisible ?  999 : 0,}}
        visible={animationStartIsVisible}
        duration={!animationStartIsVisible ? 400 : 800}
        scale={true}
        >
        <LottieView
        style={{width: 150, height: 150, marginTop: 115}}
        source={require('../lottieAnimation/animation_start.json')}
          autoPlay         
        />
       { removeStartAnimation()}

        

        </FadeInOut> */}
    
    <Text style={styles.title}>ShapeUp</Text>

    <FadeInOut style={{ 
        //firstScreen
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: firstScreenIsVisible ?  999 : 0,}}

        visible={firstScreenIsVisible}
        duration={!firstScreenIsVisible ? 400 : 800}
        scale={true}
        >
        
    

    <View style={[styles.buttonContainer, {marginTop: 40}]}>
    <TouchableOpacity
    style={[styles.loginButton, {backgroundColor: 'rgba(255, 178, 71,0.9)', width: '80%'}]}
    onPress={()=> [setFirstScreenIsVisible(false), setLoginIsVisible(true)]} 
    >
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '800'}}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=> [setFirstScreenIsVisible(false), setSignUpIsVisible(true)]} 
    style={[styles.loginButton, {width: '80%', marginTop: 10, backgroundColor: '#fff'}]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>Sign Up</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{ navigation.navigate('Transition')}}
    // onPress={()=>{ navigation.navigate('Nav')}}
    style={[styles.loginButton,{backgroundColor: 'rgba(243,243,243,0.9)', marginTop: 24, height: 40, borderWidth: 2, borderColor: '#78ab04'}]}
    >
        <Text style={{color: '#000', fontSize: 17,}}>Continue as  a guest</Text>
    </TouchableOpacity>

    </View>
    </FadeInOut>


    <FadeInOut style={{ 
        //LoginScreen
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: loginIsVisible ?  999 : 0,}}

        visible={loginIsVisible}
        duration={!loginIsVisible ? 400 : 800}
        scale={true}
        >
        
    
    <View style={styles.inputsContainer}>
    <TouchableOpacity onPress={()=> [setLoginIsVisible(false), setFirstScreenIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>
      <TextInput 
      style={styles.textInput}
      placeholder='Email'
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setEmail(text)}
      />
      
      <TextInput 
       style={styles.textInput}
      placeholder='Password'
      placeholderTextColor={'#fff'}
      
        onChangeText={text => setPassword(text)}
        secureTextEntry
       
        />
    </View>

    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, {marginTop: 20}]}
    onPress={handleLogin}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>Login</Text>
    </TouchableOpacity>

    </View>
    </FadeInOut>







    <FadeInOut style={{ 
        //signUpScreen
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: signUpIsVisible ?  999 : 0,}}

        visible={signUpIsVisible}
        duration={!signUpIsVisible ? 400 : 800}
        scale={true}
        >
        
    
    <View style={styles.inputsContainer}>
    <TouchableOpacity onPress={()=> [setSignUpIsVisible(false), setFirstScreenIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>
      <TextInput 
      style={styles.textInput}
      keyboardType="email-address"
      placeholder='Email'
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setEmail(text)}
      />
      
      <TextInput 
       style={styles.textInput}
       keyboardType="visible-password"
      placeholder='Password'
      placeholderTextColor={'#fff'}
      
        onChangeText={text => setPassword(text)}
        secureTextEntry
       
        />
    </View>

    <View style={styles.buttonContainer}>

    <TouchableOpacity
    onPress={()=>EmailTextInput()}
    style={[styles.loginButton, {marginTop: 35}]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>

    </View>
    </FadeInOut>

    <FadeInOut style={{ 
        //nameView
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: nameIsVisible ?  999 : 0,}} 

        visible={nameIsVisible}
        duration={!nameIsVisible ?  400 : 800}
        scale={true}
        >


    <View style={styles.inputsContainer}>
     <TouchableOpacity onPress={()=> [setNameIsVisible(false), setSignUpIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>
      <TextInput 
      style={styles.textInput}
      placeholder='FirstName'
      keyboardType="name-phone-pad"
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setFirstName(text)}
      />
      
      <TextInput 
       style={styles.textInput}
      placeholder='LastName'
      keyboardType="name-phone-pad"
      placeholderTextColor={'#fff'}
      
        onChangeText={text => setLastName(text)}
        secureTextEntry
       
        />
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [nameTextInput()  ]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>
    </View>
    </FadeInOut>


    <FadeInOut style={{ 
        //genderView
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: genderIsVisible ?  999 : 0,}}

         visible={genderIsVisible}
         duration={!genderIsVisible ?  400 : 800}
         scale={true}>
         

<TouchableOpacity onPress={()=> [setGenderIsVisible(false), setNameIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>

    <View style={{width: '80%', height: '20%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
    
    <TouchableOpacity onPress={()=> [setGenderIsVisible(false), setHeightAndWeightIsVisible(true), setGender(0)]}>
    <View style={{height: 100, width: 100, borderWidth: 3, borderColor: '#fff', borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(253, 92, 175, 0.4)'}}>
    <MaterialCommunityIcons name="face-woman" size={65} color="#fff" />
    </View>       
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> [setGenderIsVisible(false), setHeightAndWeightIsVisible(true), setGender(1)]}>
    <View style={{height: 100, width: 100, borderWidth: 3, borderColor: '#fff', borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(27, 112, 249, 0.4)'}}>

    <MaterialCommunityIcons  name="face-man" size={65} color="#fff" />
    </View>

    </TouchableOpacity>

    
    </View>

    </FadeInOut>







    <FadeInOut style={{ 
        //hightView
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: heightAndWeightIsVisible ?  999 : 0,}} 

        visible={heightAndWeightIsVisible}
        duration={!heightAndWeightIsVisible ?  400 : 800}
        scale={true}>


    <View style={{width: '100%', height: '35%', alignItems: 'center' , marginTop: 20}}>
     <TouchableOpacity onPress={()=> [setHeightAndWeightIsVisible(false), setGenderIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>
    <View style={{width: '100%', height: '85%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <View style={{width: '35%', height: '75%', alignItems: 'center'}}> 
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '800'}}>Height</Text>
        <Picker
          style={{
          marginTop:10,
          width: '35%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={height}
      onValueChange={(itemValue) => setHeight(itemValue)}
      
      >
      
{HeightMap.map((height,i) => (
                <Picker.Item key={i} label={`${height}cm`} value={height} />
            ))}

      </Picker>
      {height != "" ? <View style={{width: '80%', height: '30%', borderWidth: 2, borderRadius: 15, marginTop: 10, borderColor: '#fff', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 6}}>
      <MaterialCommunityIcons name="human-male-height" size={30} color="#fff" />
      <Text style={{color: '#fff', fontSize: 20}}>{height}<Text style={{fontSize: 12}} >cm</Text></Text>
      
      </View>: null}
        
            
        </View>
        <View style={{width: '35%', height: '75%', alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '800'}}>Weight</Text>
        <Picker
          style={{
          marginTop:10,
          width: '35%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={weight}
      onValueChange={(itemValue) => setWeight(itemValue)}
      
      >
      
{WeightMap.map((weight,i) => (
                <Picker.Item key={i} label={`${weight}kg`} value={weight} />
            ))}

      </Picker>
      {weight != "" ? <View style={{width: '80%', height: '30%', borderWidth: 2, borderRadius: 15, marginTop: 10, borderColor: '#fff', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 6}}>
      <MaterialCommunityIcons name="weight" size={30} color="#fff" />
      <Text style={{color: '#fff', fontSize: 20}}>{weight}<Text style={{fontSize: 12}} >kg</Text></Text>
      
      </View>: null}
        </View>
    </View>
      
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [HeightWeightTextInput() ]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>


    </View>
    </FadeInOut>



    <FadeInOut style={{ 
      //averageActivity
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: averageActivityIsVisible ?  999 : 0,}} 

        visible={averageActivityIsVisible}
        duration={!averageActivityIsVisible ?  400 : 800}
        scale={true}>

    <TouchableOpacity onPress={()=> [setAverageActivityIsVisible(false), setHeightAndWeightIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
      <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>


    <Text style={{fontSize: 20, color: '#fff', marginTop: 20}}>How active are you usually?</Text>
    <Picker
    style={{
    marginTop: 30,
    width: '70%',
    backgroundColor: 'rgb(255, 178, 71)',
    marginBottom:20,
  }}
  selectedValue={averageActivity}
  onValueChange={(itemValue) => [setAverageActivity(itemValue)]}
  >
    <Picker.Item  label='Basic' value={0} />
    <Picker.Item  label='Little or no activity - office work at a desk' value={1.2} />
    <Picker.Item  label='Little activity - 1-3 times a week' value={1.375} />
    <Picker.Item  label='Average activity - 3-5 times a week' value={1.55} />
    <Picker.Item  label='Intensive activity - every day' value={1.725} />
    <Picker.Item  label='Intense activity combined with physical work - every day' value={1.9} />

    </Picker>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
       style={[styles.loginButton, { marginTop: 40}]}
       onPress={()=> [setAverageActivityIsVisible(false), setBirthDateIsVisible(true)]}
       >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
      </TouchableOpacity>


    </View>
    </FadeInOut>










    <FadeInOut style={{ 
        //birthScreen
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: birthDateIsVisible ?  999 : 0,}} 
        visible={birthDateIsVisible}
        duration={!birthDateIsVisible ?  400 : 800}
        scale={true}>

    <View style={styles.inputsContainer}>
     <TouchableOpacity onPress={()=> [setBirthDateIsVisible(false), setAverageActivityIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>

      <TouchableOpacity onPress={showDatepicker} style={{width: '75%', height: '30%', backgroundColor: 'rgba(255, 178, 71,0.9)', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 40}}>
      <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>Press to select your birth date</Text>
      </TouchableOpacity>

{date > 0 ?  <View style={{width: '45%',height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 15, borderColor: '#fff', marginTop: 20}}>
      <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
      
      </View>: null}
  
    </View>



    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [ BirthdayTextInput(date)]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>

   


    </View>
    </FadeInOut>

    <FadeInOut style={{ 
        //goalScreen
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: goalIsVisible ?  999 : 0,}} 
        visible={goalIsVisible}
        duration={!goalIsVisible ?  400 : 800}
        scale={true}>

    <View style={[styles.inputsContainer, {height: '45%'}]}>
     <TouchableOpacity onPress={()=> [setGoalIsVisible(false), setBirthDateIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>

    <Text  style={{fontSize: 25, color: '#fff', fontWeight: 'bold'}}>what is your goal weight?</Text>
    <Picker
          style={{
          marginTop:10,
          width: '35%',
          backgroundColor: 'rgba(255, 178, 71,0.9)',
      }}
      selectedValue={weight}
      onValueChange={(itemValue) => setWeightGoal(itemValue)}
      
      >
         
      
{WeightMap2.map((weight,i) => (
                <Picker.Item key={i} label={`${weight}kg`} value={weight} />
            ))}

      </Picker>
      
      <Text style={{color: '#fff', fontSize: 14, fontWeight: '700'}}>{weightGoal}</Text>

      <View style={{width: '100%', height: '50%', marginTop: 10, alignItems:'center'}}>
      <Text style={{marginTop: 8, color: '#fff', fontSize: 20, fontWeight: '600'}}>Choose one way</Text>
      <View style={{width: '100%', height: '80%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
      <View style={{ width: '32%', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> [setEndDateIsVisible(true), setWeeklyGoalIsVisible(false) ]} style={{width: '100%',height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 15, borderColor: '#fff'}}>
        <Text style={{fontSize: 16, color: '#fff'}}>
         End date
        </Text>
      </TouchableOpacity>
      

       {endDateIsVisible ?
       <View style={{ alignItems: 'center', height: '75%', width: '100%'}}>

        <TouchableOpacity onPress={showDatepicker} style={{width: '40%', height: '58%', backgroundColor: 'rgba(255, 178, 71,0.9)', alignItems: 'center', justifyContent: 'center',marginTop:10}}>
      
        <AntDesign name="calendar" size={24} color="#fff" />

        </TouchableOpacity>
        <View style={{width: '85%',height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff', borderBottomEndRadius: 8, borderBottomLeftRadius: 8}}>
        {date ?
        <Text style={{color: '#fff', fontSize: 14, fontWeight: '700'}}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}  </Text> 
          :
        <Text style={{color: '#fff', fontSize: 14, fontWeight: '700'}}>null</Text>  
          }
        </View>
       </View>
        : null}
      

      </View>

      <View style={{ width: '32%', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> [setWeeklyGoalIsVisible(true), setEndDateIsVisible(false)]} style={{width: '100%',height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 15, borderColor: '#fff'}}>
        <Text style={{fontSize: 16, color: '#fff'}}>
          Weekly goal
        </Text>
      </TouchableOpacity>
      {
        WeeklyGoalIsVisible ?
        <View style={{ alignItems: 'center', height: '75%', width: '100%'}}>

         <Picker
          style={{
          marginTop:10,
          width: '40%',
          backgroundColor: 'rgba(255, 178, 71,0.9)',
      }}
      selectedValue={weight}
      onValueChange={(itemValue) => setWeeklyGoal(itemValue)}
      
      >
      
      <Picker.Item  label='none' value='none' />
      <Picker.Item  label='Lose 0.25 kg per week' value={1} />
      <Picker.Item  label='Lose 0.5 kg per week' value={2} />
      <Picker.Item  label='Lose 0.75 kg per week' value={3} />
      <Picker.Item  label='Lose 1 kg per week' value={4} />

      </Picker>
      <View style={{width: '88%',height: '25%', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff', borderBottomEndRadius: 8, borderBottomLeftRadius: 8, paddingBottom: 1}}>
        <Text style={{color: '#fff', fontSize: 13, fontWeight: '700'}}>{WeeklyGoal}</Text>

        </View>

        </View>

      : null}


      </View>

      </View>
      
      </View>
      
    
    
    </View>
    <View style={[styles.buttonContainer, {marginTop: 10}]}>

    <TouchableOpacity
    onPress={hendelUpdateGool}
    style={styles.loginButton}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>maoz</Text>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={handleSignUp}
    style={styles.loginButton}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>Start</Text>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={()=>{ [navigation.navigate('Nav'), setGoalIsVisible(false), setFirstScreenIsVisible(true) ]}}
    style={[styles.loginButton,{backgroundColor: 'rgba(243,243,243,0.9)', marginTop: 24, height: 40, borderWidth: 2, borderColor: '#78ab04'}]}
    >
        <Text style={{color: '#000', fontSize: 17,}}>Continue as  a guest</Text>
    </TouchableOpacity>





  

    </View>
    </FadeInOut>

    
    </View>

    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
    loginContainer:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
   
        backgroundColor: 'rgba(0,0,0,0.3)'


    },
    title:{
        fontSize: 38,
        color: '#fff',
        fontWeight: '900',
        marginTop: 70,
        marginBottom: 20,

    },

    fadeIn:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        top: 160,
        zIndex: 900,
        
    },
    
    fadeInName:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        top: 160,
        zIndex: 990,

    },
    fadeInGender:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        top: 160,
        zIndex: 700,

    },
    inputsContainer:{
        width: '100%',
        height: '22%',
        alignItems: 'center',
        // backgroundColor: 'rgba(25,255,255,0.3)'

    },
    textInput:{
        width: '70%',
        height: '40%',
        // backgroundColor: 'rgba(0,0,0,0.01)',
        marginTop: 10,
        borderWidth: 3.5,
        borderColor: '#fff',
        color: '#fff',
        paddingRight: 15,
        borderRadius: 5,
        fontSize: 16,


    },

    buttonContainer:{
        width: '100%',
        height: '30%',
        alignItems: 'center',
        marginTop: 30,
        // backgroundColor: 'rgba(255,25,255,0.3)'
        

    },
    loginButton:{
        width: '60%',
        height: '24%',
        backgroundColor: 'rgba(255, 255, 255,0.2)',  
        marginTop: 8,
        borderWidth: 4,
        borderColor: 'rgba(255, 178, 71,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        
        

    },
})


//1000
