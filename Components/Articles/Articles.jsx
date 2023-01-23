import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions, TouchableHighlight, Image, TextInput} from 'react-native'
import React, { useState , useEffect} from 'react'

import articlesData from '../Jsons/articles.json'

export default function Articles() {
  // articles or recipes
  const [isArticles, setIsArticles] = useState(true);

  const [recipesSubApi, setRecipesSubApi] = useState([]);
  const [articlesCategory, setArticlesCategory] = useState("");

  const [recipesDataApi, setRecipesDataApi] = useState([]);
  const [freeRecipesSearch, setFreeRecipesSearch] = useState("");
  //diet
  const [dietLabelRecipes, setDietLabelRecipes] = useState(""); //chang to array
  //cuisineType
  const [cuisineTypeRecipes, setCuisineTypeRecipes] = useState("");
  //mealType
  const [mealTypeRecipes, setMealTypeRecipes] = useState("");
  //calories
  const [caloriesRangeRecipes, setCaloriesRangeRecipes] = useState("");
  
  




  dietLabelRecipes


  const articlesSubArray = ["fitness","diet","health", "Mental health"];
  
  const {width} = useWindowDimensions();




  const ArticlesDataFilter = ()=>{
    let funcArticlesData = [...articlesData];

    if(articlesCategory != ""){
      funcArticlesData = funcArticlesData.filter((article)=>{
        return article.topic.toLowerCase() == articlesCategory.toLowerCase();

      });

    }


    return funcArticlesData;
  }

  const filteredArticlesData = ArticlesDataFilter();
  // console.log(filteredArticlesData);
  
  useEffect(()=>{
    fetch(`https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${freeRecipesSearch}
    &app_id=3d4ce13e&app_key=309e7c6a041b819ea0605c46d27345b8&${dietLabelRecipes}
    &health=kosher&${cuisineTypeRecipes}
    &${mealTypeRecipes}
    &${caloriesRangeRecipes}
    &imageSize=SMALL`)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setRecipesDataApi(data);
    })

    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setRecipesSubApi(data);
    })
    
  },[]);
  
  function ArticlesSubList(item){
    
 return(
   
   <View style={[ styles.subjectContainer, {width: width * 0.3}]}>
   <TouchableHighlight onPress={()=> setArticlesCategory(item)} >
    <Text style={styles.subject}>{item}</Text>
    </TouchableHighlight>
    </View>
 )
  }
  
  function RecipesSubList(){
    return(

      <View style={styles.subjectContainer}>
    {console.log("function active")}
      {/* <TextInput underlineColorAndroid='red' style={styles.recipesSearch} placeholder='Search recipes...'/> */}
      <Text style={styles.recipesSearch}>Search recipes</Text>
    </View>
      )
      
  }

  function ArticlesList(item){
    return(
      <View style={[styles.articleCardContainer, {width: width}]}>
      <View style={styles.articleCard}>

      <Image source={{uri: item.img}} style={[styles.img,  ]}/>
      <Text>{item.title}</Text>
      <Text style={{fontSize: 20}}>{item.topic}</Text>
      </View>

      </View>
    )
  }
  
  
  return (
    <View style={styles.container}>
    <View style={styles.mainArticlesNav}>
      <Button onPress={()=> setIsArticles(false)} title='Recipes'></Button>
      <Button onPress={()=> setIsArticles(true)} title='Articles'></Button>
    
    </View>
    <View style={styles.subjectCarousel}>
    {isArticles ? <FlatList data={articlesSubArray} renderItem={({item})=>
       ArticlesSubList(item)}
       horizontal 
        bounces= {false}
       /> : RecipesSubList()}
    </View>
    <View style={styles.articlesContainer}>
    <FlatList data={isArticles ? filteredArticlesData : recipesSubApi.meals} renderItem={({item})=>
       isArticles ? ArticlesList(item) : RecipesSubList(item)}
      //  horizontal 

        bounces= {false}
       />

    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor: '#42ffff',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  
  mainArticlesNav:{
    backgroundColor: '#42f14f',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  
  subjectCarousel:{
    backgroundColor: '#6644af',
    width: '100%',
    height: '15%',
    
  },

  subjectContainer:{
    backgroundColor: '#5f3a',
    justifyContent: 'center',
     alignItems: 'center',

  },
  subject:{
    borderWidth: 2,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: '#11bb99',

  },

  recipesSearch:{
    width: '70%',
    height: '90%',
    backgroundColor: '#fff'

  },
  
  articlesContainer:{
    
    backgroundColor: '#42bb99',
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  articleCardContainer:{
    justifyContent: 'center',
    alignItems: 'center',

  },
  
  articleCard:{
    backgroundColor: '#20ffff',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    // height: '5%',
    
  },
  img:{
    flex: 0.7,
    justifyContent: 'center',
    width:'100%',
    height: 200,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

  },
})