import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import CalculatorsArrayOfFunctions from './CalculatorsArrayOfFunctions'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export default function Calc() {
  const [numbers,setNumbers] = useState([0, 1, 2, 3, 4]);
  const[heightOfResView,setHeightOfResView] = useState(0);
  const [bmiSearchResult,setBmiSearchResult] = useState(0);
  const[whatCalcIs,setWhatCalcIs]=useState(0);
  const [finelText, setFinelText] = useState("מים");
  const [fatValue, setFatValue] = useState(0);
  const [carbohydratesValue,setCarbohydratesValue] = useState(0);
  const [proteinValue,setProteinValue] = useState(0);
  const [caloriesValue,setCaloriesValue]= useState(0);


  let arrOfFunctions = [BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView),
    ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,
      fatValue,carbohydratesValue,proteinValue,finelText,caloriesValue),
    BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView),
    SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView)];

  return (

<ScrollView>

<View style={{height:1000}}>

<View style={styles.container}>

  <View style={styles.FlatListContainer}>

  {/* ,fatValue,setFatValue,carbohydratesValue,setCarbohydratesValue,proteinValue,setProteinValue */}

<FlatList data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} 
heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} 
setBmiSearchResult={setBmiSearchResult} setWhatCalcIs={setWhatCalcIs} fatValue={fatValue} setFatValue={setFatValue}
 carbohydratesValue={carbohydratesValue} setCarbohydratesValue={setCarbohydratesValue}
  proteinValue={proteinValue} setProteinValue={setProteinValue} finelText={finelText} setFinelText={setFinelText}
  caloriesValue={caloriesValue} setCaloriesValue={setCaloriesValue}
   />}
      horizontal 
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces= {false}
      />
  
    </View>
  
   {
   arrOfFunctions[whatCalcIs]
   }
     
      </View>
    
      </View>
        
</ScrollView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    height:'100%',
    backgroundColor: 'white',
  },
  FlatListContainer:{
    marginTop:50,
    height:'50%',
    width:'100%',
    backgroundColor: 'white',
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

})


function BmiRes(heightOfResView,bmiSearchResult,setHeightOfResView)
{
  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10 }}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMI is:</Text>
    
    <View style={{flexDirection:'row',marginTop:20,marginStart:15 ,marginBottom:10}}>
  
  
      <Text>bad!</Text>
  {/* aaa */}

  <View>
  {      (bmiSearchResult < 250 & bmiSearchResult > 150 &heightOfResView !=0)  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'red', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  { bmiSearchResult<150 & bmiSearchResult>100 &  heightOfResView !=0   ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#DC143C', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<100 & bmiSearchResult>50 & heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#32CD32', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<50 &  heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{ height:50, alignItems:'center',backgroundColor:'#7FFF00', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>

{/* aaa */}


  <Text>good!</Text>
  
  
      </View> 
  
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='back' onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
  
    </View>

    )
    
}
function ProteinIntakeRes(heightOfResView,bmiSearchResult,setHeightOfResView,fatValue,carbohydratesValue
  ,proteinValue,finelText,caloriesValue)
{
  return(
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10, display: heightOfResView>0 ? null : 'none' }}>
    
    <View style={{flexDirection:'row'}}>

    <Text  style={{fontSize:15,textAlign:'center',marginTop:18,color:'#0a2946',width:'40%',height:40,
     borderColor:'#d89b5c',borderWidth:2,marginLeft:30,borderRadius:15}}>{finelText}</Text>
 
      <Text  style={{fontSize:40,textAlign:'center',marginTop:38,color:'#0a2946',width:'55%'}}>calories{"\n"} {caloriesValue}</Text>
    
     </View>
    

<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
<TouchableOpacity>
    <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={{color:'#0a2946',fontSize:30}}>fat</Text>
          <Text style={{color:'#d89b5c',fontSize:15}}>{fatValue.toFixed(2)}</Text>
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
function BmrRes(heightOfResView,bmiSearchResult,setHeightOfResView)
{
  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMR is:</Text>
    
    <View style={{flexDirection:'row',marginTop:20,marginStart:15 ,marginBottom:10}}>
  
  
      <Text>bad!</Text>
  {/* aaa */}

  <View>
  {      (bmiSearchResult < 250 & bmiSearchResult > 150 &heightOfResView !=0)  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'red', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  { bmiSearchResult<150 & bmiSearchResult>100 &  heightOfResView !=0   ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#DC143C', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<100 & bmiSearchResult>50 & heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#32CD32', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<50 &  heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{ height:50, alignItems:'center',backgroundColor:'#7FFF00', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>

{/* aaa */}


  <Text>good!</Text>
  
  
      </View> 
  
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='back' onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
  
    </View>

    )
    
}
function SavingStatusRes(heightOfResView,bmiSearchResult,setHeightOfResView)
{
  return(
    
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#fff',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
    <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>the calory to stay :</Text>
    
    <View style={{flexDirection:'row',marginTop:20,marginStart:15 ,marginBottom:10}}>
  
  
      <Text>bad!</Text>
  {/* aaa */}

  <View>
  {      (bmiSearchResult < 250 & bmiSearchResult > 150 &heightOfResView !=0)  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'red', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  { bmiSearchResult<150 & bmiSearchResult>100 &  heightOfResView !=0   ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#DC143C', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<100 & bmiSearchResult>50 & heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{height:50,  alignItems:'center',backgroundColor:'#32CD32', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>
  <View>
  {  bmiSearchResult<50 &  heightOfResView !=0  ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
  <View style={{ height:50, alignItems:'center',backgroundColor:'#7FFF00', width: heightOfResView !=0 ? 60 : 0 }}></View>
  </View>

{/* aaa */}


  <Text>good!</Text>
  
  
      </View> 
  
  
  <View style={styles.resBmi}>
     <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
  </View>
   
  <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
    { heightOfResView !=0 ? <Button title='back' onPress={()=>setHeightOfResView(0)}  /> : null}
  </TouchableOpacity>
  
    </View>

    )
    
}