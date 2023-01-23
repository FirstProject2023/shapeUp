import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function SubjectList() {
  const [recipesSubApi, setRecipesSubApi] = useState([])
  
  function ArticlesSubList(){
    let articlesSubArray = ["fitness","diet","health", "Mental"];

    <View></View>
  }
  
  function RecipesSubList(){
    useEffect(()=>{
      fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setRecipesSubApi(data)
      })
      
      // console.log("🚀 ~ file: SubjectList.jsx:6 ~ SubjectList ~ recipesSubApi", recipesSubApi.meals)
    },[]);

    <View></View>
    
  }
  return (
    <View>
      {RecipesSubList()}
    </View>
  )
}

const styles = StyleSheet.create({})