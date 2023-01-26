import { StyleSheet, Text, View, FlatList, Button ,TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import CalculatorsArrayOfFunctions from './CalculatorsArrayOfFunctions'
import { FontAwesome5 } from '@expo/vector-icons';


export default function Calc() {
  const [numbers,setNumbers] = useState([0, 1, 2, 3, 4]);
  const[heightOfResView,setHeightOfResView] = useState(0);
  const [bmiSearchResult,setBmiSearchResult] = useState(0);

  return (

<ScrollView>

<View style={{height:1000}}>

<View style={styles.container}>

  <View style={styles.FlatListContainer}>

<FlatList data={numbers} renderItem={({item}) =>  <CalculatorsArrayOfFunctions num={item} heightOfResView={heightOfResView} setHeightOfResView={setHeightOfResView} bmiSearchResult={bmiSearchResult} setBmiSearchResult={setBmiSearchResult}   />}
      horizontal 
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces= {false}
      />
  
    </View>
  
 

     
    <View style={{height:heightOfResView,width:'90%',backgroundColor:'#9fc5e8',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}>
    
       <Text  style={{fontSize:25,textAlign:'center',marginTop:18}}>Your BMI is:</Text>
       
       <View style={{flexDirection:'row',marginTop:20,marginStart:15 ,marginBottom:10}}>


         <Text>bad!</Text>
<View>
{   bmiSearchResult < 250 & bmiSearchResult > 150 &heightOfResView !=0   ?  <FontAwesome5 name="hand-point-down" size={24} color="black" style={{height:24}} /> : <View style={{height:24}} />}
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
<Text>good!</Text>


         </View> 

    
   <View style={styles.resBmi}>
        <Text style={{fontSize:40}}> {bmiSearchResult ? bmiSearchResult.toFixed(1) : null}</Text>
   </View>
      
   <TouchableOpacity style={{height: 50, width:'50%' ,marginStart:80 }}>
       { heightOfResView !=0 ? <Button title='back' onPress={()=>setHeightOfResView(0)}  /> : null}
   </TouchableOpacity>

       </View>
      

{/* AAAAAAAAAA */}
  
     
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

})


