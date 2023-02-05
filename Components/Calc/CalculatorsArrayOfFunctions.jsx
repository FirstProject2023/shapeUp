import { StyleSheet, Text, View,useWindowDimensions, TextInput, Button,Modal,TouchableHighlight,Alert  } from 'react-native'
import React, {  useState, useContext,useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import {oreng } from "../Globals/colors";



export default function CalculatorsArrayOfFunctions({num,heightOfResView,setHeightOfResView,
  bmiSearchResult,setBmiSearchResult,setWhatCalcIs,fatValue,setFatValue,carbohydratesValue,
  setCarbohydratesValue,proteinValue,setProteinValue,finelText,setFinelText,caloriesValue,setCaloriesValue,
  calorValueA,calorValueB,setCalorValueA,setCalorValueB,setMoreCalory
}) {
  
  
  let arrOfFunctions = [
    ProteinIntake(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
      ,fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,setProteinValue,
      finelText,setFinelText,caloriesValue,setCaloriesValue),
    Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs),
     BMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs),
     SavingStatus(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs),
       WhatIsFatter( finelText,setFinelText,calorValueA,calorValueB,setCalorValueA,setCalorValueB,
        setHeightOfResView,setWhatCalcIs,setMoreCalory)];
  
  return (
    arrOfFunctions[num]
    )
  }

function Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs) {

  const {width} = useWindowDimensions();
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
 
 
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


  setBmiSearchResult(weightValue/((heightValue*0.01)*(heightValue*0.01)));
  setWhatCalcIs(1);
  setHeightOfResView(420);
}
  }
  
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>Bmi</Text>

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
    <Text >{(heightValue * 0.01).toFixed(2)}</Text>
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
    <Text >{weightValue.toFixed(0)}</Text>
    </View>
  </View>
  
  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50,marginTop:50}}>
  <Button  title='result' color={oreng} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>
  </View>

  )
}
function ProteinIntake(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult ,setWhatCalcIs
    , fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,
    setProteinValue,finelText,setFinelText,caloriesValue,setCaloriesValue ) {
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
  console.log("ssssss");

    setFinelText(text);
    setFlagToGetFinelRes(1);
  
}


  function Res()
  {

    if(!text)
    {
      
      Alert.alert(
        'Erro',
        'Mast to type food ',
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
  setProteinValue(data.records[0].protein * (quantity/100));
  setFatValue(data.records[0].total_fat * (quantity/100));
  setCarbohydratesValue(data.records[0].carbohydrates * (quantity/100) );

    setCaloriesValue(((data.records[0].total_fat * (quantity/100)) * 9)+((data.records[0].carbohydrates * (quantity/100)) * 4 )
    +((data.records[0].protein * (quantity/100)) * 4));

    if(flagToGetFinelRes==1)
    {
      setWhatCalcIs(0);
      setHeightOfResView(420);
    }
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

      <Text style={{marginTop:33}}>Please type the product name</Text>

      <View style={{flexDirection:'row'}}>
<TextInput placeholder=' Enter here ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'70%',marginTop:10}}
onChangeText={text => setText(text)}
value={text}
></TextInput>
<View style={{height:35,marginTop:10,marginLeft:4}}>
  <Button  title='Search' color='#0a2946' onPress={ChangeText} style={{height:'100%'}}/> 
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

<Text style={{marginTop:19}}>Please choose the amount in grams</Text>
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

function BMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs) {


  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [selectedAgeValue, setSelectedAgeValue] = useState('');
 

 

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
          setBmiSearchResult((88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue)));    
        }
        if(!womanIsFocused)
        {
          setBmiSearchResult((447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)));    
        }
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
    <Text >{(heightValue * 0.01).toFixed(2)}</Text>
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
    <Text>{weightValue.toFixed(0)}</Text>
    </View>
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color={oreng} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}

function SavingStatus(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult,setWhatCalcIs,  ) {
  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);
  const [selectedAgeValue, setSelectedAgeValue] = useState(0);
  const [activValue,setActivValue] = useState(0);
  const [valueToMult,setValueToMult]=useState(0);
  
 
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
          setBmiSearchResult((  (88.36) + ( (13.39 * weightValue)+(4.7* heightValue)-(5.6 * selectedAgeValue)) ) * valueToMult );
          
        }
        if(!womanIsFocused)
        {
          setBmiSearchResult( ( (447.593) + ( (9.25 * weightValue)+(3* heightValue)-(4.3 * selectedAgeValue)) * valueToMult ));    
        }
        
        setWhatCalcIs(3);
        setHeightOfResView(400);
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
    <Text >{(heightValue * 0.01).toFixed(2)}</Text>
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
    <View style={{height:'100%'}}>
    <Text>{weightValue.toFixed(0)}</Text>
    </View>
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color={oreng} onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}
function WhatIsFatter(finelText,setFinelText,calorValueA,calorValueB,setCalorValueA,setCalorValueB,setHeightOfResView,setWhatCalcIs,setMoreCalory) {
  const {width} = useWindowDimensions();
  const [data, setData] = useState([""]);
  
  const [newDataA, setNewDataA] = useState([""]);
  const [newDataB, setNewDataB] =useState([""]);

  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const [quantityA,setQuantityA]=useState('');
  const [quantityB,setQuantityB]=useState('');
  const[finelA,setFinelA]=useState('מים');
  const[finelB,setFinelB]=useState('מים');

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
              'Erro',
              'Mast to type food ',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          }
         else if(!textB)
          {
            
            Alert.alert(
              'Erro',
              'Mast to type food ',
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

             
             
          setCalorValueA(((newDataA.records[0].total_fat * (quantityA/100)) * 9)+((newDataA.records[0].carbohydrates
            * (quantityA/100)) * 4 )
         +((newDataA.records[0].protein * (quantityA/100)) * 4));
         setCalorValueB(((newDataB.records[0].total_fat * (quantityB/100)) * 9)+((newDataB.records[0].carbohydrates
           * (quantityB/100)) * 4 )
           +((newDataB.records[0].protein * (quantityB/100)) * 4));
          
   
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

      <View style={{flexDirection:'row',marginTop:20}}>

<View style={{width:'50%'}}>
  <Text style={{fontSize:25,color:oreng}} > food A</Text>
</View>

<View style={{width:'50%',marginRight:100}}>
  <Text style={{fontSize:25,color:oreng}}>food B</Text>
</View>

        </View>
 
<View style={{flexDirection:'row'}}>

<TextInput placeholder=' Enter here ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'20%',marginTop:10,marginLeft:5}}
onChangeText={textA => setTextA(textA)}
value={textA}
></TextInput>

<View style={{height:35,marginTop:10,marginLeft:4,marginRight:6}}>
  <Button  title='Search' color='#0a2946' onPress={ChangeTextA} style={{height:'100%'}}/> 
</View>

      <TextInput placeholder=' Enter here ...' 
style={{backgroundColor:'#fff',borderColor:'black',borderWidth:1,width:'20%',marginTop:10}}
onChangeText={textB => setTextB(textB)}
value={textB}
></TextInput>

<View style={{height:35,marginTop:10,marginLeft:4}}>
  <Button  title='Search' color='#0a2946' onPress={ChangeTextB} style={{height:'100%'}}/> 
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
                <Picker.Item label={`${quantity} g`} value={quantity} key={index} />
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
                <Picker.Item label={`${quantity} g`} value={quantity} key={index} />
            ))}

</Picker>
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
const styles = StyleSheet.create({
    container: {

        alignItems:'center',
      height:'100%',
      width:'100%',
    
    },
    viewContainer: {
      borderWidth:4,
      borderColor:oreng,
    
      alignItems:'center',
    height:'100%',
    width:'90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  
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
marginTop:20,
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
      marginTop:8,
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
  
