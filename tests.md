<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}}/>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Article' component={ArticleCard}/>
    <Stack.Screen name='Recipe' component={RecipeCard}/>
  </Stack.Navigator>
</NavigationContainer>




    const  handleSignUp =  async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log("a");
        } catch (error){
            console.log("b");
           
        }
    }


 sign up button=>{
        <TouchableOpacity
    onPress={handleSignUp}
    style={styles.loginButton}
    >
        <Text style={{color: 'rgba(255, 178, 71,0.9)', fontSize: 20, fontWeight: '800'}}>Sign Up</Text>
    </TouchableOpacity>
 }

  <View style={{width:'100%',alignItems:'center'}}>
 <TouchableOpacity style={{height:60,width:140,backgroundColor:'red',justifyContent:'center',
 alignItems:'center',borderRadius:7}}
 onPress={()=>setShowSubjects(!showSubjects)} >
<Text style={{color:"white"}} >Subjects</Text>
 </TouchableOpacity>
 <View style={{height: showSubjects ?47 : 0 ,position:'absolute',top:60,width:350,alignItems:'center',justifyContent:'center'}}>
 <FlatList
      data={arrOfClalcName}
      renderItem={({ item }) => 
      <TouchableOpacity onPress={()=>[ swap(numbers,0,3) ]}>

<View style={{borderColor:blue,borderWidth:1,width:80,alignItems:'center',justifyContent:'center',}} >
      <Text style={{backgroundColor:'white',fontSize:12}}>{item}</Text>
      
</View>
      </TouchableOpacity>
    }
      horizontal 
      bounces= {false}
    />
 </View>

  </View>

















 import InlineDatePicker from 'react-native-inline-datepicker';