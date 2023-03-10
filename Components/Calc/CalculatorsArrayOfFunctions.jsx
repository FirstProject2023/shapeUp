import { StyleSheet, Text, View,useWindowDimensions, TextInput, Button,Modal,TouchableHighlight,Alert,
  ScrollView,FlatList,TouchableOpacity } from 'react-native'
import React, {  useState, useContext,useEffect,useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import {oreng,blue } from "../Globals/colors";



export default function CalculatorsArrayOfFunctions({num,heightOfResView,setHeightOfResView,
  bmiSearchResult,setBmiSearchResult,setWhatCalcIs,fatValue,setFatValue,carbohydratesValue,setIsMan,
  setCarbohydratesValue,proteinValue,setProteinValue,finelText,setFinelText,setFinelTextB,caloriesValue,setCaloriesValue,
  calorValueA,calorValueB,setCalorValueA,setCalorValueB,setMoreCalory,handleButtonClick,isEnglish
}) {
  
  
  let arrOfFunctions = [
    ProteinIntake(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
      ,fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,setProteinValue,
      finelText,setFinelText,caloriesValue,setCaloriesValue,handleButtonClick),
    Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick),
     BMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,setIsMan,handleButtonClick),
     SavingStatus(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick),
       WhatIsFatter( finelText,setFinelText,setFinelTextB,calorValueA,calorValueB,setCalorValueA,setCalorValueB,
        setHeightOfResView,setWhatCalcIs,setMoreCalory,handleButtonClick),
        ProteinIntakeEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
          ,fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,setProteinValue,
          finelText,setFinelText,caloriesValue,setCaloriesValue,handleButtonClick),
        BmiEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick,handleButtonClick),
         BMREb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,setIsMan,handleButtonClick),
         SavingStatusEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick),
           WhatIsFatterEb( finelText,setFinelText,setFinelTextB,calorValueA,calorValueB,setCalorValueA,setCalorValueB,
            setHeightOfResView,setWhatCalcIs,setMoreCalory,handleButtonClick)
      
      
      
      ];
  
      return (
        
          isEnglish ?
          arrOfFunctions[num]
          :
          arrOfFunctions[num+5]
        
    )
  }

function Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick) {

  const {width} = useWindowDimensions();
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);

  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);

 
  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }

  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        'Erro',
        'Mast to choose Sex',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        'Erro',
        'Mast to choose height',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        'Erro',
        'Mast to choose weight ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
else{

  handleButtonClick();
  setBmiSearchResult(weightValue/((heightValue*0.01)*(heightValue*0.01)));
  setWhatCalcIs(1);
  setHeightOfResView(420);
}
  }
  


 

    return(
      
      <View style={[styles.container,{ width: width}]}>
  
        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>Bmi</Text>
        {/*   <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
    <Ionicons name="arrow-forward-outline"  size={44} color="black" />
      <Ionicons name="arrow-back" size={44} color="black" />
          </View> */}

    <View style={styles.icons} >
      

   
    <TouchableOpacity onPress={HandlePressOnMan} >
        <MaterialCommunityIcons 
            name="face-man" 
            size={44} 
             color={manisFocused ? 'black' : oreng} 

        />
    </TouchableOpacity>

    <TouchableOpacity onPress={HandlePressOnWoman} >
    <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
    </TouchableOpacity>

 

      </View>

<Text style={{marginTop:50,color:oreng, fontSize:20,fontFamily:''}} >Height</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
    
    {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} cm</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

    <Text style={{marginTop:20,color:oreng, fontSize:20,}}>Weight</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
    <View style={{height:'100%'}}>
    {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} kg   </Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
    </View>
  </View>
  
  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:50}}>
  <Button  title='result' color={blue}  onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>

  </View>
  )
}
function ProteinIntake(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
    , fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,
    setProteinValue,finelText,setFinelText,caloriesValue,setCaloriesValue,handleButtonClick ) {

     
  const {width} = useWindowDimensions();

  const [text, setText] = useState('');
  const [quantity,setQuantity]=useState('');
 


  const [data2, setData2] = useState([""]);  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [finelText2,setFinelText2] = useState('');
  const [showFlat,setShowFlat] = useState(1);

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
  
  const handleSearch = (text) => {
    setQuery(text);
   
  };

  const handleChange = (item) => {

    setFinelText2(item);
    setFinelText(item)
    setResults([]);
  }
 
  
  
  const quantities = [];
for (let i = 0; i <= 1500; i += 100) {
    quantities.push(i);
}

function ChangeText()
{
  
    setFinelText(text);
    setFlagToGetFinelRes(1);
  
}


  function Res()
  {
    if(!data2.nutrients)
     {
       Alert.alert(
         'Erro',
         'Mast to ctype food ',
         [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         {cancelable: false},
       );
     }
 else if(!quantity)
     {
       Alert.alert(
         'Erro',
         'Mast to choose quantity ',
         [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         {cancelable: false},
       );
     }
    
    else{
   
  setProteinValue( data2.nutrients.PROCNT * (quantity/100) );
  setFatValue(data2.nutrients.FAT * (quantity/100));
  setCarbohydratesValue(data2.nutrients.CHOCDF * (quantity/100) );

 
    setCaloriesValue(data2.nutrients.ENERC_KCAL * (quantity/100));
   
    handleButtonClick();
      setWhatCalcIs(0);
      setHeightOfResView(420);
    
  }
   
  } 
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>ProteinIntake</Text>
      <View style={{width:'100%', flexDirection:'row' ,justifyContent:'space-evenly',marginTop:10}}>
        
      <Ionicons name="ios-pizza-outline" size={34} color="black" />
      <FontAwesome5 name="hamburger" size={34} color="black" />
      </View>
      <Text style={{marginTop:19}}>Here you will type the name of the product </Text>
      

{/*  <TouchableOpacity style={{height: 40,marginRight:200}}>
  <Button  title='result' color='#0a2946' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity> */}
      
      <TextInput
      placeholder=' Enter here ...' 
      style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'70%',marginTop:10}}
       
        value={query}
        onChangeText={handleSearch}
      />

      {finelText2  ? <Text style={{marginTop:9,fontSize:20}}>{finelText2}</Text> : null}

 {
  showFlat ?

  <FlatList
  data={results}
  renderItem={({ item }) =>
  <TouchableOpacity onPress={()=>handleChange(item)}>

    <View style={{borderWidth:2,borderColor:'black',height:30,width:228}} >
<Text>{item}</Text>
 
  </View>

  </TouchableOpacity>
  }
  horizontal 
  bounces= {false}

/>
  :
    null

 }



    
 

<Text style={{marginTop:9}}>Please choose the amount in grams</Text>
<Picker
  style={{
    marginTop:10,
  width: '70%',
  backgroundColor: oreng,

}}
selectedValue={quantity}
onValueChange={(itemValue) => setQuantity(itemValue)}
>
{
quantities.map((quantity,i) => (
                <Picker.Item label={`${quantity} g`} value={quantity} key={i} />
            ))
            }

</Picker>





<View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:40}}>
  <Button  title='result' color='#0a2946' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
  

  </View>

  </View>
  </View>

  )
}

function BMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,setIsMan,handleButtonClick) {


  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [selectedAgeValue, setSelectedAgeValue] = useState('');

  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);
 

 

  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }
  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        'Erro',
        'Mast to choose Sex',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        'Erro',
        'Mast to choose height',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        'Erro',
        'Mast to choose weight ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     else if(!selectedAgeValue  )
    {
      Alert.alert(
        'Erro',
        'Mast to choose age ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
else{

  if(!manisFocused)
  {
    setIsMan(1)
    setBmiSearchResult((88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue)));    
    console.log(bmiSearchResult);
  }
  if(!womanIsFocused)
  {
    console.log(bmiSearchResult);
          setIsMan(0)
          setBmiSearchResult((447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)));    
        }
        handleButtonClick();
    setWhatCalcIs(2);
    setHeightOfResView(400);
  }
  }
  

    const {width} = useWindowDimensions();
    return(
      <View style={[styles.container,{ width: width}]}>

      <View style={styles.viewContainer}>
        
    <Text style={styles.text}>BMR</Text>


  <View style={styles.icons} >
  <TouchableOpacity onPress={HandlePressOnMan} >
      <MaterialCommunityIcons 
          name="face-man" 
          size={44} 
           color={manisFocused ? 'black' : oreng} 
      />
  </TouchableOpacity>

  <TouchableOpacity onPress={HandlePressOnWoman} >
  <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
  </TouchableOpacity>
  

    </View>


<Text style={{color: oreng,fontSize:20,marginTop:10}}>your age</Text>


    <Picker
  style={{
  
    marginTop:32,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={selectedAgeValue}
onValueChange={(itemValue) => setSelectedAgeValue(itemValue)}
>
{Array.from({ length: 120 }, (_, i) => i).map((ageOption,i) => (
          <Picker.Item key={i} label={`${ageOption}`} value={ageOption} />
        ))}

</Picker>

<Text style={{marginTop:10,color:'white', fontSize:20,color:oreng}} >Height</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={200}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}    
    />
    {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} cm</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

    <Text style={{marginTop:10, fontSize:20,color: oreng}}>Weight</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
    <View style={{height:'100%'}}>
    {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} kg   </Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
    </View>
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color={blue} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}

function SavingStatus(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick  ) {
  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);
  const [selectedAgeValue, setSelectedAgeValue] = useState(0);
  const [activValue,setActivValue] = useState(0);
  const [valueToMult,setValueToMult]=useState(0);

  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);
  
 
  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }
  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        'Erro',
        'Mast to choose Sex',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     else if(!activValue )
    {
      Alert.alert(
        'Erro',
        'Mast to choose activValue ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        'Erro',
        'Mast to choose height',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        'Erro',
        'Mast to choose weight ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
   else if(!selectedAgeValue  )
    {
      Alert.alert(
        'Erro',
        'Mast to choose age ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  else{

    switch(activValue) {
      case "Basic":
        setValueToMult(1)
        break;
        case "Little or no activity - office work at a desk":
        setValueToMult(1.2)
        break;
        case "Little activity - 1-3 times a week":
          setValueToMult(1.375)
          break;
          case "Average activity - 3-5 times a week":
            setValueToMult(1.55)
            break;
            case "Intensive activity - every day":
              setValueToMult(1.725)
              break;
              case "Intense activity combined with physical work":
                setValueToMult(1.9)
                  break;
          default:
            setValueToMult(0);
        }
        if(!manisFocused)
        {
         console.log("man");
          setBmiSearchResult((  (88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue))  * valueToMult ));
          
        }
        if(!womanIsFocused)
        {
         
          setBmiSearchResult(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
        }
        
        if(bmiSearchResult){
        }
        handleButtonClick();
          setWhatCalcIs(3)
          setHeightOfResView(400)
       
      }
      }
      

    const {width} = useWindowDimensions();
    return(
      <View style={[styles.container,{ width: width}]}>

      <View style={styles.viewContainer}>
        
    <Text style={{fontSize:20,marginTop:5}}>SavingStatus</Text>


  <View style={styles.icons} >
  <TouchableOpacity onPress={HandlePressOnMan} >
      <MaterialCommunityIcons 
          name="face-man" 
          size={44} 
           color={manisFocused ? 'black' : oreng} 
      />
  </TouchableOpacity>

  <TouchableOpacity onPress={HandlePressOnWoman} >
  <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
  </TouchableOpacity>
  

    </View>


<Text style={{color: oreng,fontSize:13,marginTop:5}}>your age</Text>


    <Picker
  style={{
    marginTop:7,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={selectedAgeValue}
onValueChange={(itemValue) => setSelectedAgeValue(itemValue)}
>
{Array.from({ length: 120 }, (_, i) => i).map((ageOption,i) => (
          <Picker.Item key={i} label={`${ageOption}`} value={ageOption} />
        ))}

</Picker>

<Text style={{color: oreng,fontSize:13}}>Your level of sporting activity</Text>
<Picker
  style={{
    marginTop:17,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={activValue}
onValueChange={(itemValue) => setActivValue(itemValue)}
>
<Picker.Item  label='Basic' value='Basic' />
<Picker.Item  label='Little or no activity - office work at a desk' value='Little or no activity - office work at a desk' />
<Picker.Item  label='Little activity - 1-3 times a week' value='Little activity - 1-3 times a week' />
<Picker.Item  label='Average activity - 3-5 times a week' value='Average activity - 3-5 times a week' />
<Picker.Item  label='Intensive activity - every day' value='Intensive activity - every day' />
<Picker.Item  label='Intense activity combined with physical work - every day' value='Intense activity combined with physical work' />

</Picker>

<Text style={{color:'white', fontSize:15,color: oreng}} >Height</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
   {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} cm</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

    <Text style={{ fontSize:13,color: oreng}}>Weight</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}    
    />
   {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2,width:40}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} kg   </Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color={blue} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}
function WhatIsFatter(finelText,setFinelText,setFinelTextB,calorValueA,calorValueB,setCalorValueA,setCalorValueB,
  setHeightOfResView,setWhatCalcIs,setMoreCalory,handleButtonClick) {
  const {width} = useWindowDimensions();
  const [data, setData] = useState([""]);
  
  const [newDataA, setNewDataA] = useState([""]);
  const [newDataB, setNewDataB] =useState([""]);

  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const [quantityA,setQuantityA]=useState('');
  const [quantityB,setQuantityB]=useState('');
  const[finelA,setFinelA]=useState('??????');
  const[finelB,setFinelB]=useState('??????');

  const[flagToGetFinelRes,setFlagToGetFinelRes]=useState(0);




  const [data1, setData1] = useState([""]);  
  const [data2, setData2] = useState([""]);  

  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [finelText2,setFinelText2] = useState('');
  const [finelText3,setFinelText3] = useState('');
  const [showFlat,setShowFlat] = useState(1);

  useEffect(() => {
    
    fetch(`https://api.edamam.com/auto-complete?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&q=${query1}`)
    .then((response) => response.json())
    .then((data) => setResults1(data))
    .catch((error) => console.error(error));

  }, [query1]);

   useEffect(() => {
    fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&ingr=${finelText2}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData1(data.parsed[0].food)
        
        
      })
      .catch(error => {
        // handle the error
      });
    }, [finelText2]);


  useEffect(() => {
    
    fetch(`https://api.edamam.com/auto-complete?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&q=${query2}`)
    .then((response) => response.json())
    .then((data) => setResults2(data))
    .catch((error) => console.error(error));

  }, [query2]);

   useEffect(() => {
    fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=63a20e43&app_key=%20c023c52205e56f3248f01d54785dba20&ingr=${finelText3}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData2(data.parsed[0].food)
        
        
      })
      .catch(error => {
        // handle the error
      });
    }, [finelText3]);

  
    const handleSearch1 = (text) => {
      setQuery1(text);
      setShowFlat(1);
     
    };
    const handleSearch2 = (text) => {
      setQuery2(text);
      setShowFlat(1);
     
    };
  
    const handleChange1 = (item) => {
  
      setFinelText2(item);
      setFinelText(item)
      setResults1([]);
      setShowFlat(0);
    }
    const handleChange2 = (item) => {
  
      setFinelText3(item);
      setFinelText(item)
      setResults2([]);
      setShowFlat(0);
    }
   





  const quantities = [];
  for (let i = 0; i <= 1500; i += 100) {
      quantities.push(i);
  }
  
      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelText}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData(data.result)
           
     
          });
        
        }, [finelText]);
      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelA}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setNewDataA(data.result)
          
          });
        
        }, [finelA]);

      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelB}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setNewDataB(data.result)
          
          });
        
        }, [finelB]);

      
        function Res()
        {
          if(!data2.nutrients || !data1.nutrients)
          {
            Alert.alert(
              'Erro',
              'Mast to ctype food ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
          else if(!quantityA)
           {
             
             Alert.alert(
               'Erro',
               'Mast to choose quantity ',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
           }
           else if(!quantityB)
           {
             
             Alert.alert(
               'Erro',
               'Mast to choose quantity ',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
           }

           else{

      
          setCalorValueA( data1.nutrients.ENERC_KCAL * (quantityA/100) );

         setCalorValueB(data2.nutrients.ENERC_KCAL * (quantityB/100) );
          
         setFinelText(data1.label)
         setFinelTextB(data2.label)
         handleButtonClick();
              setWhatCalcIs(4)
              setHeightOfResView(400);
            
            }
              
        }


  function ChangeTextA()
{
 setFinelA(textA)
 
}
function ChangeTextB()
{
  setFinelB(textB);
}
  
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>What Is Fatter</Text>

 
<View style={{flexDirection:'row',width:'100%',marginTop:15}}>



<View style={{width:'50%' ,alignItems:'center'}}>

<Text style={{marginTop:19}}>Type the name of food number one</Text>
      <TextInput
      placeholder=' Enter here ...' 
      style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'70%',marginTop:15}}
       
        value={query2}
        onChangeText={handleSearch2}
      />

      {finelText3  ? 
     
      <Text style={{marginTop:9,fontSize:20,color:oreng}}>{finelText3}</Text> 
     
      : null}

 {
  showFlat ?

  <FlatList
  data={results2}
  listKey={(item, index) => 'child' + index}
  renderItem={({ item }) =>
  <TouchableOpacity onPress={()=>handleChange2(item)}>

    <View style={{borderWidth:2,borderColor:'black',height:30,width:114}} >
<Text>{item}</Text>
 
  </View>

  </TouchableOpacity>
  }
  horizontal 
  bounces= {false}

/>
  :
    null

 }

</View>


<View style={{width:'50%',alignItems:'center'}}>

<Text style={{marginTop:19}}>Type the name of food number two</Text>
      <TextInput
      placeholder=' Enter here ...' 
      style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'70%',marginTop:15}}
       
        value={query1}
        onChangeText={handleSearch1}
      />

      {finelText2  ? <Text style={{marginTop:9,fontSize:20,color:oreng}}>{finelText2}</Text> : null}

 {
  showFlat ?

  <FlatList
  data={results1}
  listKey={(item, index) => 'child' + index}
  renderItem={({ item }) =>
  <TouchableOpacity onPress={()=>handleChange1(item)}>

    <View style={{borderWidth:2,borderColor:'black',height:30,width:114}} >
<Text>{item}</Text>
 
  </View>

  </TouchableOpacity>
  }
  horizontal 
  bounces= {false}

/>
  :
    null

 }

</View>




</View>


<View style={{flexDirection:'row',marginTop:20}}>


<View style={{width:'50%',alignItems:'center'}}>

<Text style={{marginTop:9}}>Type an amount of food number two</Text>
<Picker
  style={{
    marginRight:0,
    marginTop:10,
  width: '80%',
  backgroundColor: oreng,
}}
selectedValue={quantityA}
onValueChange={(itemValue) => setQuantityA(itemValue)}
>
{quantities.map((quantity,index) => (
                <Picker.Item label={`${quantity} g`} value={quantity} key={index} />
            ))}

</Picker>

</View>

<View style={{width:'50%',alignItems:'center'}}>

<Text style={{marginTop:9}}>Type an amount of food number one</Text>
<Picker
  style={{
    marginTop:10,
  width: '80%',
  backgroundColor: oreng,
}}
selectedValue={quantityB}
onValueChange={(itemValue) => setQuantityB(itemValue)}
>
{quantities.map((quantity,index) => (
                <Picker.Item label={`${quantity} g`} value={quantity} key={index} />
            ))}

</Picker>

</View>
</View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:50}}>
  <Button  title='result' color='#0a2946' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>
  </View>

  )
}
function BmiEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick) {

  const {width} = useWindowDimensions();
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);

 
  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }

  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ??????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ????????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ???????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
else{

  handleButtonClick();
  setBmiSearchResult(weightValue/((heightValue*0.01)*(heightValue*0.01)));
  setWhatCalcIs(6);
  setHeightOfResView(420);
}
  }
  


 

    return(
      
      <View style={[styles.container,{ width: width}]}>
  
        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>???????????? ?????? ????????</Text>
        {/*   <View style={{flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
    <Ionicons name="arrow-forward-outline"  size={44} color="black" />
      <Ionicons name="arrow-back" size={44} color="black" />
          </View> */}

    <View style={styles.icons} >
      

   
    <TouchableOpacity onPress={HandlePressOnMan} >
        <MaterialCommunityIcons 
            name="face-man" 
            size={44} 
             color={manisFocused ? 'black' : oreng} 

        />
    </TouchableOpacity>

    <TouchableOpacity onPress={HandlePressOnWoman} >
    <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
    </TouchableOpacity>

 

      </View>

<Text style={{marginTop:50,color:oreng, fontSize:20,fontFamily:''}} >????????</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
    {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }

  </View>

    <Text style={{marginTop:20,color:oreng, fontSize:20,}}>????????</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
   {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>
  
  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:50}}>
  <Button  title='??????????' color={blue}  onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>

  </View>
  )
}
function ProteinIntakeEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
    , fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,
    setProteinValue,finelText,setFinelText,caloriesValue,setCaloriesValue,handleButtonClick ) {
  const {width} = useWindowDimensions();

  const [text, setText] = useState('');
  const [quantity,setQuantity]=useState('');
  const[flagToGetFinelRes,setFlagToGetFinelRes]=useState(0)


  const [data, setData] = useState([""]);




  useEffect(() => {
    fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelText}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          setData(data.result)
 
      });
  }, [finelText]);


  const quantities = [];
for (let i = 0; i <= 1500; i += 100) {
    quantities.push(i);
}

function ChangeText()
{
 
    setFinelText(text);
    setFlagToGetFinelRes(1);
  
}


  function Res()
  {

    if(!text)
    {
      
      Alert.alert(
        '??????????',
        '???????? ???????????? ???????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     else if(!quantity)
     {
       
       Alert.alert(
         '??????????',
         '?????? ?????????? ???????? ',
         [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         {cancelable: false},
       );
     }
    
    else{
  setProteinValue(data.records[0].protein * (quantity/100));
  setFatValue(data.records[0].total_fat * (quantity/100));
  setCarbohydratesValue(data.records[0].carbohydrates * (quantity/100) );

    setCaloriesValue(((data.records[0].total_fat * (quantity/100)) * 9)+((data.records[0].carbohydrates * (quantity/100)) * 4 )
    +((data.records[0].protein * (quantity/100)) * 4));

    if(flagToGetFinelRes==1)
    {
      handleButtonClick();
      setWhatCalcIs(5);
      setHeightOfResView(420);
    }
  }
   
  } 
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>???????????? ??????????</Text>
      <View style={{width:'100%', flexDirection:'row' ,justifyContent:'space-evenly',marginTop:10}}>
        
      <Ionicons name="ios-pizza-outline" size={34} color="black" />
      <FontAwesome5 name="hamburger" size={34} color="black" />
      </View>

      <Text style={{marginTop:23}}>?????? ???????? ???? ???? ??????????</Text>

      <View style={{flexDirection:'row'}}>
<TextInput placeholder=' ???????? ?????? ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'70%',marginTop:10}}
onChangeText={text => setText(text)}
value={text}
></TextInput>
<View style={{height:35,marginTop:10,marginLeft:4}}>
  <Button  title='??????' color='#0a2946' onPress={ChangeText} style={{height:'100%'}}/> 
</View>
</View>


<Picker
  style={{
    marginTop:15,
  width: '70%',
  backgroundColor: oreng,
}}
selectedValue={finelText}
onValueChange={(itemValue) => setFinelText(itemValue)}
>
  {
     data.records ? data.records.map((e,i)=>{return <Picker.Item label={e.shmmitzrach} value={e.shmmitzrach} key={i} />}) : null 
  }

</Picker>

<Text style={{marginTop:19}}>???? ?????????? ???? ?????????? ????????????</Text>
<Picker
  style={{
    marginTop:10,
  width: '70%',
  backgroundColor: oreng,

}}
selectedValue={quantity}
onValueChange={(itemValue) => setQuantity(itemValue)}
>
{
quantities.map((quantity,i) => (
                <Picker.Item label={`${quantity} ??????`} value={quantity} key={i} />
            ))
            }

</Picker>





<View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:40}}>
  <Button  title='??????????' color='#0a2946' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
  

  </View>

  </View>
  </View>

  )
}

function BMREb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,setIsMan,handleButtonClick) {


  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [selectedAgeValue, setSelectedAgeValue] = useState('');

  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);
 

 

  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }
  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ??????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ????????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ???????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     else if(!selectedAgeValue  )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ?????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
else{

  if(!manisFocused)
  {
    setIsMan(1)
    setBmiSearchResult((88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue)));    
    console.log(bmiSearchResult);
  }
  if(!womanIsFocused)
  {
    console.log(bmiSearchResult);
          setIsMan(0)
          setBmiSearchResult((447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)));    
        }
        handleButtonClick();
    setWhatCalcIs(7);
    setHeightOfResView(400);
  }
  }
  

    const {width} = useWindowDimensions();
    return(
      <View style={[styles.container,{ width: width}]}>

      <View style={styles.viewContainer}>
        
    <Text style={{marginTop:20, fontSize: 30,}}>???????????? ???????????? ??????????</Text>


  <View style={styles.icons} >
  <TouchableOpacity onPress={HandlePressOnMan} >
      <MaterialCommunityIcons 
          name="face-man" 
          size={44} 
           color={manisFocused ? 'black' : oreng} 
      />
  </TouchableOpacity>

  <TouchableOpacity onPress={HandlePressOnWoman} >
  <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
  </TouchableOpacity>
  

    </View>


<Text style={{color: oreng,fontSize:20,marginTop:20}}>???????? ??????</Text>


    <Picker
  style={{
    marginTop:5,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={selectedAgeValue}
onValueChange={(itemValue) => setSelectedAgeValue(itemValue)}
>
{Array.from({ length: 120 }, (_, i) => i).map((ageOption,i) => (
          <Picker.Item key={i} label={`${ageOption}`} value={ageOption} />
        ))}

</Picker>

<Text style={{marginTop:10,color:'white', fontSize:20,color:oreng}} >????????</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={200}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}    
    />
   {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

    <Text style={{marginTop:10, fontSize:20,color: oreng}}>????????</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
    {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='??????????' color={blue} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}

function SavingStatusEb(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,handleButtonClick  ) {
  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);
  const [selectedAgeValue, setSelectedAgeValue] = useState(0);
  const [activValue,setActivValue] = useState(0);
  const [valueToMult,setValueToMult]=useState(0);
  
  const [heightDisplay,setHeightDisplay]  = useState(false);
  const [weightDisplay,setWeightDisplay]  = useState(false);

  const numberOptions = Array.from({ length: 201 }, (_, index) => index + 100);
  const numberOptions2 = Array.from({ length: 201 }, (_, index) => index + 20);
 
  const HandlePressOnMan = () => {
    if(womanIsFocused)
    {
      setManisFocused(!manisFocused);
   
    }
};
  const HandlePressOnWoman = () => {
    if(manisFocused)
    {
    setWomanIsFocused(!womanIsFocused);
    }
  };
  function Res()
  {
    if(manisFocused&&womanIsFocused)
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ??????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     else if(!activValue )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ?????? ???????????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!heightValue )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ????????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else if(!weightValue  )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ???????? ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
   else if(!selectedAgeValue  )
    {
      Alert.alert(
        '??????????',
        '???????? ?????????? ??????',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  else{

    switch(activValue) {
      case "??????????":
        setValueToMult(1)
        break;
        case "???????????? ?????????? ???? ?????? ???????????? - ?????????? ???????????? ?????? ??????????":
        setValueToMult(1.2)
        break;
        case "???????????? ???????? - 1-3 ?????????? ??????????":
          setValueToMult(1.375)
          break;
          case "???????????? ???????????? - 3-5 ?????????? ??????????":
            setValueToMult(1.55)
            break;
            case "???????????? ???????????????????? - ???? ??????":
              setValueToMult(1.725)
              break;
              case "???????????? ???????????????????? ???????????? ?????????? ?????????? - ???? ??????":
                setValueToMult(1.9)
                  break;
          default:
            setValueToMult(0);
        }
        if(!manisFocused)
        {
         console.log("man");
          setBmiSearchResult((  (88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue))  * valueToMult ));
          
        }
        if(!womanIsFocused)
        {
         
          setBmiSearchResult(( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
        }
        
        if(bmiSearchResult){
        }
        handleButtonClick();
          setWhatCalcIs(8)
          setHeightOfResView(400)
       
      }
      }
      

    const {width} = useWindowDimensions();
    return(
      <View style={[styles.container,{ width: width}]}>

      <View style={styles.viewContainer}>
        
    <Text style={{fontSize:20,marginTop:8}}>???????????? ???????????? ??????????</Text>


  <View style={styles.icons} >
  <TouchableOpacity onPress={HandlePressOnMan} >
      <MaterialCommunityIcons 
          name="face-man" 
          size={44} 
           color={manisFocused ? 'black' : oreng} 
      />
  </TouchableOpacity>

  <TouchableOpacity onPress={HandlePressOnWoman} >
  <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : oreng}  />
  </TouchableOpacity>
  

    </View>


<Text style={{color: oreng,fontSize:13,marginTop:5}}>???????? ??????</Text>


    <Picker
  style={{
    marginTop:17,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={selectedAgeValue}
onValueChange={(itemValue) => setSelectedAgeValue(itemValue)}
>
{Array.from({ length: 120 }, (_, i) => i).map((ageOption,i) => (
          <Picker.Item key={i} label={`${ageOption}`} value={ageOption} />
        ))}

</Picker>

<Text style={{color: oreng,fontSize:13}}>?????? ?????????????? ???????????????????? ??????</Text>
<Picker
  style={{
    marginTop:17,
  width: '70%',
  backgroundColor: oreng,
  marginBottom:20,
}}
selectedValue={activValue}
onValueChange={(itemValue) => setActivValue(itemValue)}
>
<Picker.Item  label='??????????' value='??????????' />
<Picker.Item  label='???????????? ?????????? ???? ?????? ???????????? - ?????????? ???????????? ?????? ??????????' value='???????????? ?????????? ???? ?????? ???????????? - ?????????? ???????????? ?????? ??????????' style={{ fontSize: 12 }}  />
<Picker.Item  label='???????????? ???????? - 1-3 ?????????? ??????????' value='???????????? ???????? - 1-3 ?????????? ??????????' />
<Picker.Item  label='???????????? ???????????? - 3-5 ?????????? ??????????' value='???????????? ???????????? - 3-5 ?????????? ??????????' />
<Picker.Item  label='???????????? ???????????????????? - ???? ??????' value='???????????? ???????????????????? - ???? ??????' />
<Picker.Item  label='???????????? ???????????????????? ???????????? ?????????? ?????????? - ???? ??????' value='???????????? ???????????????????? ???????????? ?????????? ?????????? - ???? ??????' style={{ fontSize: 14 }} />

</Picker>

<Text style={{color:'white', fontSize:15,color: oreng}} >????????</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}   
    />
     {
      !heightDisplay ? <TouchableOpacity onPress={()=>setHeightDisplay(!heightDisplay)}
      style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{(heightValue * 0.01).toFixed(2)}{"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={heightValue}
      onValueChange={value => [setHeightValue(value),setHeightDisplay(!heightDisplay)]}
      >
      {numberOptions.map(number => (
        <Picker.Item key={number} label={ (number * 0.01).toFixed(2).toString() + " cm"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

    <Text style={{ fontSize:13,color: oreng}}>????????</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor={oreng}
    thumbTintColor={oreng}    
    />
    {
      !weightDisplay  ? <TouchableOpacity onPress={()=>setWeightDisplay(!weightDisplay)}
       style={{borderColor:oreng,borderWidth:1,borderRadius:4,padding:2}}>
      <Text style={{fontSize:10}} >{weightValue.toFixed(0).toString()} {"\n"} ??????????????</Text>
      </TouchableOpacity>
      :
      <View style={{height:30, width:50,backgroundColor:oreng,borderRadius:5,marginTop:0}}>

      <Picker
      style={{ marginTop:-10}}
      selectedValue={weightValue}
      onValueChange={value => [setWeightValue(value),setWeightDisplay(!weightDisplay)]}
      >
      {numberOptions2.map(number => (
        <Picker.Item key={number} label={number.toString() + " k"} value={number} />
        ))}
    </Picker>
        </View>
     
    }
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='??????????' color={blue} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}
function WhatIsFatterEb(finelText,setFinelText,setFinelTextB,calorValueA,calorValueB,setCalorValueA,setCalorValueB,setHeightOfResView,setWhatCalcIs,setMoreCalory) {
  const {width} = useWindowDimensions();
  const [data, setData] = useState([""]);
  
  const [newDataA, setNewDataA] = useState([""]);
  const [newDataB, setNewDataB] =useState([""]);

  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const [quantityA,setQuantityA]=useState('');
  const [quantityB,setQuantityB]=useState('');
  const[finelA,setFinelA]=useState('??????');
  const[finelB,setFinelB]=useState('??????');

  const[flagToGetFinelRes,setFlagToGetFinelRes]=useState(0);

  const quantities = [];
  for (let i = 0; i <= 1500; i += 100) {
      quantities.push(i);
  }
  
      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelText}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData(data.result)
           
     
          });
        
        }, [finelText]);
      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelA}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setNewDataA(data.result)
          
          });
        
        }, [finelA]);

      useEffect(() => {
        fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${finelB}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setNewDataB(data.result)
          
          });
        
        }, [finelB]);

        function ResDo()
        {
        
        }

        function Res()
        {

          if(!textA)
          {
            
            Alert.alert(
              '??????????',
              '???????? ???????????? ????????',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
         else if(!textB)
          {
            
            Alert.alert(
              '??????????',
              '???????? ???????????? ???????? ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
           else if(!quantityA)
           {
             
             Alert.alert(
               '??????????',
               '???????? ?????????? ???????? ',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
           }
           else if(!quantityB)
           {
             
             Alert.alert(
               '??????????',
               '???????? ?????????? ??????????',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
           }

           else{

             
             
          setCalorValueA(((newDataA.records[0].total_fat * (quantityA/100)) * 9)+((newDataA.records[0].carbohydrates
            * (quantityA/100)) * 4 )
         +((newDataA.records[0].protein * (quantityA/100)) * 4));
         setCalorValueB(((newDataB.records[0].total_fat * (quantityB/100)) * 9)+((newDataB.records[0].carbohydrates
           * (quantityB/100)) * 4 )
           +((newDataB.records[0].protein * (quantityB/100)) * 4));
          
           handleButtonClick();
              setWhatCalcIs(9)
              setHeightOfResView(400);
            
            }
              
        }


  function ChangeTextA()
{
 setFinelA(textA)
 
}
function ChangeTextB()
{
  setFinelB(textB);
}
  
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={{marginTop:20,fontSize: 20,}}>???????????? ???????????? ?????????? ?????????????? ??????????</Text>

      <View style={{flexDirection:'row',marginTop:20}}>

<View style={{width:'50%'}}>
  <Text style={{fontSize:25,color:oreng,marginLeft:70}} > ???????? ??'</Text>
</View>

<View style={{width:'50%',marginRight:100}}>
  <Text style={{fontSize:25,color:oreng,marginLeft:70}}>???????? ??'</Text>
</View>

        </View>
 
<View style={{flexDirection:'row'}}>

<TextInput placeholder=' ???????? ?????? ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'20%',marginTop:10,marginLeft:5}}
onChangeText={textA => setTextA(textA)}
value={textA}
></TextInput>

<View style={{height:35,marginTop:10,marginLeft:4,marginRight:6}}>
  <Button  title='??????' color='#0a2946' onPress={ChangeTextA} style={{height:'100%'}}/> 
</View>

      <TextInput placeholder=' ???????? ?????? ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'20%',marginTop:10}}
onChangeText={textB => setTextB(textB)}
value={textB}
></TextInput>

<View style={{height:35,marginTop:10,marginLeft:4}}>
  <Button  title='??????' color='#0a2946' onPress={ChangeTextB} style={{height:'100%'}}/> 
</View>

</View>


<View style={{flexDirection:'row',marginTop:20}}>

<Picker
  style={{
    marginTop:15,
    marginRight:14,
      width: '35%',
  backgroundColor:oreng,
}}
selectedValue={finelText}
onValueChange={(itemValue) => setFinelText(itemValue)}
>
  {
     newDataA.records  ? newDataA.records.map((e,i)=>{return <Picker.Item label={e.shmmitzrach} value={e.shmmitzrach} key={i} />}) : null 
  }
 
</Picker>

<Picker
  style={{
    marginTop:15,
  width: '35%',
  backgroundColor: oreng,
}}
selectedValue={finelText}
onValueChange={(itemValue) => setFinelText(itemValue)}
>
  {
     newDataB.records  ? newDataB.records.map((e,i)=>{return <Picker.Item label={e.shmmitzrach} value={e.shmmitzrach} key={i} />}) : null 
  }

</Picker>



</View>


<View style={{flexDirection:'row',marginTop:30}}>


<Picker
  style={{
    marginRight:14,
    marginTop:10,
  width: '35%',
  backgroundColor: oreng,
}}
selectedValue={quantityA}
onValueChange={(itemValue) => setQuantityA(itemValue)}
>
{quantities.map((quantity,index) => (
                <Picker.Item label={`${quantity} ??????`} value={quantity} key={index} />
            ))}

</Picker>
<Picker
  style={{
    marginTop:10,
  width: '35%',
  backgroundColor: oreng,
}}
selectedValue={quantityB}
onValueChange={(itemValue) => setQuantityB(itemValue)}
>
{quantities.map((quantity,index) => (
                <Picker.Item label={`${quantity} ??????`} value={quantity} key={index} />
            ))}

</Picker>
</View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:50}}>
  <Button  title='??????????' color='#0a2946' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>
  </View>

  )
}
const styles = StyleSheet.create({
    container: {
    
        alignItems:'center',
      height:'100%',
      width:'100%',
    
    },
    viewContainer: {
      zIndex:999,
      borderTopLeftRadius: 10,
     borderTopRightRadius: 10,
     backgroundColor:'white',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 25,
   
      borderColor:oreng,
      alignItems:'center',
    height:'100%',
    width:'90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:'#FFffff'
    
  
  },
    text: {
      marginTop:20,
       fontSize: 36,
    },
    icons:{
      flexDirection:'row',
      width:"100%",
      alignItems:'center',
      justifyContent:'center',
      justifyContent:'space-evenly',
marginTop:15,
    },
    slider:{
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      height: 35,
      flexDirection:'row',
      width:"100%",
    },
    button:{
      marginTop:38,
        width:'60%',
      
    },
    resBmi: {
      marginTop:30,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,   
    },
    graphResults:{

      height:50,
      width:100,
      alignItems:'center',
  
    },
 
   
  })
  
