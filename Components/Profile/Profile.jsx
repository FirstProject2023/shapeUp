import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image, ScrollView,TextInput,Button  } from 'react-native'
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
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';





import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc} from 'firebase/firestore';


export default function Profile({ navigation }) {


  const [selectedImage, setSelectedImage] = useState(null);

  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);


const [password,setPassword]=useState('12378asd3');
const [nameInputPresented,setNameInputPresented] = useState(1);
const [ageInputPresented,setAgeInputPresented] = useState(1);
const [emailInputPresented,setEmailInputPresented] = useState(1);
const [purposeInputPresented,setPurposeInputPresented] = useState(1);
const [goalInputPresented,setGoalInputPresented] = useState(1);
const [dateInputPresented,setDateInputPresented] = useState(1);
const [passwordInputPresented,setPasswordInputPresented] = useState(1);

const[newPurpose,setNewPurpose]=useState("");
const[newFirstName,setNewFirstName]=useState("");
const[newLastName,setNewLastName]=useState("");

const [enterVasibal,setEnterVasibal] = useState(1);

const updateWeightGoalUser = async (id,newWeightGoal) => {

setPurposeInputPresented(!purposeInputPresented);
  const userDoc = doc(db,"users",id)
  const newFields ={weightGoal: newWeightGoal } 
  await updateDoc(userDoc , newFields)

}

const updateFirstNameAndLastNAmeUser = async (id,NfirstName,NlastName) => {

  setNameInputPresented(!nameInputPresented);
  const userDoc = doc(db,"users",id)
  const newFields ={firstName: NfirstName,lastName: NlastName } 
  await updateDoc(userDoc , newFields)

}
const updateBirthDay = async (id,date) => {

  setDateInputPresented(!dateInputPresented); 

  const userDoc = doc(db,"users",id)
  const newBirthDate={day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
  const newFields ={birthDate: newBirthDate } 
  await updateDoc(userDoc , newFields)

}
const updateEndDay = async (id,date) => {

  setGoalInputPresented(!goalInputPresented); 

  const userDoc = doc(db,"users",id)
  const newEndDate={day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
  const newFields ={endDate: newEndDate } 
  await updateDoc(userDoc , newFields)

}

useEffect(()=>{

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc)=> ({...doc.data() , id: doc.id })));
  }
  getUsers();
},[]);


if(auth.currentUser)
{ 

if(auth.currentUser){

  useEffect(() => {
    
    const currentUser = users.find((user) => user.email.toLowerCase() == auth.currentUser.email.toLowerCase());
    
    if (currentUser !== null) {

      

      console.log(currentUser);

      setCurrentUserData(currentUser);
    }
    
  }, [users]);

  
}
const [isEndDate,setIsEndDate]=useState(0);
const [massegeAboutWeeklyGoal,setMassegeAboutWeeklyGoal]=useState(0);

useEffect(()=>
{
  if(currentUserData)
  {
    currentUserData.WeeklyGoal == 0 ? setIsEndDate(1) : setIsEndDate(0)
    
    switch (currentUserData.WeeklyGoal) {
      case 1:
        setMassegeAboutWeeklyGoal("Lose 0.25 kg per week")
        break;
        case 2:
          setMassegeAboutWeeklyGoal("Lose 0.5 kg per week")
          break;
          case 3:
            setMassegeAboutWeeklyGoal("Lose 0.75 kg per week") 
            break;
            case 4:
            setMassegeAboutWeeklyGoal("Lose 1 kg per week")
            break;
            default:
              null
            }
            
          }

      

})

const WeightMap = [];
for (let i = 30; i <= 200; i += 1) {
  WeightMap.push(i);
}

//calc is age

const date1 = new Date(`${currentUserData ? currentUserData.birthDate.month : null}/${currentUserData ? currentUserData.birthDate.day : null}/${currentUserData ? currentUserData.birthDate.year : null}`);
const date2 = new Date('02/17/2023');

const diffInDays = differenceInDays(date2, date1);
const years = Math.floor(diffInDays / 365);
const months = Math.floor((diffInDays % 365) / 30);
const days = diffInDays - (years * 365) - (months * 30);
=======
}
>>>>>>> 09d9a94f3694cbf8e897b6fd9f9f6058b1f453d4


  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }

  const [date,setDate]=useState(new Date(0));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };
 


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
  function ChangeGoalInpout()
  {
    setGoalInputPresented(!goalInputPresented)
  }
  function ChangePasswordInput()
  {
    setPasswordInputPresented(!passwordInputPresented)
  }


    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
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
        {selectedImage ?  <Image source={{ uri: selectedImage }} style={{height:'100%',width:'100%',borderRadius: 50}} />
      :
<Image style={{height:'100%',width:'100%',borderRadius: 50}} source={{uri: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"}} resizeMode= 'cover'/>
      } 
        </View>
    </View>
  

      <TouchableOpacity style={{zIndex:100}}>
        <View style={{ width:28,height:30,backgroundColor:'white',borderRadius:50,position:'absolute',top:12,left:113}} />
       <Feather  name="plus-circle" size={36} color="black" onPress={pickImage} style={{ position:'absolute',top:10,left:110}} /> 
        </TouchableOpacity>

{/* a */}



      <ScrollView>

<View style={{height:'12%',width:'100%',justifyContent:'center',alignItems:'center' }}>
      <Text style={{fontSize:20,color:blue,marginRight:30,fontSize:20}}> {/* ({days})({months}) */}{years} years old </Text>
</View>


<View style={{flexDirection:'row'}}>

      <View style={{height:100,width:100,borderRadius:50,position:'absolute',top:10,right:270,zIndex:100,backgroundColor:'#F0FFFF'
      ,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
             <Text style={{fontSize:15,color:oreng,textAlign:'center'}}> {currentUserData ? currentUserData.weightGoal : null } g </Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> Purpose</Text>
          </View>

        <View style={styles.weightContainer}>


          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>

          <View >
          <Text style={{fontSize:15,color:oreng,textAlign:'center',}}> {currentUserData ? currentUserData.height/100 : null }</Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> height </Text>
          </View>

          <View style={{marginLeft:20}}>
          <Text style={{fontSize:15,color:oreng,textAlign:'center'}}>{currentUserData ? currentUserData.weight : null }</Text>
          <Text style={{fontSize:15,color:"black",textAlign:'center'}}> weight </Text>
          </View>


          <View style={{marginLeft:20}}>
          <Text style={{fontSize:15,color:oreng,textAlign:'center'}}> {years} </Text>
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
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>
             {currentUserData ? currentUserData.firstName + " " + currentUserData.lastName : null } </Text>
          <Ionicons style={{marginEnd:20}} name="md-man" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
                
            
              <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeNameInpout}
               />
               


               <View style={{flexDirection:'column'}}>
{enterVasibal ?   <View style={{height:35,width:80,marginTop:10,marginLeft:14,marginRight:6}}>
  <Button  title='enter' color='#0a2946'  onPress={()=> [setNewLastName(newLastName),setNewFirstName(newFirstName),setEnterVasibal(!enterVasibal)]}  /> 
</View> 
: 
<View style={{height:35,marginTop:10,marginLeft:14,marginRight:6}}>
<Button  title='upDate' color='#0a2946'  onPress={()=> updateFirstNameAndLastNAmeUser(currentUserData.id,newFirstName,newLastName)}  /> 
</View>
 }
                
  

               </View>
                  <TextInput placeholder='Enter lastName...' 
                   value={newLastName}
                   onChangeText={textA => setNewLastName(textA)}
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'25%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
              <TextInput placeholder='Enter firstName..' 
              value={newFirstName}
              onChangeText={textB => setNewFirstName(textB)}
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'25%',marginLeft:15,marginTop:10,height:40}}
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
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>
        {currentUserData ? currentUserData.birthDate.day + "/" + currentUserData.birthDate.month+ "/" + currentUserData.birthDate.year : null }</Text>
          <MaterialIcons  style={{marginEnd:20}} name="date-range" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row', height:50,}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeDateInput}
               />
              
      <View style={{height:35,marginTop:10,marginLeft:14,marginRight:6}}>
<Button  title='upDate' color='#0a2946'  onPress={()=> updateBirthDay(currentUserData.id,date)}  /> 
</View>
              <TouchableOpacity onPress={showDatepicker} style={{width: '45%', marginLeft:30, backgroundColor: 'rgba(255, 178, 71,0.9)', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:0}}>
      <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>Press to change your birth date</Text>
      </TouchableOpacity>

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
          
            
              <AntDesign name="medium-monogram" size={20} color="black" style={{marginLeft:15}}/>
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
   isEndDate ? 

   goalInputPresented 
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangeGoalInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>
          <Text style={{fontSize:17}}>end date :  </Text>
              {currentUserData ? currentUserData.endDate.day + "/"+currentUserData.endDate.month+ "/"+currentUserData.endDate.year : null }</Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row', height:50,}}>
          <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
            onPress={ChangeGoalInpout}
             />
            
    <View style={{height:35,marginTop:10,marginLeft:14,marginRight:6}}>
<Button  title='upDate' color='#0a2946'  onPress={()=> updateEndDay(currentUserData.id,date)}  /> 
</View>
            <TouchableOpacity onPress={showDatepicker} style={{width: '45%', marginLeft:30, backgroundColor: 'rgba(255, 178, 71,0.9)', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop:0}}>
    <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>Press to change your end date</Text>
    </TouchableOpacity>

      </View>

        : 
        purposeInputPresented 
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangePurposeInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:40}}>
          <Text style={{fontSize:13}}> WeeklyGoal : to {massegeAboutWeeklyGoal ? massegeAboutWeeklyGoal : null}  </Text>
          
              </Text>
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
{

<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
    />
  
  }
{
  purposeInputPresented 
                  ?
          <View style={styles.details}>
          
              <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangePurposeInpout}
              />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>
          your Purpose {currentUserData ? currentUserData.weightGoal : null } </Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

          </View>

          : 

          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
            <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangePurposeInpout}
               />
          
          <View style={{height:35,marginTop:10,marginLeft:24,marginRight:6}}>
  <Button  title='upDate' color='#0a2946'  onPress={()=>updateWeightGoalUser(currentUserData.id,newPurpose)}  style={{height:'100%'}}/> 
</View>
          <Picker
          style={{
          marginTop:10,
          width: '55%',
          backgroundColor: 'rgba(255, 178, 71,0.9)',
      }}
      selectedValue={newPurpose}
      onValueChange={(itemValue) => setNewPurpose(itemValue)}
      
      >
         
      
{WeightMap.map((weight,i) => (
                <Picker.Item key={i} label={`${weight}kg`} value={weight} />
            ))}

      </Picker>
    
   


                
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