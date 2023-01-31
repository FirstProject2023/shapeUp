import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ArticleCard from './Components/Articles/ArticleCard';
import RecipeCard from './Components/Articles/RecipeCard';
import { Header } from '@react-navigation/stack';
import Login from './Components/Login/Login';


export default function App() {

  const Stack = createNativeStackNavigator();


  return (
   
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Login' component={Login}/>
    <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}}/>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Article' component={ArticleCard}/>
    <Stack.Screen name='Recipe' component={RecipeCard}/>
  </Stack.Navigator>
</NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
