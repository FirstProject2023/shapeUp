import { StyleSheet, Text, View , Button, FlatList, useWindowDimensions,
   TouchableOpacity, Image, TextInput, ImageBackground, ActivityIndicator,
    KeyboardAvoidingView, StatusBar, Animated, PanResponder, Dimensions ,Modal ,Linking, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState , useEffect} from 'react'
import articlesData from '../Jsons/articles.json'
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import LottieView from 'lottie-react-native';

import { Picker } from '@react-native-picker/picker';


export default function Articles({navigation}) {
  // articles or recipes
  const [isArticles, setIsArticles] = useState(true);

  const [articlesCategory, setArticlesCategory] = useState("all");

  const [recipesDataApi, setRecipesDataApi] = useState([]);

  const [isLoading, setIsLoading] = useState(true)


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
  
  
  
  
  
  
  
  
  
  const articlesSubArray = ["fitness","diet","health", "mental health", "all"];
  
  const dietType = ["balanced","high-fiber","high-protein", "low-carb", "low-fat", "low-sodium"];
  
  const cuisineType = ["American","Asian","British", "Caribbean", "Central Europe",
  "Chinese","Eastern Europe","French", "Indian", "Italian", 
  "Japanese","Mediterranean","Mexican", "Middle Eastern", "Nordic", "South American", "South East Asian" ];
  
  const mealType = ["Breakfast","Dinner","Lunch", "Snack", "Teatime"];
  

  
  const [currFilters, setCurrFilters] = useState([

  ])

  function removeFilter(deletedFilter, indexKind) {
   const newFilter = currFilters.filter((filter) => filter.strFilter !== deletedFilter);
    setCurrFilters(newFilter);

    switch(indexKind){
      case 1:
      return  setDietLabelRecipes("");
      case 2:
      return  setCuisineTypeRecipes("");
      case 3:
      return setMealTypeRecipes("");
      case 4:
      return  setCaloriesRangeRecipes("");
      case 5:
      return  setFreeRecipesSearch("");
    }

    
  }


  
  



  const calories = [];
  for (let i = 0; i <= 2000; i += 100) {
    calories.push(i);
  }
  
  const {width} = useWindowDimensions();




  const ArticlesDataFilter = ()=>{
    let funcArticlesData = [...articlesData];

    if(articlesCategory != "all"){
      funcArticlesData = funcArticlesData.filter((article, i)=>{
        
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
    
    const GetContent = () =>{
      if(isLoading){
  
        
        return(
          <LottieView  autoPlay source={require('../lottieAnimation/loading_resipec.json')}/>
        )
      }
      // if(error){
      //   return <Text>{error}</Text>
      // }
      // return <Text>API called</Text>
    }
   

    useEffect(()=>{
      fetch(`https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${freeRecipesSearch}
      &app_id=3d4ce13e&app_key=309e7c6a041b819ea0605c46d27345b8&${dietLabelRecipes}
      &health=kosher&${cuisineTypeRecipes}
      &${mealTypeRecipes}
      &${caloriesRangeRecipes}&imageSize=SMALL`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setIsLoading(false);
        setRecipesDataApi(data);
      }
      )
      

    },[freeRecipesSearch, dietLabelRecipes, cuisineTypeRecipes, mealTypeRecipes, caloriesRangeRecipes])

  //   useEffect(()=>{

  //   fetch(apiRecipes)
  //   .then((response)=>{
  //     return response.json();
  //   })
  //   .then((data)=>{
  //     setRecipesDataApi(data);
  //   })
 
  // },[freeRecipesSearch, dietLabelRecipes, cuisineTypeRecipes, mealTypeRecipes, caloriesRangeRecipes, apiRecipes]);
  
  function ArticlesSubList(item, index){
    
 return(
   
   <View key={index} style={[ styles.subjectContainer, {width: width * 0.3}]}>
   <TouchableOpacity style={[styles.articleSubButton, {backgroundColor: articlesCategory == item ? '#d89b5c': '#fff'} ]} onPress={()=> setArticlesCategory(item)} >
    <Text style={[styles.subject, {color: articlesCategory == item ? '#fff': '#d89b5c'}]}>{item}</Text>
    </TouchableOpacity>
    </View>
 )
  }



  function RecipesDietFiltersList(item, index){
    return(

      <View key={index} style={[styles.currFilter, {width: width * 0.3}]}>
    <TouchableOpacity style={[styles.recipeFilterButton,/* isRecipesFilterActive ? {backgroundColor: '#d89b5c'}: */ {backgroundColor: '#fff'}]}
     onPress={()=> [setIsRecipesFilterActive(!isRecipesFilterActive), setDietLabelRecipes(`diet=${item}&`), setIsRecipesFilters(!isRecipesFilters), AddToFilters(item, 1)]}>
      <Text style={[{ fontSize: 18, color: '#d89b5c', fontSize: 13, fontWeight: '600'},/* isRecipesFilterActive ? {color: '#fff'}:*/ {color: '#d89b5c'}]}>{item}</Text>
    </TouchableOpacity>
    </View>
      )

  }
  function RecipesCuisineFiltersList(item, index){
    return(

      <View  key={index} style={[styles.currFilter, {width: width * 0.3}]}>
    <TouchableOpacity style={[styles.recipeFilterButton,/* isRecipesFilterActive ? {backgroundColor: '#d89b5c'}:*/ {backgroundColor: '#fff'}]}
     onPress={()=> [setIsRecipesFilterActive(!isRecipesFilterActive), setCuisineTypeRecipes(`cuisineType=${item}`), setIsRecipesFilters(!isRecipesFilters), AddToFilters(item, 2)]}>
     
      <Text style={[{ fontSize: 18, color: '#d89b5c', fontSize: 13, fontWeight: '600'},/* isRecipesFilterActive ? {color: '#fff'}:*/ {color: '#d89b5c'}]}>{item}</Text>
    </TouchableOpacity>
    </View>
      )

  }
  function RecipesMealFiltersList(item, index){
    return(

      <View key={index} style={[styles.currFilter, {width: width * 0.3}]}>
    <TouchableOpacity style={[styles.recipeFilterButton,/* isRecipesFilterActive ? {backgroundColor: '#d89b5c'}:*/ {backgroundColor: '#fff'}]}
     onPress={()=> [setIsRecipesFilterActive(!isRecipesFilterActive), setMealTypeRecipes(`mealType=${item}`), setIsRecipesFilters(!isRecipesFilters), AddToFilters(item, 3)]}>
     
      <Text style={[{ fontSize: 18, color: '#d89b5c', fontSize: 13, fontWeight: '600'},/* isRecipesFilterActive ? {color: '#fff'}: */ {color: '#d89b5c'}]}>{item}</Text>
    </TouchableOpacity>
    </View>
      )

  }

  function AddToFilters(item, indexKind){

  const newFilter = currFilters.filter((filter) =>{
      return filter.indexKind !== indexKind
    });
    setCurrFilters(newFilter);

    newFilter.push({strFilter: item, indexKind: indexKind})



  }

  function RecipesCurrFiltersList(item, index){
    return(

      <View key={index} style={[styles.currFilter, {width: width * 0.3}]}>
    <View style={[styles.recipeFilterButton,{backgroundColor: '#d89b5c', flexDirection: 'row',alignItems: 'center'}]}>
      <Text style={[{ fontSize: 18, color: '#d89b5c', fontSize: 13, fontWeight: '600', color: '#fff'}]}>{item.strFilter}</Text>
    <TouchableOpacity style={{position: 'absolute', right: -10, top: -10, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> removeFilter(item.strFilter, item.indexKind)}>
    <Feather name="x-circle" size={24} color="#fff"/>
    </TouchableOpacity>
    </View>
    
    </View>
      )

  }
  
  function RecipesFilters(){
    return(
      <View style={{width: '100%'}}>

      <View style={styles.recipesFiltersContainer}>
      <TouchableOpacity onPress={()=> {[setFreeRecipesSearch(currFreeRecipesSearch), , AddToFilters(currFreeRecipesSearch, 5)]}}>
        <FontAwesome5  name="search" size={30} color="#d89b5c" />
      </TouchableOpacity>

     <TextInput onChangeText={setCurrFreeRecipesSearch} style={styles.recipesSearch} placeholder='Search recipes...'/>

      <TouchableOpacity onPress={()=> setIsRecipesFilters(!isRecipesFilters)}>
        <Octicons name="filter" size={30} color="#d89b5c" />
      </TouchableOpacity>
    </View>
    <View style={[styles.filter, {height: 65}]}>
      <View style={styles.currFilterContainer}>

      <FlatList data={currFilters} renderItem={({item, index})=>
        RecipesCurrFiltersList(item, index)}
        horizontal 
        bounces= {false}
      />
      </View>
      
     </View>
    {isRecipesFilters ?  <View style={[styles.recipesFilters, isRecipesFilters ? {height: 480} : {height: 0}]}>

      <Text style={{margin: 10, color: '#fff', fontSize: 18, fontWeight: '700'}}>filters:</Text>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Diet</Text>
      <View style={styles.currFilterContainer}>

      <FlatList data={dietType} renderItem={({item, index})=>
        RecipesDietFiltersList(item, index)}
        horizontal 
        bounces= {false}
      />
      </View>
      
     </View>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Cuisine</Text>
      <View style={styles.currFilterContainer}>

        <FlatList data={cuisineType} renderItem={({item}, index)=>
          RecipesCuisineFiltersList(item, index)}
          horizontal 
          bounces= {false}
        />
        </View>

     </View>

      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Meal Type</Text>
      <View style={styles.currFilterContainer}>

        <FlatList data={mealType} renderItem={({item, index})=>
          RecipesMealFiltersList(item, index)}
          horizontal 
          bounces= {false}
        />
        </View>

     </View>


      <View style={styles.filter}>
      <Text style={{margin: 5, color: '#fff', fontSize: 16, fontWeight: '500'}}> Calories Range</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 5}}>
        <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>Max</Text>
        <TouchableOpacity onPress={()=> [setCaloriesRangeRecipes(`calories=${minCalories}-${maxCalories}`), setIsRecipesFilters(!isRecipesFilters), AddToFilters(`${minCalories}-${maxCalories}`, 4)]}>
        <AntDesign name="checkcircle" size={26} color="#fff" />
        </TouchableOpacity>
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
                <Picker.Item key={i} label={`${calories}`} value={calories} />
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
                <Picker.Item key={i} label={`${calories}`} value={calories}  />
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

  function ArticlesList(item, index){
    return(
      
      <TouchableOpacity style={styles.recipeCardShadow} onPress={()=> navigation.navigate('Article',{
          article: item.article,
          title:   item.title,
          topic:   item.topic,
          img:     item.img,
      })}>

      <View key={index} style={[styles.articleCardContainer, {width: width}]}>
      <View style={[styles.articleCard, styles.CardShadow]}>
        <ImageBackground style={{width: '100%', height: '100%', marginBottom: 0}} borderRadius={10} source={{uri: item.img}}>

      {/* <Text style={{fontSize: 20, color:'#fff', marginLeft: 210, textDecorationLine: 'underline'}}>{item.topic}</Text> */}
      {/* <Image source={{uri: item.img}} style={[styles.img,  ]}/> */}
       
      </ImageBackground> 
      {/* <Text style={{fontSize: 20, color:'#000', padding: 15, marginTop: 0}}>aaaaaaa</Text> */}
      </View>
      <Text style={{fontSize: 18, color:'#000', paddingHorizontal: 35, marginTop: 10, fontWeight: '800'}}>{item.title}</Text>

      </View>
      </TouchableOpacity>
    )
  }

  function RecipesList(item, index){
    return(
      <TouchableOpacity onPress={()=> navigation.navigate('Recipe',{
        recipe: item.recipe,
      })}>

      <View key={index} style={[styles.articleCardContainer, {width: width}]}>
    
      <View style={[styles.articleCard, styles.CardShadow]}>
 <ImageBackground style={{width: '100%', height: '100%', marginBottom: 0}} borderRadius={10} source={{uri: item.recipe.image}}>
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 15,}}>

      <View style={styles.iconsRecipesCards}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>{item.recipe.calories.toFixed()} cal</Text>
      <View style={{flexDirection: 'row'}}>
      <AntDesign style= {{marginTop: 3}} name="clockcircle" size={24} color="#fff" />
      <Text style={{color: '#fff', fontWeight: '700', fontSize: 20, paddingRight: 1}}>{item.recipe.totalTime}m </Text>
      </View>

      </View>
      </View>
 </ImageBackground>
      {/* <Image source={{uri: item.recipe.image}} style={[styles.img,  ]}/> */}
      </View>
      <Text style={{fontSize: 18, color:'#000', paddingHorizontal: 35, marginTop: 10, fontWeight: '800'}}>{item.recipe.label}</Text>

      </View>
      </TouchableOpacity>
    )
  }
  
  


  const [slideIn, setSlideIn] = useState(new Animated.Value(-width));

const position = new Animated.ValueXY();


const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (evt, gestureState) => {
    // Only set pan responder if the swipe is greater than 20 pixels
    if (Math.abs(gestureState.dx) > 20) {
      return true;
    }
    return false;
  },
  /* onMoveShouldSetPanResponderCapture: (evt, gestureState) => {

    position.setValue({x: gestureState.dx, y: 0})
    
  } */
  onPanResponderRelease: (evt, gestureState) => {
    // If swipe is greater than 50 pixels and it's a left swipe, navigate to another component
    if (gestureState.dx < -150) {
      navigation.navigate('Home');
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 1900,
        useNativeDriver: false,
      }).start();
  
    }
    if (gestureState.dx > 150) {
      navigation.navigate('Profile');
    }
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    useNativeDriver: false,
  }).start();
  },
  onPanResponderMove: Animated.event([
    null,
    { dx: position.x, dy: position.y },
  ],{ useNativeDriver: false })
});


const [modalVisible7, setModalVisible7] = useState(false);
const [modalVisible8, setModalVisible8] = useState(false);


const privacyPolicyText = `
Your privacy matters to us. We are committed to protecting your personal information and ensuring its confidentiality.

We collect only the necessary data required to provide you with our services, and we never share or sell your information to third parties.

Our privacy policy explains in detail what data we collect, how we use it, and the security measures we have in place to safeguard your information.

We respect your choices and provide options to manage your privacy preferences. You are in control of your data.`;

const termsOfServiceText = `
By using our app, you agree to abide by our Terms of Service, which outline the rules and guidelines for using our platform.

We encourage responsible and respectful use of our app. Prohibited activities include harassment, hate speech, and any form of unlawful behavior.

Our Terms of Service ensure fair usage, protect intellectual property rights, and maintain a positive community environment.

We value your feedback and encourage you to report any violations or concerns regarding the Terms of Service.`;

const contentGuidelinesText = `
Our app fosters a community where users can share content and engage with others. To maintain a safe and inclusive environment, we have content guidelines in place.

We encourage you to express yourself freely, but please ensure that your content aligns with our guidelines.

We do not tolerate any form of hate speech, harassment, explicit content, or violations of intellectual property rights.

By adhering to these guidelines, you help us create a respectful and enjoyable experience for all users.`;

const securityDataProtectionText = `
We take the security of your data seriously. We implement robust security measures to protect your personal information from unauthorized access.

Your data is encrypted during transmission and securely stored on our servers. We regularly update our systems to stay ahead of potential threats.

In the event of a security breach, we have procedures in place to promptly respond, mitigate the impact, and notify affected users as necessary.

We are committed to transparency and will keep you informed about our security practices and any updates related to data protection.`;


const [modalVisible, setModalVisible] = useState(false);
const toggleModalVisible = () => {
  setModalVisible(!modalVisible);
};

  return (   

<Animated.View  
         {...panResponder.panHandlers}
         
        style={{
         
          transform: [{ translateX: position.x }, ],
        }}
    
        >


    <ImageBackground source={{uri: "https://media.istockphoto.com/id/1368401341/photo/process-of-preparing-food-salad-of-vegetables-oil-dish-spring-vitamins-summer-vegetables.jpg?s=612x612&w=0&k=20&c=XwvilDaZPy57eDJXrMpx-1udYPEZhO9jQGUD-MHf2Cc="}} resizeMode= 'cover'>
    <StatusBar backgroundColor="rgb(255, 178, 71)" />
    <View style={styles.container}>
     

    <View style={styles.mainArticlesNav}>
    {/* <View style={{width: '70%', height: '80%', backgroundColor: '#0a2946', flexDirection: 'row', alignItems: 'center'}}> */}


    <TouchableOpacity onPress={()=> setIsArticles(false)} style={[styles.ArticlesNavButtons, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, isArticles ? {backgroundColor: '#fff'} : {backgroundColor: '#d89b5c'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#d89b5c'} : {color: '#fff'}]}>Recipes</Text>    
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsArticles(true)} style={[styles.ArticlesNavButtons, {borderTopRightRadius: 10, borderBottomRightRadius: 10}, isArticles ? {backgroundColor: '#d89b5c'} : {backgroundColor: '#fff'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#fff'} : {color: '#d89b5c'}]}>Articles</Text>
    </TouchableOpacity>

    
    {/* </View> */}
    </View>
    <TouchableOpacity style={{position:'absolute',top:10,right:10,zIndex:999}} onPress={toggleModalVisible}>
        <Entypo name="menu" size={40} color="#111"  />
      </TouchableOpacity>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModalVisible}
      >
        <TouchableWithoutFeedback onPress={toggleModalVisible}>
          <View style={styles.modalContainer3}>
            <View style={styles.modalView3}>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>  Linking.openSettings()}>
                <Text style={styles.modalButtonText3}>Settings</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={styles.modalButton3} onPress={()=>setModalVisible8(true)}>
                <Text style={styles.modalButtonText3}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>setModalVisible7(true)}>
                <Text style={styles.modalButtonText3}>Company Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton3} onPress={()=>hendleSingOut()}>
                <Text style={styles.modalSignOutText}>sign Out</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCancelButton3} onPress={toggleModalVisible}>
                <Text style={styles.modalCancelButtonText3}>Cancel</Text>
              </TouchableOpacity>
           
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={modalVisible7}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible7(false)}
      >
        <View style={styles.modalContainer7}>
          <View style={styles.modalContent7}>
            <ScrollView>
              <Text style={styles.sectionTitle7}>Privacy Policy</Text>
              <Text style={styles.policyText7}>{privacyPolicyText}</Text>

              <Text style={styles.sectionTitle7}>Terms of Service</Text>
              <Text style={styles.policyText7}>{termsOfServiceText}</Text>

              <Text style={styles.sectionTitle7}>Content Guidelines</Text>
              <Text style={styles.policyText7}>{contentGuidelinesText}</Text>

              <Text style={styles.sectionTitle7}>Security and Data Protection</Text>
              <Text style={styles.policyText7}>{securityDataProtectionText}</Text>
            </ScrollView>

            <Button title="Close" onPress={() => setModalVisible7(false)} />
          </View>
          </View>

          </Modal>
          <Modal
        visible={modalVisible8}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible8(false)}
      >
        <View style={styles.modalContainer8}>
          <View style={styles.modalContent8}>
            <Text style={styles.title8}>Contact Options</Text>

            <View style={styles.buttonContainer8}>

            <TouchableOpacity style={styles.contactButton} onPress={ ()=> Linking.openURL(whatsappToMaoz)}>
              <Text style={styles.contactButtonText}>Contact via WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}  onPress={()=>Linking.openURL('mailto:abhtur321@gmail.com')}>
              <Text style={styles.contactButtonText}>Contact via Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}  onPress={()=>Linking.openURL('tel:0585710584')}>
              <Text style={styles.contactButtonText}>Contact via Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={()=>Linking.openURL('sms:0585710584')}>
              <Text style={styles.contactButtonText}>Contact via SMS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton2} onPress={()=>Linking.openURL(url)}>
              <Text style={styles.contactButtonText}>Where are we located?</Text>
            </TouchableOpacity>

           


            <TouchableOpacity style={{backgroundColor:'#0974c0', borderRadius: 8,paddingVertical: 10,paddingHorizontal: 16,marginBottom: 10,marginTop:20}}
             onPress={() => setModalVisible8(false)}>
              <Text style={styles.contactButtonText}>Close</Text>
            </TouchableOpacity>
           

             
            </View>

           
          </View>
        </View>
      </Modal>


   {isArticles ?  <View style={styles.subjectCarousel}>
    <FlatList data={articlesSubArray} renderItem={({item, index})=>
       ArticlesSubList(item, index)}
       horizontal 
        bounces= {false}
       /> 
    </View>: RecipesFilters()}
    <View style={styles.articlesContainer}>
    {/* {!isArticles ? <View style={styles.pagesNavContainer}>

<View style={styles.pagesNav}>

<TouchableOpacity onPress={()=> [setPrevPage(recipesDataApi),PagesNav(recipesDataApi._links.next.href)]}>
<FontAwesome5   name="arrow-circle-right" size={34} color="black" />   
</TouchableOpacity>

<TouchableOpacity onPress={()=> [setPrevPage(recipesDataApi),PagesNav(prevPage)]} >
<FontAwesome5    name="arrow-circle-left" size={34} color="black" />
</TouchableOpacity>

</View>
</View>: null} */}

    
  {!isArticles ? recipesDataApi.count == 0 ? <Text style={{fontSize: 50}}>No results</Text>: null : null}

  {!isArticles ? recipesDataApi.count == 0 ? <LottieView autoPlay source={require('../lottieAnimation/no_resipec_resalts.json')}/>: null : null}

  {!isArticles ? GetContent() : null}

    {/* <FlatList data={isArticles ? filteredArticlesData : recipesDataApi.hits} renderItem={({item, index})=>
       isArticles ? ArticlesList(item, index) :   [PagesNav(item, index) , RecipesList(item, index)]}
      //  horizontal 

        bounces= {false}
       /> */}

<FlatList
  data={isArticles ? filteredArticlesData : recipesDataApi.hits}
  renderItem={({ item, index }) => {
    if (isArticles) {
      return <React.Fragment key={item.articleId}>{ArticlesList(item, index)}</React.Fragment>;
    } else {
      return (
        <React.Fragment key={item.pageId}>
        {/*   {PagesNav(item, index)} */}
          {RecipesList(item, index)}
        </React.Fragment>
        
      );
    }
  }}
/>
       




       {

       }

    </View>
    </View>
    </ImageBackground>
    </Animated.View>
 
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  
  mainArticlesNav:{
    // backgroundColor: '#000',
    width: '82%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-start',
    
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
    width: '98%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  
  subjectContainer:{
    // backgroundColor: '#fff',
    justifyContent: 'center',
     alignItems: 'center',
    

  },
  recipesFiltersContainer:{
    backgroundColor: '#0a2946',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
     borderWidth: 2,
     alignSelf: 'center',
     width: '97%',
     borderRadius: 6,
     
    },
    
    recipesFilters:{
      position: 'absolute', 
      top: 47.5, backgroundColor: '#0a2946',
      width: '97%',
      zIndex: 999 ,
      alignSelf: 'center',
      borderRadius: 6,
    },
    
  filter:{
    width: '97%',
    alignItems: 'center',
    justifyContent: 'center',

  },

  currFilterContainer:{
    width: '100%',
    // backgroundColor: '#fff',
    height: 60,

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
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  articleSubButton:{
    width: 90,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d89b5c',
    borderRadius: 20,
    // backgroundColor: '#000',
    
    
    
    
  },
  
  subject:{
    color: '#d89b5c',
    fontSize: 13,
    fontWeight: '600',
    // marginTop: 5,
    // alignSelf: 'center'
    
    
    

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
    
    // backgroundColor: '#000',
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

  CardShadow:{

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity:  0.21,
    shadowRadius: 6.65,
    elevation: 9

  },

  articleCardContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,

  },

  
  articleCard:{

    width: '80%',
    height: 200,
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F3F3F',
  },
  modalTextContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  modalText: {
    fontSize: 24,
    color: '#3F3F3F',
  },
  modalTextHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F3F',
    marginHorizontal: 5,
  },
  modalButton: {
    backgroundColor: '#3F3F3F',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView3: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton3: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText3: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCancelButton3: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelButtonText3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f00',
  },
  modalSignOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  modalContainer7: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent7: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    maxHeight: '80%', // Set a maximum height to allow scrolling
  },
  sectionTitle7: {
    fontSize: 22, // Increase the font size
    fontWeight: 'bold',
    marginBottom: 10,
  },
  policyText7: {
    fontSize: 14, // Increase the font size
    marginBottom: 10,
  },
  modalContainer8: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent8: {
    height:'60%',
    width:'80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  title8: {
    fontSize: 22,
    fontWeight: 'bold',
    
    marginBottom: 10,
  },
  buttonContainer8: {
    marginBottom: 20,
    
  },
  contactButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  contactButton2: {
    backgroundColor: '#2ecca1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
})