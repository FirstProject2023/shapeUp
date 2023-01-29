import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions, TouchableOpacity, Image, TextInput, ImageBackground} from 'react-native'
import React, { useState , useEffect} from 'react'
import articlesData from '../Jsons/articles.json'
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import { Picker } from '@react-native-picker/picker';


export default function Articles({navigation}) {
  // articles or recipes
  const [isArticles, setIsArticles] = useState(true);

  const [articlesCategory, setArticlesCategory] = useState("all");

  const [recipesDataApi, setRecipesDataApi] = useState([]);

  const [currFreeRecipesSearch, setCurrFreeRecipesSearch] = useState("");
  const [freeRecipesSearch, setFreeRecipesSearch] = useState("");
  //diet
  const [dietLabelRecipes, setDietLabelRecipes] = useState(""); //chang to array
  //cuisineType
  const [cuisineTypeRecipes, setCuisineTypeRecipes] = useState("");
  //mealType
  const [mealTypeRecipes, setMealTypeRecipes] = useState("");
  //calories
  const [caloriesRangeRecipes, setCaloriesRangeRecipes] = useState("");

  //recipes links for pages
  const [recipesLinks, setRecipesLinks] = useState([])

  //is recipesFilters
  const [isRecipesFilters, setIsRecipesFilters] = useState(false);

  // isRecipesFilterActive
  const [isRecipesFilterActive, setIsRecipesFilterActive] = useState(false);
  //calorieRange
  const [calorieRange, setCalorieRange] = useState([0, 1000]);

  //minCalories
  const [minCalories, setMinCalories] = useState("")
  
  //maxCalories
  const [maxCalories, setMaxCalories] = useState("")
  
  




  dietLabelRecipes


  const articlesSubArray = ["fitness","diet","health", "Mental health", "all"];

  const dietType = ["balanced","high-Fiber","high-Protein", "low-Carb", "low-Fat", "low-Sodium"];
  const cuisineType = ["American","Asian","British", "Caribbean", "Central Europe",
                       "Chinese","Eastern Europe","French", "Indian", "Italian", 
                       "Japanese","Mediterranean","Mexican", "Middle Eastern", "Nordic", "South American", "South East Asian" ];

  const mealType = ["Breakfast","Dinner","Lunch", "Snack", "Teatime"]


  const calories = [];
  for (let i = 0; i <= 2000; i += 100) {
    calories.push(i);
  }
  
  const {width} = useWindowDimensions();




  const ArticlesDataFilter = ()=>{
    let funcArticlesData = [...articlesData];

    if(articlesCategory != "all"){
      funcArticlesData = funcArticlesData.filter((article)=>{
        return article.topic.toLowerCase() == articlesCategory.toLowerCase();

      });

    }


    return funcArticlesData;
  }

  const filteredArticlesData = ArticlesDataFilter();


  
  
  let firstPageApiRecipes = `https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${freeRecipesSearch}
  &app_id=3d4ce13e&app_key=309e7c6a041b819ea0605c46d27345b8&${dietLabelRecipes}
  &health=kosher&${cuisineTypeRecipes}
  &${mealTypeRecipes}
  &${caloriesRangeRecipes}
  &imageSize=SMALL`;

  const [prevPage, setPrevPage] = useState([]);

  const [apiRecipes, setApiRecipes]  = useState(firstPageApiRecipes)

  // const [isFilter, setIsFilter] = useState(true);
     
    // if(isFilter){

    // }
    // else{
     
    // }

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

    },[])

    useEffect(()=>{

    fetch(apiRecipes)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setRecipesDataApi(data);
    })
 
  },[freeRecipesSearch, dietLabelRecipes, cuisineTypeRecipes, mealTypeRecipes, caloriesRangeRecipes, apiRecipes]);
  
  function ArticlesSubList(item){
    
 return(
   
   <View style={[ styles.subjectContainer, {width: width * 0.3}]}>
   <TouchableOpacity style={styles.articleSubButton} onPress={()=> setArticlesCategory(item)} >
    <Text style={styles.subject}>{item}</Text>
    </TouchableOpacity>
    </View>
 )
  }

  function RecipesFiltersList(item){
    return(

      <View style={[styles.currFilter, {width: width * 0.3}]}>
    <TouchableOpacity style={[styles.recipeFilterButton, isRecipesFilterActive ? {backgroundColor: '#d89b5c'}: {backgroundColor: '#fff'}]} onPress={()=> setIsRecipesFilterActive(!isRecipesFilterActive)}>
     
      <Text style={[{ fontSize: 18, color: '#d89b5c', fontSize: 13, fontWeight: '600'}, isRecipesFilterActive ? {color: '#fff'}: {color: '#d89b5c'}]}>{item}</Text>
    </TouchableOpacity>
    </View>
      )

  }

  
  
  function RecipesFilters(){
    return(
      <View style={{width: '100%'}}>

      <View style={styles.recipesFiltersContainer}>
      <TouchableOpacity onPress={()=> {setFreeRecipesSearch(currFreeRecipesSearch), setApiRecipes(firstPageApiRecipes)}}>
        <FontAwesome5  name="search" size={30} color="#d89b5c" />
      </TouchableOpacity>

     <TextInput onChangeText={setCurrFreeRecipesSearch} style={styles.recipesSearch} placeholder='Search recipes...'/>

      <TouchableOpacity onPress={()=> setIsRecipesFilters(!isRecipesFilters)}>
        <Octicons name="filter" size={30} color="#d89b5c" />
      </TouchableOpacity>
    </View>
    {isRecipesFilters ?  <View style={[styles.recipesFilters, isRecipesFilters ? {height: 450} : {height: 0}]}>

      <Text style={{margin: 10, color: '#fff', fontSize: 18, fontWeight: '700'}}>filters:</Text>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Diet</Text>
      <View style={styles.currFilterContainer}>

      <FlatList data={dietType} renderItem={({item})=>
        RecipesFiltersList(item)}
        horizontal 
        bounces= {false}
      />
      </View>
      
     </View>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Cuisine</Text>
      <View style={styles.currFilterContainer}>

        <FlatList data={cuisineType} renderItem={({item})=>
          RecipesFiltersList(item)}
          horizontal 
          bounces= {false}
        />
        </View>

     </View>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Meal Type</Text>
      <View style={styles.currFilterContainer}>

        <FlatList data={mealType} renderItem={({item})=>
          RecipesFiltersList(item)}
          horizontal 
          bounces= {false}
        />
        </View>

     </View>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Calories Range</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 5}}>
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>Max</Text>
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>Min</Text>
      </View>
      <View style={[styles.currFilterContainer, {flexDirection: 'row', justifyContent: 'space-evenly'}]}>

      
      <Picker
          style={{
          marginTop:10,
          width: '30%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={maxCalories}
      onValueChange={(itemValue) => setMaxCalories(itemValue)}
      >
{calories.map((calories,i) => (
                <Picker.Item label={`${calories}`} value={calories} key={i} />
            ))}

      </Picker>
      <Picker
          style={{
          marginTop:10,
          width: '30%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={minCalories}
      onValueChange={(itemValue) => setMinCalories(itemValue)}
      >
      {calories.map((calories,i) => (
                <Picker.Item label={`${calories}`} value={calories} key={i} />
            ))}
      
      </Picker>
      </View>


     </View>

      </View> : null}
      </View>
      )    
  }

  function PagesNav(item){
    setApiRecipes(item);


  }

  function ArticlesList(item){
    return(
      <TouchableOpacity onPress={()=> navigation.navigate('Article',{
          article: item.article,
          title:   item.title,
          topic:   item.topic,
          img:     item.img,
      })}>

      <View style={[styles.articleCardContainer, {width: width}]}>
      <View style={styles.articleCard}>

      <Text style={{fontSize: 15, color:'#fff'}}>{item.title}</Text>
      <Text style={{fontSize: 20, color:'#fff', marginLeft: 210, textDecorationLine: 'underline'}}>{item.topic}</Text>
      <Image source={{uri: item.img}} style={[styles.img,  ]}/>
      </View>

      </View>
      </TouchableOpacity>
    )
  }

  function RecipesList(item){
    return(
      <TouchableOpacity onPress={()=> navigation.navigate('Recipe',{
        recipe: item.recipe,
      })}>

      <View style={[styles.articleCardContainer, {width: width}]}>
    
      <View style={styles.articleCard}>

      <Text style={{fontSize: 20, color: '#fff'}}>{item.recipe.label}</Text>
      <Image source={{uri: item.recipe.image}} style={[styles.img,  ]}/>
      <View style={styles.iconsRecipesCards}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>{item.recipe.calories.toFixed()} cal</Text>
      <View style={{flexDirection: 'row'}}>
      <AntDesign style= {{marginTop: 3}} name="clockcircle" size={24} color="#fff" />
      <Text style={{color: '#fff', fontWeight: '700', fontSize: 20, paddingRight: 1}}>{item.recipe.totalTime}</Text>
      </View>

      </View>
      </View>

      </View>
      </TouchableOpacity>
    )
  }
  
  
  return (
    <ImageBackground source={{uri: "https://media.istockphoto.com/id/1368401341/photo/process-of-preparing-food-salad-of-vegetables-oil-dish-spring-vitamins-summer-vegetables.jpg?s=612x612&w=0&k=20&c=XwvilDaZPy57eDJXrMpx-1udYPEZhO9jQGUD-MHf2Cc="}} resizeMode= 'cover'>
    <View style={styles.container}>
      

    <View style={styles.mainArticlesNav}>

    <TouchableOpacity onPress={()=> setIsArticles(false)} style={[styles.ArticlesNavButtons, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, isArticles ? {backgroundColor: '#fff'} : {backgroundColor: '#d89b5c'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#d89b5c'} : {color: '#fff'}]}>Recipes</Text>    
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsArticles(true)} style={[styles.ArticlesNavButtons, {borderTopRightRadius: 10, borderBottomRightRadius: 10}, isArticles ? {backgroundColor: '#d89b5c'} : {backgroundColor: '#fff'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#fff'} : {color: '#d89b5c'}]}>Articles</Text>
    </TouchableOpacity>
    
    </View>
   {isArticles ?  <View style={styles.subjectCarousel}>
    <FlatList data={articlesSubArray} renderItem={({item})=>
       ArticlesSubList(item)}
       horizontal 
        bounces= {false}
       /> 
    </View>: RecipesFilters()}
    <View style={styles.articlesContainer}>
    {!isArticles ? <View style={styles.pagesNavContainer}>

<View style={styles.pagesNav}>

<TouchableOpacity onPress={()=> [setPrevPage(recipesDataApi),PagesNav(recipesDataApi._links.next.href)]}>
<FontAwesome5   name="arrow-circle-right" size={34} color="black" />   
</TouchableOpacity>

<TouchableOpacity onPress={()=> [setPrevPage(recipesDataApi),PagesNav(prevPage)]} >
<FontAwesome5    name="arrow-circle-left" size={34} color="black" />
</TouchableOpacity>

</View>
</View>: null}

    

    <FlatList data={isArticles ? filteredArticlesData : recipesDataApi.hits} renderItem={({item})=>
       isArticles ? ArticlesList(item) :  [PagesNav(item), RecipesList(item)]}
      //  horizontal 

        bounces= {false}
       />

    </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  mainArticlesNav:{
    // backgroundColor: '#fff',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  ArticlesNavButtons:{
    width: '40%',
     height: '70%',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#fff',
     borderWidth: 2.5,
     borderColor: '#d89b5c',
     
     
    },

        ArticlesNavText:{
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -0.3,
        color: '#d89b5c'
    },

  
  subjectCarousel:{
    // backgroundColor: '#0a2946',
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  
  subjectContainer:{
    // backgroundColor: '#fff',
    justifyContent: 'center',
     alignItems: 'center',
     height: '100%',

  },
  recipesFiltersContainer:{
    backgroundColor: '#0a2946',
    flexDirection: 'row',
    justifyContent: 'center',
    //  alignItems: 'center',
     borderWidth: 2,
     borderRadius: 12,
    //  height: 300,
  
    //  width: '100%'


  },

  recipesFilters:{
    position: 'absolute', 
    top: 43.5, backgroundColor: '#0a2946',
     width: '100%',
     zIndex: 999 ,
  },

  filter:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },

  currFilterContainer:{
    width: '100%',
    // backgroundColor: '#fff',
    height: 50,

  },

  currFilter:{
    justifyContent: 'center'

  },
  recipeFilterButton:{
    // width: 80,
    marginHorizontal: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d89b5c',
    borderRadius: 22,
    backgroundColor: '#fff',
  },

  articleSubButton:{
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: '#d89b5c',
    borderRadius: 22,
    backgroundColor: '#fff',
    
    
    
  },
  
  subject:{
    paddingBottom: 15,
    fontSize: 18,
    color: '#d89b5c',
    fontSize: 18,
    fontWeight: '600',
    
    
    

  },

  recipesSearch:{
    width: '75%',
    height: 40,
    backgroundColor: '#fff',
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,


  },
  
  articlesContainer:{
    
    // backgroundColor: '#fff',
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pagesNavContainer:{
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },

  pagesNav:{
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  alignItems: 'center',
  },



  articleCardContainer:{
    justifyContent: 'center',
    alignItems: 'center',

  },
  
  articleCard:{
    backgroundColor: '#d89b5c',

    // backgroundColor: '#eca44f',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 0,
    borderColor: '#d89b5c',
    borderRadius: 15,
   
    
  },

  iconsRecipesCards:{
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 8,
    paddingHorizontal: 10,

  },


  
  img:{
    flex: 0.7,
    justifyContent: 'center',
    width:'100%',
    height: 200,
    borderWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 5,

  },
})