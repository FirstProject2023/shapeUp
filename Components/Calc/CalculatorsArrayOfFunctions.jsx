import { StyleSheet, Text, View,useWindowDimensions, TextInput, Button,Modal,TouchableHighlight,Alert  } from 'react-native'
import React, {  useState, useContext,useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
import { FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';


export default function CalculatorsArrayOfFunctions({num,heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult}) {
  
  const {width} = useWindowDimensions();
  
  let arrOfFunctions = [Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult),ProteinIntake(), RMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult), WaterCalculator(), WhatIsFatter()];
  
  return (
    arrOfFunctions[num]
    )
  }

function Bmi(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult) {

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
        setBmiSearchResult(weightValue/((heightValue*0.01)*(heightValue*0.01)));


    setHeightOfResView(420);
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
             color={manisFocused ? 'black' : 'white'} 
        />
    </TouchableOpacity>

    <TouchableOpacity onPress={HandlePressOnWoman} >
    <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : 'white'}  />
    </TouchableOpacity>


      </View>

<Text style={{marginTop:10,color:'white', fontSize:20,}} >Height</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor="red"
    thumbTintColor="yellow"    
    />
    <Text style={styles.slideText}>{(heightValue * 0.01).toFixed(2)}</Text>
  </View>

    <Text style={{marginTop:10,color:'white', fontSize:20,}}>Weight</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor="red"
    thumbTintColor="yellow"    
    />
    <View style={{height:'100%'}}>
    <Text style={styles.slideText}>{weightValue.toFixed(0)}</Text>
    </View>
  </View>
  
  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color='blue' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>
  </View>
  </View>

  )
}
function ProteinIntake(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult) {
  const {width} = useWindowDimensions();
  const [fatValue, setFatValue] = useState(0);
  const [carbohydratesValue,setCarbohydratesValue] = useState(0);
  const [proteinValue,setProteinValue] = useState(0);
  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);

  const [data, setData] = useState([""]);
  
  useEffect(() => {
    fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          setData(data.result.records)
 
      });
  }, []);



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
    setHeightOfResView(420);
  }
  
    return(
    
      <View style={[styles.container,{ width: width}]}>

        <View style={styles.viewContainer}>
          
      <Text style={styles.text}>ProteinIntake</Text>
  

    <View style={styles.icons} >
    <TouchableOpacity onPress={HandlePressOnMan} >
        <MaterialCommunityIcons 
            name="face-man" 
            size={44} 
             color={manisFocused ? 'black' : 'white'} 
        />
    </TouchableOpacity>

    <TouchableOpacity onPress={HandlePressOnWoman} >
    <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : 'white'}  />
    </TouchableOpacity>


      </View>

  </View>
  </View>

  )
}

function RMR(heightOfResView,setHeightOfResView,bmiSearchResult,setBmiSearchResult) {
  const [fatValue, setFatValue] = useState(0);
  const [carbohydratesValue,setCarbohydratesValue] = useState(0);
  const [proteinValue,setProteinValue] = useState(0);
  const [manisFocused, setManisFocused] = useState(true);
  const [womanIsFocused, setWomanIsFocused] = useState(true);
  const [heightValue, setHeightValue] = useState(0);
  const [weightValue,setWeightValue] = useState(0);

  const [selectedValue, setSelectedValue] = useState('');

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
    console.log('d');
    setHeightOfResView(400);
  }
  

    const {width} = useWindowDimensions();
    return(
      <View style={[styles.container,{ width: width}]}>

      <View style={styles.viewContainer}>
        
    <Text style={styles.text}>RMR</Text>


  <View style={styles.icons} >
  <TouchableOpacity onPress={HandlePressOnMan} >
      <MaterialCommunityIcons 
          name="face-man" 
          size={44} 
           color={manisFocused ? 'black' : 'white'} 
      />
  </TouchableOpacity>

  <TouchableOpacity onPress={HandlePressOnWoman} >
  <MaterialCommunityIcons name="face-woman-outline" size={44} color={womanIsFocused ? 'black' : 'white'}  />
  </TouchableOpacity>
  

    </View>


<Text style={{color:'white',fontSize:20,marginTop:10}}>what your age?</Text>

<View style={{flexDirection:'row'}}>

    <Picker
  style={{
    marginLeft:40,
    marginTop:17,
  height: 10,
  width: 160,
  backgroundColor: '#ffa',
  marginBottom:20,
}}
selectedValue={selectedValue}
onValueChange={(itemValue) => setSelectedValue(itemValue)}
>
{Array.from({ length: 120 }, (_, i) => i).map(ageOption => (
          <Picker.Item key={ageOption} label={`${ageOption}`} value={ageOption} />
        ))}
</Picker>
 
<Text style={{fontSize:20,
marginLeft:20,
       textAlign:'center',
       width:50,
      borderRadius: 5,
      marginTop:27,
      height: 30,}}>{selectedValue}</Text>

</View>

<Text style={{marginTop:10,color:'white', fontSize:20,}} >Height</Text>
<View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={heightValue}
    onValueChange={(newValue) => setHeightValue(newValue)}
    minimumValue={100}
    maximumValue={300}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor="red"
    thumbTintColor="yellow"    
    />
    <Text style={styles.slideText}>{(heightValue * 0.01).toFixed(2)}</Text>
  </View>

    <Text style={{marginTop:10,color:'white', fontSize:20,}}>Weight</Text>
  <View style={styles.slider}>
    <Slider
    style={{width:250}}
    value={weightValue}
    onValueChange={(newValue) => setWeightValue(newValue)}
    minimumValue={0}
    maximumValue={250}
    minimumTrackTintColor="#0000CD"
    maximumTrackTintColor="red"
    thumbTintColor="yellow"    
    />
    <View style={{height:'100%'}}>
    <Text style={styles.slideText}>{weightValue.toFixed(0)}</Text>
    </View>
  </View>

  <View style={styles.button}   >
  <TouchableOpacity style={{height: 50}}>
  <Button  title='result' color='blue' onPress={Res} style={{height: 150}}/> 
  </TouchableOpacity>
 
  </View>

</View>
</View>
)
}
function WaterCalculator() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width }]}>
    <Text style={styles.text}>WaterCalculator</Text>
  </View>)
}
function WhatIsFatter() {
    const {width} = useWindowDimensions();
    return(
    <View style={[styles.container,{ width: width }]}>
    <Text style={styles.text}>WhatIsFatter</Text>
  </View>)
}
const styles = StyleSheet.create({
    container: {

        alignItems:'center',
      height:'100%',
      width:'100%',
    },
    viewContainer: {
      backgroundColor: '#00bfff',
      alignItems:'center',
    height:'100%',
    width:'90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  
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

    },
    slider:{
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      height: 60,
      flexDirection:'row',
      width:"100%",
    },
    slideText:{
      fontSize:20,
    textAlign:'center',
      width:50,
      borderRadius: 5,
      marginTop:15,
      height: 30,
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
  
