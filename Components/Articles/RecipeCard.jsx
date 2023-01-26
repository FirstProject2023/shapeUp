import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function RecipeCard({route, navigation}) {
  const {recipe} = route.params;
  console.log(recipe);
  return (
    <View style={styles.recipeContainer}>
      <Text style={{fontSize: 20, color: '#fff'}}>{recipe.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  recipeContainer:{
    height: '100%',
    width: '100%',
    backgroundColor: 'orange',
    // alignItems: 'center',
    // justifyContent: 'center',


},
})