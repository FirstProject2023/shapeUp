import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {openBrowserAsync} from 'expo-web-browser'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';








export default function RecipeCard({route, navigation}) {
  const {recipe} = route.params;
  const [isIngredientsDetails, setIsIngredientsDetails] = useState(false);

  function ingredientIcon(item){
    // console.log(item);
    if(item.measure == "tablespoon"){   
      return <FontAwesome5 name="utensil-spoon" size={29} color="#fff" />
    }
    else if(item.measure == "teaspoon"){
      return <MaterialCommunityIcons name="silverware-spoon" size={29} color="#fff" />
    }
    else if(item.measure == "kilogram"){
      return <MaterialCommunityIcons name="weight-kilogram" size={29} color="#fff" />
    }
    else if(item.measure == "gram"){
      return <MaterialCommunityIcons name="weight-gram" size={24} color="#fff" />
    }
    else if(item.measure == "cup"){
      return <MaterialCommunityIcons name="cup" size={29} color="#fff" />
    }
    else if(item.measure == "<unit>"){
      return <FontAwesome name="lemon-o" size={29} color="#fff" />
    }
    else{
      return <MaterialCommunityIcons name="food-variant" size={29} color="#fff" />

    }

  }



  return (
    
    <View style={styles.recipeContainer}>
    <ImageBackground source={{ uri: recipe.image}}  resizeMode= 'cover'>
    <View style={styles.blackContainer}>
    <View style={{backgroundColor: 'rgba(250, 146, 40, 0.17)', width: '100%'}}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <AntDesign style={{marginTop: 5, marginRight: 5}} name="back" size={40} color="#fff" />
    </TouchableOpacity>
      <Text style={styles.title}>{recipe.label} <Text style={{fontSize: 16, marginTop: 3, color: '#fff'}}>
       {"\n"} See full recipe on: </Text> <TouchableOpacity style={{marginTop: 15}} onPress={()=> openBrowserAsync(recipe.url)}>
       <Text style={{fontSize: 16, color: '#d8911f',fontWeight: '700', textDecorationLine: 'underline'}} > {recipe.source}</Text></TouchableOpacity> 
       <Text style={{fontSize: 16, marginTop: 3, color: '#fff'}}> {"\n"} diet labels: {recipe.dietLabels.map((data, index)=> <Text key={index} style={{fontSize: 14, color: '#d8911f',fontWeight: '700'}}> {data}, </Text> )}</Text>
       {recipe.cautions != "" ? <Text style={{fontSize: 16, marginTop: 3, color: '#fff'}}> {"\n"} diet labels: { recipe.cautions.map((data, index)=> <Text key={index} style={{fontSize: 16, color: '#d8911f',fontWeight: '700'}}> {data}, </Text> )}</Text> : null}
       </Text>
    </View>
    <ScrollView>

    <View style={styles.recipeDetails}>  

    <View style={styles.totalNutrients}>


    <TouchableOpacity>
    <View style={styles.Nutrient}>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>{recipe.totalNutrients.CHOCDF.label} </Text>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>
    {recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}g
    </Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity>
    <View style={styles.Nutrient}>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>{recipe.totalNutrients.FAT.label}</Text>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>
    {recipe.totalNutrients.FAT.quantity.toFixed(2)}g
    </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity>
    <View style={styles.Nutrient}>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>{recipe.totalNutrients.ENERC_KCAL.label} </Text>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>
     {recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}
    </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity>
    <View style={styles.Nutrient}>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>{recipe.totalNutrients.SUGAR.label} </Text>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>
    {recipe.totalNutrients.SUGAR.quantity.toFixed(2)}g
    </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity>
    <View style={styles.Nutrient}>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>{recipe.totalNutrients.PROCNT.label} </Text>
    <Text style={{fontSize: 15, fontWeight: '700', color: '#d89b5c'}}>
    {recipe.totalNutrients.PROCNT.quantity.toFixed(2)}g
    </Text>
    
    </View>
    </TouchableOpacity>


    {/* <Text>Fat</Text>
    <Text>Carbs</Text>
    <Text>Sugars</Text>
    <Text>Protein</Text> */}

    </View>

      <Text style={styles.ingredientLines}>
        {
          recipe.ingredientLines.map((data, index)=>  <Text style={{color: '#fff', fontSize: 20, fontWeight: '500', padding: 10}} key={index}><Text style={{color: '#d8911f'}}>{index + 1}.</Text>    {data}{"\n\n"} </Text>)
        }
      </Text>

      <Text style={{color: '#fff', fontSize: 28, textDecorationLine: 'underline'}}>ingredients</Text>
      <View style={styles.ingredientsDetails}>
      {
        recipe.ingredients.map((item, index)=>{
          return(
            <TouchableOpacity  onPress={()=> setIsIngredientsDetails(!isIngredientsDetails)}>

            <View key={index} style={styles.ingredientsDetails2}>

          <ImageBackground  borderRadius={10} source={{uri: item.image}} resizeMode= 'cover'>
          <View style={styles.ingredientContainer}>
         { isIngredientsDetails ? <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', flexDirection : 'row'}}>
           {ingredientIcon(item)}
           <Text style={{fontSize: 30, fontWeight: '800', color: '#fff'}}>{ parseFloat(item.quantity) === item.quantity && item.quantity % 1 !== 0 ? item.quantity.toFixed(2) :  item.quantity}</Text>


          </View> : null}
          

          </View>
          </ImageBackground>
          </View>
            </TouchableOpacity>
          )
      

        })
      }


      </View>
    </View>


    </ScrollView>
    </View>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeContainer:{
    height: '100%',
    width: '100%',


},

blackContainer:{
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)',
  // alignItems: 'center',
  // justifyContent: 'center',

},

title:{
  fontSize: 30,
  fontWeight: '700',
  color: '#d89b5c',
  borderBottomWidth: 7,
  borderColor: '#a37d08',
  fontWeight: '900',
  padding: 8,
  
},

recipeDetails:{
  marginTop: 25,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  
},

totalNutrients:{
  width: '100%',
  height: 270,
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'center',
   
  },
  
  Nutrient:{
 flexDirection: 'column',
width: 95,
height: 95,
borderWidth: 3,
borderRadius: 50,
borderColor: '#d89b5c',
alignItems: 'center',
justifyContent: 'center',
padding: 10,
margin: 9,
backgroundColor: 'rgba(255,255,255,0.84)'
},
ingredientLines:{
padding: 15,
  
},

ingredientsDetails:{
  marginTop: 25,
  marginBottom: 40,

  width: '90%',
  flexDirection: 'row',
  flexWrap: 'wrap',

  justifyContent: 'center',

  
  
},

ingredientsDetails2:{
  height: 150,
  width: 150,
  borderWidth: 2,
  borderRadius: 10,
  margin: 10,
},

ingredientContainer:{

  height: 150,
  width: 150,

},
})