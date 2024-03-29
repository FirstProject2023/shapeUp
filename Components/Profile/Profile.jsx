import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image, ScrollView,TextInput,Button, StatusBar
  ,Animated,Modal,Alert ,PanResponder,Dimensions, Keyboard ,TouchableWithoutFeedback,Linking  } from 'react-native'
import React, { useState,useEffect } from 'react'
import { oreng,blue } from '../Globals/colors';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebase'
import { deleteDoc, doc, getDocs, setDoc,collection,addDoc,updateDoc} from 'firebase/firestore';


export default function Profile({ navigation }) {


  const userCollectionRef = collection(db,"users");
  const [users,setUsers]=useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [nameInputPresented,setNameInputPresented] = useState(1);
  const [ageInputPresented,setAgeInputPresented] = useState(1);
  const [emailInputPresented,setEmailInputPresented] = useState(1);
  const [phoneInputPresented,setPhoneInputPresented] = useState(1);
  const [purposeInputPresented,setPurposeInputPresented] = useState(1);
  const [goalInputPresented,setGoalInputPresented] = useState(1);
  const [dateInputPresented,setDateInputPresented] = useState(1);
  const [passwordInputPresented,setPasswordInputPresented] = useState(1);
  const[newFirstName,setNewFirstName]=useState("");
  const[newLastName,setNewLastName]=useState("");
  const[newpassword,setNewpassword]=useState("");
  const[eye,setEye]=useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
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


const [modalVisible, setModalVisible] = useState(false);
const toggleModalVisible = () => {
  setModalVisible(!modalVisible);
};

const phoneNumber1 = '0542588518'; // Replace with the phone number you want to message
    const message = `Thank you for choosing our application! We invite you to join and experience its features. Click the link to download: https://www.example.com/app`; // Customize the message and replace the link with your application's download link

    const whatsappUrlTest2 = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const whatsappUrlTest = `whatsapp://send?phone=${phoneNumber1}&text=${encodeURIComponent(message)}`;
  
    const whatsappToMaoz = `whatsapp://send?phone=${phoneNumber1}`;

    const phoneNumber2 = '0542588518'; // Replace with the phone number you want to message
  
    const whatsappUrlToShneor = `whatsapp://send?phone=${phoneNumber2}`;

const [modalVisible9, setModalVisible9] = useState(false);
const [selectedItems, setSelectedItems] = useState([]);
const [modalVisible4, setModalVisible4] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);


const checkWord = (word) => {
  if (selectedItems.includes(word)) {
    return true;
  }
  return false ;
};

// Example usage
const wordToCheck = 'goal';
const result = checkWord(wordToCheck);


/* const items = [
  'Date of birth',
  'email',
  'end date',
  'goal',
  'height',
  'weight',
  'age',
  'password',
 
]; */

const shareContent = () => {
  
 

  const sentence = selectedItems.join(': ');

  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
    `Hey !
I signed up for the shapeUp app
I wanted to share with you that my goal weight is *${currentUserData ? currentUserData.weightGoal : null}* \n
 details:\n ${
      checkWord("email") ? `\nEmail: *${currentUserData.email}*` : ''
    }${
      checkWord("Date of birth")
        ? `\nDate of birth: *${currentUserData.birthDate.day}/${currentUserData.birthDate.month}/${currentUserData.birthDate.year}*`
        : ''
    }${
      checkWord("end date")
        ? `\nThe process end date: *${currentUserData.finelDate.day}/${currentUserData.finelDate.month}/${currentUserData.finelDate.year}*`
        : ''
    }${
      checkWord("height")
        ? `\nHeight: *${currentUserData.height}*`
        : ''
    }${
      checkWord("weight")
        ? `\nWeight: *${currentUserData.weight}*`
        : ''
    }${
      checkWord("password")
        ? `\nPassword: *${currentUserData.password}*`
        : ''
    }  \n\n I invite you to download *ShapeUp* and try it yourself!`

  )}`;
  
  const subject = 'Email Subject';
  const mailtoUrl = `mailto:${currentUserData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hey !
I signed up for the shapeUp app
I wanted to share with you that my goal weight is ${currentUserData ? currentUserData.weightGoal : null} \n
 details:\n ${
          checkWord("email") ? `\nEmail: ${currentUserData.email}` : ''
        }${
          checkWord("Date of birth")
            ? `\nDate of birth: ${currentUserData.birthDate.day}/${currentUserData.birthDate.month}/${currentUserData.birthDate.year}`
            : ''
        }${
          checkWord("end date")
            ? `\nThe process end date: ${currentUserData.finelDate.day}/${currentUserData.finelDate.month}/${currentUserData.finelDate.year}`
            : ''
        }${
          checkWord("height")
            ? `\nHeight: ${currentUserData.height}`
            : ''
        }${
          checkWord("weight")
            ? `\nWeight: ${currentUserData.weight}`
            : ''
        }${
          checkWord("password")
            ? `\nPassword: ${currentUserData.password}`
            : ''
        }  \n\n I invite you to download ShapeUp and try it yourself!`

  )}`;


  const phoneNumber = currentUserData.phone ? currentUserData.phone : null ;
  
  const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(

    `Hey !
I signed up for the shapeUp app
I wanted to share with you that my goal weight is ${currentUserData ? currentUserData.weightGoal : null} \n
 details:\n ${
          checkWord("email") ? `\nEmail: ${currentUserData.email}` : ''
        }${
          checkWord("Date of birth")
            ? `\nDate of birth: ${currentUserData.birthDate.day}/${currentUserData.birthDate.month}/${currentUserData.birthDate.year}`
            : ''
        }${
          checkWord("end date")
            ? `\nThe process end date: ${currentUserData.finelDate.day}/${currentUserData.finelDate.month}/${currentUserData.finelDate.year}`
            : ''
        }${
          checkWord("height")
            ? `\nHeight: ${currentUserData.height}`
            : ''
        }${
          checkWord("weight")
            ? `\nWeight: ${currentUserData.weight}`
            : ''
        }${
          checkWord("password")
            ? `\nPassword: ${currentUserData.password}`
            : ''
        }  \n\n I invite you to download ShapeUp and try it yourself!`



  )}`;

  // Implement your share content logic based on the selectedOption
  switch (selectedOption) {
    case 'whatsapp':
      // Share via WhatsApp
      Linking.openURL(whatsappUrl);
      break;
    case 'email':
      // Share via Email
      Linking.openURL(mailtoUrl);
      break;
    case 'sms':
      Linking.openURL(smsUrl);

      // Share via SMS
      break;
    default:
      // No option selected
      break;
  }

  // Close the modal
  setModalVisible4(false);
};


const toContinue = async()=>{

if(selectedItems.length<1)
{
Alert.alert("Must select at least one item")
}
else{ 
  setModalVisible9(false),
  setModalVisible4(true)
}
}

const updateWeightGoalUser = async (id,newWeightGoal) => {

setPurposeInputPresented(!purposeInputPresented);
  const userDoc = doc(db,"users",id)
  const newFields ={weightGoal: newWeightGoal } 
  await updateDoc(userDoc , newFields)

}

const updateFirstNameAndLastNAmeUser = async (id,NfirstName,NlastName) => {


  const userDoc = doc(db,"users",id)
  const newFields ={firstName: NfirstName,lastName: NlastName } 
  await updateDoc(userDoc , newFields)

}
const updatePassword = async (id,newpassword) => {


  console.log(newpassword);

  const userDoc = doc(db,"users",id)
  const newFields ={password : newpassword } 
  await updateDoc(userDoc , newFields)

}
const updateBirthDay = async (id,date) => {

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


  setDateInputPresented(!dateInputPresented); 

  const userDoc = doc(db,"users",id)
  const newBirthDate={day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
  const newFields ={birthDate: newBirthDate } 
  await updateDoc(userDoc , newFields)
    
    /* setBirthDate({day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})
    setBirthDateIsVisible(false)
     setGoalIsVisible(true) */
   
  }




  

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

    useEffect(() => {
      
      const currentUser = users.find((user) => user && user.email ? user.email.toLowerCase() == auth.currentUser.email.toLowerCase() : null );
      
    if (currentUser !== null) {
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
const date2 = new Date();

const diffInDays = differenceInDays(date2, date1);
const years = Math.floor(diffInDays / 365);
const months = Math.floor((diffInDays % 365) / 30);
const days = diffInDays - (years * 365) - (months * 30);



  const hendleSingOut =()=>{
    auth
    .signOut()
    .then(()=>{
      navigation.navigate('Login')
    })
    .catch(error => log("error"))
  }



/*   Date of birth, email, end date, goal, password, height, weight, age,
 */  const items = [
    'Date of birth',
    'email',
    'end date',
    'height',
    'weight',
    'password',
   
  ];

  


  const toggleItem = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  };


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
  function ChangePhoneInpout()
  {
    setPhoneInputPresented(!phoneInputPresented)
  }
  function ChangePasswordInpout()
  {
    setPasswordInputPresented(!passwordInputPresented)
    Alert.alert(
      'Password Changed',
      'Your password has been updated. Please refresh the app to see the changes.',
      [
        { text: 'OK', onPress: () => changePassword() },
        { text: 'Dont Change', onPress: () => console.log('OK pressed') },
      ]
    );
    
  }
  function ChangePurposeInpout()
  {
    setPurposeInputPresented(!purposeInputPresented)
  }
  function ChangeGoalInpout()
  {
    setGoalInputPresented(!goalInputPresented)
  }

function changeName()
{

  
  Alert.alert(
    'Confirmation',
    'Are you sure you want to change a username?',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // Handle the user's confirmation here
          enterToDo();
        },
      },
    ],
    { cancelable: false }
  );

}
function changePassword(){
  enterToChangePassword()

}

  function enterToDo()
  {
  

    if(newLastName != "" && newFirstName != "")
    {
      setShowModal3(true);  
      updateFirstNameAndLastNAmeUser(currentUserData.id,newFirstName,newLastName)
      
    }
    else{
      
      setShowModal2(true);
    }
   
  }

  function enterToChangePassword()
  {
   
    if(newpassword.length > 5 )
    {
      console.log(newpassword);
      setShowModal3(true);  
      updatePassword(currentUserData.id,newpassword)
      
    }
    else{
      setShowModal2(true);
    }
   
  }



  const handleBackgroundPress = () => {
    
    Keyboard.dismiss(); // Dismiss the keyboard when clicking on the background
  };

  function ChangePasswordInput()
  {
    setPasswordInputPresented(!passwordInputPresented)
  }

  const [showModal, setShowModal] = useState(false);
  const [fadeAnimation] = useState(new Animated.Value(0));

  const handlePress = () => {
    setShowModal(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };






  const updateImg = async (id,img) => {


    console.log("my img ---->>>>>>>>>" +img);

    const userDoc = doc(db,"users",id)
  
    currentUserData.img=img;
 
    const newFields ={img : currentUserData.img } 
  
    await updateDoc(userDoc , newFields)
  
  }



    const pickImage = async () => {
      
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      updateImg(currentUserData.id,result.assets[0].uri)
     
    }
  };


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
        navigation.navigate('Articles');
        Animated.timing(slideIn, {
          toValue: 0,
          duration: 1900,
          useNativeDriver: false,
        }).start();
    
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
  
if(auth.currentUser&& currentUserData)
{
  return (
    
    
    
    <Animated.View  
         {...panResponder.panHandlers}
         
        style={{
         
          transform: [{ translateX: position.x }, ],
        }}
    
        >
    <View style={styles.container}>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />

      <View style={styles.profileImg}>

        
        <ImageBackground
        style={{height:'100%',width:'100%'}}
        source={{uri: "https://images.indianexpress.com/2021/12/GettyImages-fasting-diet-plan-1200.jpg"} }
        resizeMode= 'cover'
        >
      <TouchableOpacity style={{position:'absolute',top:10,right:15,zIndex:999}} onPress={toggleModalVisible}>
        <Entypo name="menu" size={40} color="#fff"  />
      </TouchableOpacity>
          <View style={{height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.6)',alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:35,color:'white',fontWeight:'700'}}>{currentUserData ? currentUserData.firstName : null}</Text>
          </View>
        </ImageBackground>

      </View>

      
    <View style={{zIndex:90}}>
        <View style={styles.circle}>
        {currentUserData.img ?  
         <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: currentUserData.img }} style={{height:'100%',width:'100%',borderRadius: 50}} />
        
         </TouchableOpacity>

      :
<Image style={{height:'100%',width:'100%',borderRadius: 50}} source={{uri: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"}} resizeMode= 'cover'/>
      } 
        </View>
    </View>
    <TouchableOpacity style={{zIndex:100}}>
        <View style={{ width:28,height:30,backgroundColor:'white',borderRadius:50,position:'absolute',top:14,left:113}} />
       <Feather  name="plus-circle" size={36} color="black" onPress={pickImage} style={{ position:'absolute',top:12,left:110}} /> 
        </TouchableOpacity>


    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisible}
      >
        <TouchableWithoutFeedback onPress={toggleModalVisible}>
          <View style={styles.modalContainer3}>
            <View style={styles.modalView3}>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>  Linking.openSettings()}>
                <Text style={styles.modalButtonText3}>Settings</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={styles.modalButton3} onPress={()=>setModalVisible8(true)}>
                <Text style={styles.modalButtonText3}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>setModalVisible7(true)}>
                <Text style={styles.modalButtonText3}>Company Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>hendleSingOut()}>
                <Text style={styles.modalSignOutText}>sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCancelButton3} onPress={toggleModalVisible}>
                <Text style={styles.modalCancelButtonText3}>Cancel</Text>
              </TouchableOpacity>
           
            </View>
          </View>
        </TouchableWithoutFeedback>
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
            <Text style={styles.title8}>Contact Options</Text>

            <View style={styles.buttonContainer8}>

            <TouchableOpacity style={styles.contactButton} onPress={ ()=> Linking.openURL(whatsappToMaoz)}>
              <Text style={styles.contactButtonText}>Contact via WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}  onPress={()=>Linking.openURL('mailto:abhtur321@gmail.com')}>
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
    <Modal visible={showModal} transparent={true} onRequestClose={handleClose}>
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={handleClose}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnimation }]}>
    <View style={styles.captionContainer}>
          <Text style={styles.captionText}>{currentUserData.firstName +"  "+ currentUserData.lastName }</Text>
        </View>
            <Image source={{ uri: currentUserData.img }} style={styles.largeImage} />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={modalVisible9}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible9(false)}
      >
        <View style={styles.modalContainer9}>
          <View style={styles.modalContent9}>
          <Text style={{fontSize:22,width:'90%',fontWeight:'800',marginBottom:30}}>Select which items you would like to share</Text>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.itemContainer9}
                onPress={() => toggleItem(item)}
              >
                <View
                  style={[
                    styles.circle9,
                    selectedItems.includes(item) && styles.selectedCircle9,
                  ]}
                />
                <View style={{width:'45%'}}>
                <Text style={styles.itemText9}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => [toContinue()]}>
              <Text style={styles.continueButton9}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible9(false)}>
              <Text style={styles.closeModalButton9}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={() => setModalVisible4(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 22, marginBottom: 10 }}>Choose a platform to share:</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setSelectedOption('whatsapp')}
            >
              <View style={[styles.circle4, selectedOption === 'whatsapp' && styles.selectedCircle4]} />
              <Text style={styles.itemText4}>WhatsApp</Text>
              <Ionicons style={{marginStart:60}} name="logo-whatsapp" size={32} color= {selectedOption === 'whatsapp' ? "green"  : "black" } />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setSelectedOption('email')}
            >
              <View style={[styles.circle4, selectedOption === 'email' && styles.selectedCircle4]} />
              <Text style={styles.itemText4}>Email</Text>
              <MaterialCommunityIcons style={{marginStart:115}} name="email" size={32} color= {selectedOption === 'email' ? "green"  : "black" }/>
            </TouchableOpacity>

            {currentUserData.phone ? 
            <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            onPress={() => setSelectedOption('sms')}
          >
            <View style={[styles.circle4, selectedOption === 'sms' && styles.selectedCircle4]} />
            <Text style={styles.itemText4}>SMS</Text>
            <MaterialIcons style={{marginStart:125}} name="sms" size={32} color= {selectedOption === 'sms' ? "green"  : "black" } />
          </TouchableOpacity>
            : 
            null}
            
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>setModalVisible4(false)}>
              <Text style={styles.closeModalButton4}>close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareContent}>
              <Text style={[styles.closeModalButton4,{color:blue}]}>Share</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  

    

{/* a */}

      <ScrollView>


<View style={{height:'12%',width:'100%',justifyContent:'center',alignItems:'center' }}>
      <Text style={{fontSize:20,color:blue,marginRight:30,fontSize:20}}> {/* ({days})({months}) */}{years} years old </Text>
</View>

<View style={{flexDirection:'row'}}>

      <TouchableOpacity style={{height:"130%",width:"28%",borderRadius:100, position:'absolute',top:-21,left:20,zIndex:100,backgroundColor:'#F0FFFF'
      ,borderWidth:2,justifyContent:'center',alignItems:'center'}}>
             <Text style={{fontSize:17,color:oreng,textAlign:'center',fontWeight: '700'}}> {currentUserData ? currentUserData.weightGoal : null } kg </Text>
          <Text style={{fontSize:16,color:"black",textAlign:'center',fontWeight: '700'}}> goal weight</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.weightContainer}>


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

      </TouchableOpacity>
         

      </View>


<View style={{width:'90%',justifyContent:'center',alignItems:'center',marginTop:20}}>

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
          <View>
         <Text style={{fontSize:12}}>** enter your first and last name to update your details.</Text>
          <View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>
       
                
            
              <AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangeNameInpout}
              />
               
               <View style={{flexDirection:'column'}}>
{  <View style={{height:35,width:80,marginTop:10,marginLeft:14,marginRight:6}}>
  <Button  title='enter' color='#0a2946'  onPress={()=> changeName()}  /> 
</View> 

 }

 
                
  {
    <Modal 
    visible={showModal2} 
    animationType="slide" 
    transparent={true}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>error!</Text>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalText}>
          You need to type a first and last name!
          </Text>
        </View>
          
        <TouchableOpacity 
          style={styles.modalButton} 
          onPress={() => {
            setShowModal2(false);
           
          }}
        >
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  }
{
    <Modal 
    visible={showModal3} 
    animationType="slide" 
    transparent={true}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Changed successfully</Text>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalText}>
          When you refresh the app you can see the changes applied
          </Text>
        </View>
          
        <TouchableOpacity 
          style={styles.modalButton} 
          onPress={() => {
            setShowModal3(false);
           
          }}
        >
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  }



               </View>
                  <TextInput placeholder='Enter lastName...' 
                   value={newLastName}
                   onChangeText={textA => [setNewLastName(textA),console.log(textA)]}
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'25%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
              <TextInput placeholder='Enter firstName..' 
              value={newFirstName}
              onChangeText={textB => setNewFirstName(textB)}
                style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'25%',marginLeft:15,marginTop:10,height:40}}
                ></TextInput>
                
            
        </View>
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
<View>

<Text style={{fontSize:12,margin:10}}>** enter your date of birth to update your details.</Text>
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
          
            
          <AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />
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
{
  currentUserData && phoneInputPresented && currentUserData.phone
                  ?
          <View style={styles.details}>
          
            
          <AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>{currentUserData ? currentUserData.phone : null}</Text>
<Feather style={{marginEnd:20}} name="phone-call" size={24} color="black" />
          </View>

          : 

       null



            }

{
  phoneInputPresented && currentUserData.phone ?
  <View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
  />
  :
  null
}




{/* <View style={styles.details}>
<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}> Purpose </Text>
<Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />
</View> */}


{
   isEndDate ? 

  
          <View style={styles.details}>
          
          <AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />

          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:50}}>
          <Text style={{fontSize:17}}>end date : </Text>
              {currentUserData ? currentUserData.endDate.day + "/"+currentUserData.endDate.month+ "/"+currentUserData.endDate.year : null }</Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

          </View>

         
        : 
       
          <View style={styles.details}>
          
          <AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:40}}>
          <Text style={{fontSize:12}}> WeeklyGoal : to {massegeAboutWeeklyGoal ? massegeAboutWeeklyGoal : null}  </Text>
          
              </Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

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
 !isEndDate ?
<View style={styles.details}>

<AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />

<Text style={{fontSize:15,color:"black",textAlign:'center',marginStart:40}}>
<Text style={{fontSize:13}}> end date :  {currentUserData ? currentUserData.finelDate.day + "/"+currentUserData.finelDate.month+ "/"+currentUserData.finelDate.year : null } </Text>

</Text>
<Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

</View>
:
null

}
{
!isEndDate 
?
<View
    style={{
      height: 1.5,
      width:'78%',
      backgroundColor: 'black',
      borderRadius:6,
      marginLeft:28
    }}
    />
    
    : null
  }

{

          <View style={styles.details}>
          
             
               <AntDesign style={{marginLeft:15}} name="lock" size={24} color="black"  />

          <Text style={{fontSize:16,color:"black",textAlign:'center',marginStart:50}}>
          your Purpose : {currentUserData ? currentUserData.weightGoal : null } kg</Text>
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

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
  

  passwordInputPresented ?
          <View style={styles.details}>
          
          
          <View style={{flexDirection: "row"}}>
          <FontAwesome style={{marginLeft:15}} name="eye" size={28} color={eye ? "green" : "black" }  
           onPress={()=> setEye(!eye)}
           />
           <FontAwesome5 name="pen" size={20} color="black" style={{marginLeft:15}}
              onPress={ChangePasswordInput}
              />
           </View>
          <Text style={{fontSize:15,color:"black",textAlign:'center',marginEnd:0}}>{ currentUserData && eye ? currentUserData.password : "password" } </Text>
          
          <Foundation style={{marginEnd:20}} name="target-two" size={24} color="black" />

          </View>

          
: 
<View style={{}}>

<Text style={{fontSize:12}}>** enter your password (The password will not really change).</Text>
<View style={{width:'100%',alignItems:'center',flexDirection:'row'}}>

<AntDesign name="checkcircleo" size={24} color="black" style={{marginLeft:13}} 
              onPress={ChangePasswordInpout}
              />
<TextInput placeholder=' Enter here ...'  
  value={newpassword}
  onChangeText={textB => setNewpassword(textB)}
  style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,marginLeft:15,marginTop:10,height:40,width:'78%'}}
  ></TextInput>
  </View>
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

    <View style={{width:'100%', height:185,alignItems:'center' }}>
      <TouchableOpacity
    style={styles.sendDetails}
    onPress={()=>setModalVisible9(true)}
    >
        <Text style={{color: '#fff', fontSize: 17}}>Share the process</Text>
    </TouchableOpacity>  

      <TouchableOpacity
    style={styles.singOutButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 20}}>Sign Out</Text>
    </TouchableOpacity>  
      </View>

      </View>
      </ScrollView>

     
  
{/* a */}


    </View>
    </Animated.View>
    
    
  )
}
else{
  return (
    <ImageBackground source={{uri: "https://img.freepik.com/free-photo/healthy-lifestyle-people-food-concept-reluctant-handsome-young-man-pointing-finger-disgusting-salad-unwilling-eat-this-smirking-dissatisfied-tilting-head-sad-yellow-background_1258-59808.jpg?size=626&ext=jpg&ga=GA1.2.1278374744.1675142697&semt=ais"}} resizeMode= 'cover'>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    <View style={styles.guestContainer}>


    <Text style={{fontSize:45,color:'white', marginTop: 60,fontWeight:'200'}}>Profile</Text>
    <Text style={{fontSize:20,color:'white', padding: 10}}>Profile information is only visible to registered users</Text>
    <AntDesign name="arrowdown" size={55} color="#fff" />
    <TouchableOpacity
    style={styles.loginButton}
    onPress={hendleSingOut}
    >
        <Text style={{color: '#fff', fontSize: 22 ,fontWeight:'500'}}>Create a user</Text>
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
    backgroundColor: 'rgb(255, 178, 71)',
    marginTop: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

},
singOutButton:{
  width: '60%',
  height: '25%',
  backgroundColor: blue,
  marginTop: 15,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,

},
sendDetails:{
  width: '48%',
  height: '19%',
  backgroundColor:'#394cb0',
  marginTop: 15,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,

},
profileImg:
{
  width:'100%',
  height: '25%',
},
circle: {
  width: 100,
  height: 100,
  borderWidth:2,
  borderRadius: 50,
 position:'absolute',
 top:-66,
left:60,
},
weightContainer:{
  
  marginTop:5,
  width: "50%",
  height: 80,
  borderWidth:2,
  borderRadius: 20,
backgroundColor:'#F0FFFF',
alignItems:'center',
justifyContent:'center',
marginLeft:145,
},
details:{
  flexDirection:'row',
  height:50,
  width:'100%',
  alignItems:'center',
  justifyContent:'center',
  justifyContent:'space-between'

},
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  alignItems: 'center',
  justifyContent: 'center',
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
},
largeImage: {
  marginTop:40,
  width: 300,
  height: 300,
  borderRadius: 150,
},
captionContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'green',
  paddingVertical: 8,
  paddingHorizontal: 16,
},
captionText: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
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
modalContainer3: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalView3: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
modalButton3: {
  marginVertical: 10,
  padding: 10,
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
},
modalButtonText3: {
  fontSize: 18,
  fontWeight: 'bold',
},
modalCancelButton3: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
},
modalCancelButtonText3: {
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

modalContainer9: {
  height:"100%",
  width:"100%",
  justifyContent: 'center',
  widthyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent9: {
  height:"90%",
  width:"90%",
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},
itemContainer9: {
  marginTop:10,
  justifyContent:'center',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
circle9: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'black',
  marginRight: 10,
},
selectedCircle9: {
  backgroundColor: 'blue',
},
itemText9: {
  fontSize: 20,
},
closeModalButton9: {
  fontSize: 22,
  fontWeight: '900',
  color: 'red' ,
  marginTop: 30,
},
continueButton9: {
  fontSize: 26,
  color: blue ,
  fontWeight: '900',
  marginTop: 30,
},
circle4: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'black',
  marginRight: 10,
},
selectedCircle4: {
  backgroundColor: 'green',
},
itemText4: {
  fontSize: 25,
},
closeModalButton4: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'red',
  marginTop: 20,
},


})