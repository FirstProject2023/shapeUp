import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { useState , useEffect} from 'react'
import articlesData from '../Jsons/articles.json'
import { FontAwesome5 } from '@expo/vector-icons';


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

    if(articlesCategory != ""){
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
   <TouchableOpacity onPress={()=> setArticlesCategory(item)} >
    <Text style={styles.subject}>{item}</Text>
    </TouchableOpacity>
    </View>
 )
  }
  
  function RecipesFilters(){
    return(

      <View style={styles.recipesFiltersContainer}>
      <TouchableOpacity onPress={()=> {setFreeRecipesSearch(currFreeRecipesSearch), setApiRecipes(firstPageApiRecipes)}}>

        <FontAwesome5  name="search" size={24} color="black" />
      </TouchableOpacity>

     <TextInput onChangeText={setCurrFreeRecipesSearch} style={styles.recipesSearch} placeholder='Search recipes...'/>
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

      <Image source={{uri: item.img}} style={[styles.img,  ]}/>
      <Text>{item.title}</Text>
      <Text style={{fontSize: 20}}>{item.topic}</Text>
      </View>

      </View>
    )
  }

  function RecipesList(item){
    return(
      <View style={[styles.articleCardContainer, {width: width}]}>
    
      <View style={styles.articleCard}>

      <Image source={{uri: item.recipe.image}} style={[styles.img,  ]}/>
      <Text>{item.recipe.label}</Text>
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
     height: '100%'

  },
  recipesFiltersContainer:{
    backgroundColor: '#5f3a',
    flexDirection: 'row',
    justifyContent: 'center',
     alignItems: 'center',
     height: '100%'

  },
  subject:{
    borderWidth: 2,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: '#11bb99',

  },

  recipesSearch:{
    width: '80%',
    height: '40%',
    backgroundColor: '#fff',
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,


  },
  
  articlesContainer:{
    
    backgroundColor: '#42bb99',
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
    backgroundColor: '#20ffff',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
   
    
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