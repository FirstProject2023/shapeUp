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




 1. picker exemple: 

 

       <Picker
          style={{
          marginTop:10,
          width: '70%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={height}
      onValueChange={(itemValue) => setHeight(itemValue)}
      
      >
{HeightMap.map((height,i) => (
                <Picker.Item key={i} label={`${height}`} value={height} />
            ))}

      </Picker>

       <Picker
          style={{
          marginTop:10,
          width: '70%',
          backgroundColor: '#d89b5c',
      }}
      selectedValue={weight}
      onValueChange={(itemValue) => setWeight(itemValue)}
      
      >
{WeightMap.map((weight,i) => (
                <Picker.Item key={i} label={`${weight}`} value={weight} />
            ))}

      </Picker>




        const HeightMap = [];
  for (let i = 100; i <= 300; i += 1) {
    HeightMap.push(i);
  }


        const WeightMap = [];
  for (let i = 30; i <= 200; i += 1) {
    WeightMap.push(i);
  }


  
   /*  if (users.length > 0 && auth.currentUser) {
      
      users.map((user,i) =>
      {
        if(user.email.toLowerCase() == auth.currentUser.email.toLowerCase())
        {
           setCurrentUserData(user); 
        }

      })
    }     */



    <TouchableOpacity onPress={()=> setIsInstructions(true)} style={{position: 'absolute', left: 5, top: 5}}>
    <AntDesign name="questioncircleo" size={25} color="black" />
    </TouchableOpacity>

    <FadeInOut
    visible={isInstructions}
    scale={true}
     style={{backgroundColor: '#d4f1f9' ,marginTop: 30, width:'80%',  height: isInstructions ? '75%': 0, alignItems: 'center', position: 'absolute', top: 25, padding: 10, borderRadius: 8, zIndex: isInstructions ? 999: 0, borderWidth: 1}}>
      
    <TouchableOpacity style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#0a2946', borderRadius: 100}} onPress={()=> setIsInstructions(false)}>
    <Feather name="x-circle" size={30} color="#fff"/>
    </TouchableOpacity>
    <Text style={{marginTop: 20, fontSize: 20, fontWeight: '600'}}>instructions</Text>
    </FadeInOut>
  

