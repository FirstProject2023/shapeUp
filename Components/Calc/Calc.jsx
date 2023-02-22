import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity,ScrollView,Modal  } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import CalculatorsArrayOfFunctions from './CalculatorsArrayOfFunctions'
import { FontAwesome5 } from '@expo/vector-icons';
import { blue, oreng } from '../Globals/colors';


export default function Calc() {

  const [isModalVisible, setIsModalVisible] = useState(false);
const [isEnglish,setIsEnglish]= useState(1);


  //ebrow 
  const[heightOfResView,setHeightOfResView] = useState(0);
  const [bmiSearchResult,setBmiSearchResult] = useState(0);
  const[whatCalcIs,setWhatCalcIs]=useState(0);
  const [finelText, setFinelText] = useState('');
  const [finelTextB, setFinelTextB] = useState('');
  const [fatValue, setFatValue] = useState(0);
  const [carbohydratesValue,setCarbohydratesValue] = useState(0);
  const [proteinValue,setProteinValue] = useState(0);
  const [caloriesValue,setCaloriesValue]= useState(-1);

  const [calorValueA,setCalorValueA]= useState(0);
  const [calorValueB,setCalorValueB]= useState(0);
  const[moreCalory,setMoreCalory]= useState(0);
  const[isMan,setIsMan]=useState(1);


  


  const handleModalOpen = () => {
    setIsModalVisible(true);
  };
  
  const handleModalChange1 = () => {
    setIsEnglish(1);
    setIsModalVisible(false);
  };
  const handleModalChange2 = () => {
    setIsEnglish(0);
    setIsModalVisible(false);
  };

const[showSubjects,setShowSubjects] = useState();
  const [numbers,setNumbers] = useState([0, 1, 2, 3, 4]);



  let arrOfClalcName=["Bmi","ProteinIntake","BMR","SavingStatus","WhatIsFatter"];

  const scrollViewRef = useRef();

  const handleButtonClick = () => {
    
    scrollViewRef.current.scrollToEnd({ animated: true });
   
  };
  const handleScrollToTop = () => {
  
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  let arrOfFunctions = [
    ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,
      fatValue,carbohydratesValue,proteinValue,finelText,caloriesValue),
    BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop),
    BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView,isMan),
    SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView),
    WhatIsFatterRes(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,moreCalory,finelText,finelTextB),
    ProteinIntakeResEb(heightOfResView,bmiSearchResult,setHeightOfResView,
      fatValue,carbohydratesValue,proteinValue,finelText,caloriesValue),
    BmiResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop),
    BmrResEb(heightOfResView,bmiSearchResult,setHeightOfResView,isMan),
    SavingStatusResEb(heightOfResView,bmiSearchResult,setHeightOfResView),
    WhatIsFatterResEb(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,moreCalory,finelText,finelTextB)
  ];


  return (

<ScrollView ref={scrollViewRef}>

<View style={{height:1000}}>



<View style={styles.container}>


      <TouchableOpacity style={styles.buttonTosearch} onPress={handleModalOpen}>
        
        {isEnglish ? <Text style={styles.buttonText}>Select Language</Text> 
        :
        <Text style={styles.buttonText}>בחר שפה</Text>
        }
        
      </TouchableOpacity>
      <Modal visible={isModalVisible} >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Please select a language:</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalChange1}>
            <Text style={styles.modalButtonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalChange2}>
            <Text style={styles.modalButtonText}>Hebrew</Text>
          </TouchableOpacity>
        </View>
      </Modal>
   

{
  isEnglish ?
  <View style={styles.FlatListContainer}>

<FlatList data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} 
heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} setIsMan={setIsMan}
setBmiSearchResult={setBmiSearchResult} setWhatCalcIs={setWhatCalcIs} fatValue={fatValue} setFatValue={setFatValue}
 carbohydratesValue={carbohydratesValue} setCarbohydratesValue={setCarbohydratesValue}
  proteinValue={proteinValue} setProteinValue={setProteinValue} finelText={finelText} setFinelText={setFinelText} setFinelTextB={setFinelTextB}
  caloriesValue={caloriesValue} setCaloriesValue={setCaloriesValue} calorValueA={calorValueA}
   setCalorValueA={setCalorValueA} calorValueB={calorValueB}  setCalorValueB={setCalorValueB} setMoreCalory={setMoreCalory} 
   handleButtonClick={handleButtonClick} isEnglish={isEnglish}
   />}
      horizontal 
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces= {false}
       
      />
  
    </View>
   
 :
 
  <View style={styles.FlatListContainer}>

<FlatList data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} 
heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} setIsMan={setIsMan}
setBmiSearchResult={setBmiSearchResult} setWhatCalcIs={setWhatCalcIs} fatValue={fatValue} setFatValue={setFatValue}
 carbohydratesValue={carbohydratesValue} setCarbohydratesValue={setCarbohydratesValue}
  proteinValue={proteinValue} setProteinValue={setProteinValue} finelText={finelText} setFinelText={setFinelText}
  caloriesValue={caloriesValue} setCaloriesValue={setCaloriesValue} calorValueA={calorValueA}
   setCalorValueA={setCalorValueA} calorValueB={calorValueB}  setCalorValueB={setCalorValueB} setMoreCalory={setMoreCalory} 
   handleButtonClick={handleButtonClick}
   />}
   horizontal 
   showsHorizontalScrollIndicator
   pagingEnabled
   bounces= {false}
   
   />
  
    </View>
   
}
  {
   arrOfFunctions[whatCalcIs]
   }
     
      </View>
     
      </View>
        
</ScrollView>
    
  )
}

const styles = StyleSheet.create({

  buttonTosearch: {
    marginTop:10,
    backgroundColor: oreng,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: '#FFFFdf',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color:blue,
    fontSize: 24,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor:oreng,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },


  container: {
    alignItems:'center',
    height:'100%',
    backgroundColor: 'white',
  },
  FlatListContainer:{
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor:'white',
   shadowColor: 'black',
   shadowOpacity: 0.8,
   shadowRadius: 2,
   
   elevation: 25,

    marginTop:30,
    height:'50%',
    width:'100%',
   
    borderRadius:14,
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
    padding: 10,
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
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderColor:'#d89b5c'
    ,borderWidth:2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winCircle: {
    width: 120,
    height: 120,
    borderColor: blue
    ,borderWidth:4,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

})


function BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{
let message="";

if(bmiSearchResult > 30)
{
  message="This individual's Body Mass Index is significantly above the normal range, suggesting they are at a high risk for obesity-related health problems."; 
}else if(bmiSearchResult < 30 && bmiSearchResult > 25)
{
 
  message="The person's Body Mass Index is above the normal range, indicating they may be at an increased risk for health problems related to being overweight.";
}
 else if(bmiSearchResult < 24.9 && bmiSearchResult > 18.5)
{
  console.log("lll");
  message="This person's Body Mass Index falls within the normal weight range, indicating a generally healthy weight.";
}
else{
  console.log("asd");
  message="This individual's Body Mass Index is below the normal range, suggesting they may be underweight."
}

function toBack()
{

  handleScrollToTop();
 setHeightOfResView(0);
}

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10 }}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMI is:</Text>
    
    <View style={{flexDirection:'row', marginTop:20, marginStart:37, marginBottom:10, alignItems: 'center'}}>
  <View style={{alignItems:'center'}}>
    {  bmiSearchResult > 30 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#F44336" /> : 
      null
    }
    <View style={{
      height: 50,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#F44336',
      borderRadius: 5,
      marginTop: 10,
    }} />
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 30 && bmiSearchResult > 25 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#FF5733" /> : 
      null
    }
    <View style={{
      height: 50,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#FF5733',
      borderRadius: 5,
      marginTop: 10,
    }} />
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 24.9 && bmiSearchResult > 18.5 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#4CAF50" /> : 
      null
    }
    <View style={{
      height: 50,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      marginTop: 10,
    }} />
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 18 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#8BC34A" /> : 
      null
    }
    <View style={{
      height: 50,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#8BC34A',
      borderRadius: 5,
      marginTop: 10,
    }} />
  </View>
</View>

  <View>
    <Text style={{fontSize:15,}}>{message ? message : null}</Text>
  </View>
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

    </View>

    )
    
}
function ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,fatValue,carbohydratesValue
  ,proteinValue,finelText,caloriesValue)
{
  return(
    <View style={{height: heightOfResView ,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none' }}>
    
    <View style={{flexDirection:'row'}}>

    <Text  style={{fontSize:15,textAlign:'center',marginTop:18,color:'#0a2946',width:'40%',height:40,
     borderColor:'#d89b5c',borderWidth:2,marginLeft:30,borderRadius:15}}>{finelText}</Text>
 
      <Text  style={{fontSize:40,textAlign:'center',marginTop:38,color:'#0a2946',width:'55%'}}>calories{"\n"} {caloriesValue.toFixed(0)}</Text>
    
     </View>
    

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={{color:'#0a2946',fontSize:30}}>fat</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{fatValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:12}}>carbohydrates</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{carbohydratesValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>

      </View>
      <TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>proteins</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{proteinValue.toFixed(1)}</Text>
        </View>
      </View>
      </TouchableOpacity>




  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='back' color={'#d89b5c'} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>

  
    </View>

  )

}
function BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView,isMan)
{

 /*  const[massege,setMassege]=useState("nk"); */

  let massege;
   if(isMan)
  {
     if( bmiSearchResult>1800 && bmiSearchResult<2400 )
    {
      massege="Great job, maintaining an average BMR is a sign of a balanced and healthy diet.";
    }
    else if( bmiSearchResult <1800)
    {
      massege="You may want to consider talking to a healthcare professional and reviewing your diet and activity levels to ensure you are meeting your daily energy needs.";
    }
    else{
      massege=`It's great that you have a high metabolism, however, consuming an average of ${bmiSearchResult.toFixed(0)} calories per day is quite high and may result in unwanted weight gain.`;
    }
  
  } 

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMR is:</Text>
    
   

  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   <View style={{width:'80%',alignItems:'center',justifyContent:'center',marginLeft:30}}>
  <Text style={{fontSize:15}}>{massege}</Text>
   </View>

  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:30 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
 
  
    </View>

    )
    
}
function SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView)
{
  return(
    bmiSearchResult ? 
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>the calory to stay :</Text>
    
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
  
    </View>
    : null

    )
    
}
function WhatIsFatterRes(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,moreCalory,finelText,finelTextB)
{

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none'}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>The food and weight you chose to contain more calories:</Text>

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
        <Text style={{color:'#0a2946',fontSize:20}}>{finelTextB}</Text>
          <Text style={{color:'#d89b5c',fontSize:20}}>{calorValueA.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>{finelText}</Text>
          <Text style={{color:'#d89b5c',fontSize:20}}>{calorValueB.toFixed(1)} 
      
           </Text>
        </View>
      </View>
</TouchableOpacity>
</View>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
        
          <Text style={{color:'#0a2946',fontSize:30,textShadowOffset: { width: 2, height: 2 },
             textShadowColor: '#d89b5c',
               textShadowRadius: 5}}>win</Text>
          <Text style={{color:'#0a2946',fontSize:20}}>{finelTextB}</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA>calorValueB ? calorValueA.toFixed(1) : calorValueB.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>




  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='back' color={oreng} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>

  {/* <View style={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10
    }}/> */}
  
    </View>

    )
    
}

function BmiResEb(heightOfResView,bmiSearchResult,setHeightOfResView,handleScrollToTop)
{
let message="";

if(bmiSearchResult > 30)
{
  message="מדד מסת הגוף של אדם זה נמצא משמעותית מעל הטווח הנורמלי, מה שמצביע על כך שהם נמצאים בסיכון גבוה לבעיות בריאות הקשורות להשמנה."; 
}else if(bmiSearchResult < 30 && bmiSearchResult > 25)
{
 
  message="מדד מסת הגוף של האדם הוא מעל הטווח הנורמלי, מה שמצביע על כך שהוא עלול להיות בסיכון מוגבר לבעיות בריאות הקשורות לעודף משקל.";
}
 else if(bmiSearchResult < 24.9 && bmiSearchResult > 18.5)
{
  console.log("lll");
  message="מדד מסת הגוף של אדם זה נופל בטווח המשקל התקין, מה שמצביע על משקל בריא בדרך כלל.";
}
else{
  message="מדד מסת הגוף של אדם זה נמצא מתחת לטווח הנורמלי, מה שמצביע על כך שהוא עלול להיות בתת משקל."
}

function toBack()
{

  handleScrollToTop();
 setHeightOfResView(0);
}

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10 }}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>התוצאה שלך:</Text>
    
    <View style={{flexDirection:'row', marginTop:20, marginStart:37, marginBottom:10, alignItems: 'center'}}>
  <View style={{alignItems:'center'}}>
    {  bmiSearchResult > 30 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#F44336" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#F44336',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >
      {bmiSearchResult > 30 ? 
        <Text style={{color:'white'}}>אתה שמן</Text>
         : null}
    </View>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 30 && bmiSearchResult > 25 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#FF5733" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#FF5733',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} > 
    {bmiSearchResult < 30 ? 
        <Text style={{color:'white'}}>לא משו</Text>
         : null}
    </View>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 24.9 && bmiSearchResult > 18.5 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#4CAF50" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#4CAF50',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }} >
{bmiSearchResult < 24.9 ? 
        <Text style={{color:'white'}}>טוב מאד!</Text>
         : null}
    </View>
  </View>
  <View style={{alignItems:'center'}}>
    { bmiSearchResult < 18 && heightOfResView != 0 ? 
      <FontAwesome5 name="hand-point-down" size={24} color="#8BC34A" /> : 
      null
    }
    <View style={{
      height: 30,
      width: heightOfResView != 0 ? 60 : 0,
      backgroundColor: '#8BC34A',
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      justifyContent:'center'
    }}
    >
      {bmiSearchResult < 18 ? 
        <Text style={{color:'white'}}>תת משקל</Text>
         : null}
    
    </View>
  </View>
</View>

  <View>
    <Text style={{fontSize:15,}}>{message ? message : null}</Text>
  </View>
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={toBack}  /> : null}
  </TouchableOpacity>

    </View>

    )
    
}
function ProteinIntakeResEb(heightOfResView,bmiSearchResult,setHeightOfResView,fatValue,carbohydratesValue
  ,proteinValue,finelText,caloriesValue)
{
  return(
    <View style={{height: heightOfResView ,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none' }}>
    
    <View style={{flexDirection:'row',width:'100%'}}>

<View style={{width:'45%',height:'100%', marginTop:28}}>
    <Text  style={{fontSize:15,textAlign:'center',color:'#0a2946',
     borderColor:'#d89b5c',borderWidth:2,marginLeft:30,borderRadius:15,justifyContent:'center'}}>{finelText}</Text>
     </View>
     <View style={{width:'100%'}}>
      <Text  style={{fontSize:40,textAlign:'center',marginTop:28,color:'#0a2946',width:'55%'}}>קלוריות{"\n"} {caloriesValue.toFixed(0)}</Text>
     </View>
    
     </View>
    

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={{color:'#0a2946',fontSize:20}}>שומנים</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{fatValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:12}}>פחמימות</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{carbohydratesValue.toFixed(1)}</Text>
        </View>
      </View>
</TouchableOpacity>

      </View>
      <TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
        <Text style={{color:'#0a2946',fontSize:20}}>חלבונים</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{proteinValue.toFixed(1)}</Text>
        </View>
      </View>
      </TouchableOpacity>




  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={'#d89b5c'} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>

  
    </View>

  )

}
function BmrResEb(heightOfResView,bmiSearchResult,setHeightOfResView,isMan)
{

 /*  const[massege,setMassege]=useState("nk"); */

  let massege;
   if(isMan)
  {
     if( bmiSearchResult>1800 && bmiSearchResult<2400 )
    {
      massege="Great job, maintaining an average BMR is a sign of a balanced and healthy diet.";
    }
    else if( bmiSearchResult <1800)
    {
      massege="You may want to consider talking to a healthcare professional and reviewing your diet and activity levels to ensure you are meeting your daily energy needs.";
    }
    else{
      massege=`It's great that you have a high metabolism, however, consuming an average of ${bmiSearchResult.toFixed(0)} calories per day is quite high and may result in unwanted weight gain.`;
    }
  
  } 

  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    <View style={{textAlign:'center', width:'100%',alignItems:'center',justifyContent:'center' }}>
    <Text  style={{fontSize:13,textAlign:'center',marginTop:18,width:'80%'}}>מחשבון BMR (Basal Metabolic Rate) הוא כלי שמעריך את מספר הקלוריות שגופך שורף במנוחה כדי לשמור על תפקודי גוף בסיסיים כמו נשימה, זרימת דם ושמירה על טמפרטורת הגוף. המחשבון לוקח בחשבון גורמים כמו גיל, מין, גובה, משקל והרכב הגוף כדי להעריך את ה-BMR.</Text>
    </View>
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>התוצאה שלך:</Text>
    
   

  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40,
      fontWeight: 'bold',
      color:oreng,
      textShadowOffset: { width: 2, height: 2 },
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowRadius: 4,
      textAlign: 'center',
      textShadowOpacity: 0.8,
      backgroundColor: 'transparent',
      paddingVertical: 8,}}>

       {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
  
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:30 }}>
    { heightOfResView !=0 ? <Button title='back' color={blue} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
 
  
    </View>

    )
    
}
function SavingStatusResEb(heightOfResView,bmiSearchResult,setHeightOfResView)
{
  return(
    bmiSearchResult ? 
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <View style={{width:'100%',alignItems:'center'}}>
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18,width:'70%'}}>מספר הקלוריות היומי לשמירת המשקל:</Text>
    </View>
    
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={blue} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
  
    </View>
    : null

    )
    
}
function WhatIsFatterResEb(heightOfResView,bmiSearchResult,setHeightOfResView,calorValueA,calorValueB,moreCalory,finelText,finelTextB)
{


  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none'}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>המאכל המשמין יותר:</Text>

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>

          <Text style={{color:'#0a2946',fontSize:20}}>מאכל א'</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA.toFixed(2)}</Text>
        </View>
      </View>
</TouchableOpacity>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
        
          <Text style={{color:'#0a2946',fontSize:20}}>מאכל ב'</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueB.toFixed(2)}</Text>
        </View>
      </View>
</TouchableOpacity>
</View>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.winCircle}>
          <Text style={{color:'#0a2946',fontSize:30,textShadowOffset: { width: 2, height: 2 },
             textShadowColor: '#d89b5c',
               textShadowRadius: 5}}>המנצח</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{calorValueA>calorValueB ? calorValueA : calorValueB}</Text>
        </View>
      </View>
</TouchableOpacity>




  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80,marginTop:20 }}>
    { heightOfResView !=0 ? <Button title='חזרה' color={oreng} onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>

  {/* <View style={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10
    }}/> */}
  
    </View>

    )
    
}