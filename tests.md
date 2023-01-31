<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}}/>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Article' component={ArticleCard}/>
    <Stack.Screen name='Recipe' component={RecipeCard}/>
  </Stack.Navigator>
</NavigationContainer>