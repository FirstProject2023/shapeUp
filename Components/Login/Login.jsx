import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons'; 
import FadeInOut from 'react-native-fade-in-out';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
// import InlineDatePicker from 'react-native-inline-datepicker';






import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase'


export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [firstScreenIsVisible, setFirstScreenIsVisible] = useState(true);
    const [loginIsVisible, setLoginIsVisible] = useState(false);
    const [signUpIsVisible, setSignUpIsVisible] = useState(false);
    const [nameIsVisible, setNameIsVisible] = useState(false);
    const [genderIsVisible, setGenderIsVisible] = useState(false);
    const [heightAndWeightIsVisible, setHeightAndWeightIsVisible] = useState(false);
    const [birthDateIsVisible, setBirthDateIsVisible] = useState(false);
    const [goalIsVisible, setGoalIsVisible] = useState(false);

    // const [date, setDate] = useState(new Date());

    //One of them
    const [WeeklyGoal, setWeeklyGoal] = useState(false);
    const [endDate, setEndDate] = useState(false);


    const HeightMap = [];
    for (let i = 100; i <= 300; i += 1) {
      HeightMap.push(i);
    }
  
          const WeightMap = [];
    for (let i = 30; i <= 200; i += 1) {
      WeightMap.push(i);
    }
    


useEffect(()=>{
   const unSubscribe = auth.onAuthStateChanged(user=>{
    if(user){
      navigation.navigate('Nav')
    }
    return unSubscribe
  })
},[])


    const  handleSignUp =  async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);
           
        } catch (error){
            console.log("b");
           
        }
    
    }
    const  handleLogin =  async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            Alert.alert(
              'Erro',
              'Login ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          
        } catch (error){
            console.log("error");
           
        }
    
    }
   
  return (
    
    <ImageBackground source={{uri: "https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-11-23/3b788920-2d79-11eb-9dcd-8b2ef5358591.jpg"}} resizeMode='cover'>

    <View style={styles.loginContainer}>
    
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
    onPress={()=>{ navigation.navigate('Nav')}}
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
    onPress={()=> [setSignUpIsVisible(false), setNameIsVisible(true)]}
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
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setFirstName(text)}
      />
      
      <TextInput 
       style={styles.textInput}
      placeholder='LastName'
      placeholderTextColor={'#fff'}
      
        onChangeText={text => setLastName(text)}
        secureTextEntry
       
        />
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [setNameIsVisible(false), setGenderIsVisible(true)]}
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
    
    <TouchableOpacity onPress={()=> [setGenderIsVisible(false), setHeightAndWeightIsVisible(true)]}>
    <View style={{height: 100, width: 100, borderWidth: 3, borderColor: '#fff', borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(253, 92, 175, 0.4)'}}>
    <MaterialCommunityIcons name="face-woman" size={65} color="#fff" />
    </View>       
    </TouchableOpacity>

    <TouchableOpacity onPress={()=> [setGenderIsVisible(false), setHeightAndWeightIsVisible(true)]}>
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
          width: '70%',
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
          width: '70%',
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
      {/* <TextInput 
      style={styles.textInput}
      placeholder='Height'
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setFirstName(text)}
      />
      
      <TextInput 
       style={styles.textInput}
      placeholder='Weight'
      placeholderTextColor={'#fff'}
      
        onChangeText={text => setLastName(text)}
        secureTextEntry
       
        /> */}
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [setHeightAndWeightIsVisible(false), setBirthDateIsVisible(true)]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>


    </View>
    </FadeInOut>


    <FadeInOut style={{ 
        //birthView
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
     <TouchableOpacity onPress={()=> [setBirthDateIsVisible(false), setHeightAndWeightIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>

    <TextInput 
      style={styles.textInput}
      placeholder='Birth Date'
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setFirstName(text)}
      />
      
    
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity
    style={[styles.loginButton, { marginTop: 40}]}
    onPress={()=> [setBirthDateIsVisible(false), setGoalIsVisible(true)]}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 19, fontWeight: '800'}}>Continue</Text>
    </TouchableOpacity>


    </View>
    </FadeInOut>

    <FadeInOut style={{ 
        //birthView
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 160,
        zIndex: goalIsVisible ?  999 : 0,}} 

        visible={goalIsVisible}
        duration={!goalIsVisible ?  400 : 800}
        scale={true}>


    <View style={styles.inputsContainer}>
     <TouchableOpacity onPress={()=> [setGoalIsVisible(false), setBirthDateIsVisible(true)]} /*style={{position:'absolute', top: -130, right: 30}}*/>
    <Entypo  name="back" size={40} color="#fff" />
    </TouchableOpacity>

    <TextInput 
      style={styles.textInput}
      placeholder='Goal'
      leftIcon={<Entypo name="lock" size={24} color="#fff" />}
      
      placeholderTextColor={'#fff'}
        onChangeText={text => setFirstName(text)}
      />
      
    
    </View>
    <View style={styles.buttonContainer}>

    <TouchableOpacity
    onPress={()=> [handleSignUp, setGoalIsVisible(false), setFirstScreenIsVisible(true)]}
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