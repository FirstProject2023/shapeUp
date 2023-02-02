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