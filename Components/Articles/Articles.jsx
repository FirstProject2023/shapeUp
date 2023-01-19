import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions, TouchableHighlight, Image} from 'react-native'
import React, { useState , useEffect} from 'react'
import SubjectList from './SubjectList';
import articlesData from '../Jsons/articles.json'

export default function Articles() {
  // articles or recipes
  const [isArticles, setIsArticles] = useState(true);
  const [recipesSubApi, setRecipesSubApi] = useState([]);
  const [articlesCategory, setArticlesCategory] = useState("");
  
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
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setRecipesSubApi(data)
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
  
  function RecipesSubList(item){
    {console.log("🚀 ~ file: Articles.jsx:27 ~ ArticlesSubList ~ item", item.strCategory)}

    return(

      
      <View style={[ styles.subjectContainer, {width: width * 0.3}]}>
      <TouchableHighlight>
    <Text style={styles.subject}>{item.strCategory}</Text>
      </TouchableHighlight>
    </View>
      )
    
  }

  function ArticlesList(item){
    return(
      <View style={[styles.articleCard, {width: width * 0.7}]}>
      <Image source={{uri: item.img}} style={[styles.img,  ]}/>
      <Text>{item.title}</Text>
      <Text style={{fontSize: 20}}>{item.topic}</Text>

      </View>
    )
  }
  
  
  return (
    <View style={styles.container}>
    <View style={styles.mainArticlesNav}>
      <Button onPress={()=> setIsArticles(false)} title='Recipes'></Button>
      <Button onPress={()=> setIsArticles(true)} title='Articles'></Button>
      <SubjectList/>
    </View>
    <View style={styles.subjectCarousel}>
      <FlatList data={isArticles ? articlesSubArray : recipesSubApi.meals} renderItem={({item})=>
       isArticles ? ArticlesSubList(item) : RecipesSubList(item)}
       horizontal 
        bounces= {false}
       />
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
  
  articlesContainer:{
    
    backgroundColor: '#42bb99',
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  articleCard:{
    backgroundColor: '#20ffff',
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