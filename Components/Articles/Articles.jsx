import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { useState , useEffect} from 'react'
import articlesData from '../Jsons/articles.json'
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 


export default function Articles() {
  // articles or recipes
  const [isArticles, setIsArticles] = useState(true);

  const [articlesCategory, setArticlesCategory] = useState("");

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
  
  




  dietLabelRecipes


  const articlesSubArray = ["fitness","diet","health", "Mental health", "all"];
  
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


  
  
  const firstPageApiRecipes = `https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${freeRecipesSearch}
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
  
  function RecipesFilters(){
    return(

      <View style={styles.recipesFiltersContainer}>
      <TouchableOpacity onPress={()=> {setFreeRecipesSearch(currFreeRecipesSearch), setApiRecipes(firstPageApiRecipes)}}>
        <FontAwesome5  name="search" size={24} color="#c7e2fb" />
      </TouchableOpacity>

     <TextInput onChangeText={setCurrFreeRecipesSearch} style={styles.recipesSearch} placeholder='Search recipes...'/>

      <TouchableOpacity onPress={()=> {setFreeRecipesSearch(currFreeRecipesSearch), setApiRecipes(firstPageApiRecipes)}}>
        <Octicons name="filter" size={24} color="#c7e2fb" />
      </TouchableOpacity>
      <View style={styles.recipesFilters}>

      </View>
    </View>
      )    
  }

  function PagesNav(item){
    setApiRecipes(item);


  }

  function ArticlesList(item){
    return(
      <View style={[styles.articleCardContainer, {width: width}]}>
      <View style={styles.articleCard}>

      <Text style={{fontSize: 15, color:'#fff'}}>{item.title}</Text>
      <Text style={{fontSize: 20, color:'#fff', marginLeft: 210, textDecorationLine: 'underline'}}>{item.topic}</Text>
      <Image source={{uri: item.img}} style={[styles.img,  ]}/>
      </View>

      </View>
    )
  }

  function RecipesList(item){
    return(
      <View style={[styles.articleCardContainer, {width: width}]}>
    
      <View style={styles.articleCard}>

      <Text style={{fontSize: 20, color: '#fff'}}>{item.recipe.label}</Text>
      <Image source={{uri: item.recipe.image}} style={[styles.img,  ]}/>
      </View>

      </View>
    )
  }
  
  
  return (
    <View style={styles.container}>
    <View style={styles.mainArticlesNav}>

    <TouchableOpacity onPress={()=> setIsArticles(false)} style={[styles.ArticlesNavButtons, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]}>
      <Text style={{fontSize: 20}}>Recipes</Text>    
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsArticles(true)} style={[styles.ArticlesNavButtons, {borderTopRightRadius: 10, borderBottomRightRadius: 10}]}>
      <Text style={{fontSize: 20}}>Articles</Text>
    </TouchableOpacity>
    
    </View>
    <View style={styles.subjectCarousel}>
    {isArticles ? <FlatList data={articlesSubArray} renderItem={({item})=>
       ArticlesSubList(item)}
       horizontal 
        bounces= {false}
       /> : RecipesFilters()}
    </View>
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
    backgroundColor: '#00bfff',
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
     backgroundColor: '#0873c4',
     color: '#083a60',
     borderWidth: 2.5,
     
     
    },

  
  subjectCarousel:{
    backgroundColor: '#6644af',
    width: '100%',
    height: '15%',
    
  },

  subjectContainer:{
    backgroundColor: '#0a2946',
    justifyContent: 'center',
     alignItems: 'center',
     height: '100%'

  },
  recipesFiltersContainer:{
    backgroundColor: '#0a2946',
    flexDirection: 'row',
    justifyContent: 'center',
     alignItems: 'center',
     height: '100%'

  },

  recipesFilters:{
    // height: 100,
    // width: '100%',

  },

  articleSubButton:{
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 22,
    backgroundColor: '#12c5eb',


  },

  subject:{
    paddingBottom: 15,
    fontSize: 18,
    color: '#fff',
    
    
    

  },

  recipesSearch:{
    width: '75%',
    height: '40%',
    backgroundColor: '#fff',
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,


  },
  
  articlesContainer:{
    
    backgroundColor: '#00bfff',
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
    backgroundColor: '#2986cc',
   
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderRadius: 15,
   
    
  },
  img:{
    flex: 0.7,
    justifyContent: 'center',
    width:'100%',
    height: 200,
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,

  },
})