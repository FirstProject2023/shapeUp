
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import ArticleCard from './Components/Articles/ArticleCard';
import RecipeCard from './Components/Articles/RecipeCard';
import Login from './Components/Login/Login';
import Transition from './Components/Transition/transitionScreen';
import Admin from './Components/Admin/Admin';
import UserStatus from './Components/Admin/UserStatus';
import AddArticle from './Components/Admin/AddArticle';




export default function App() {

  const Stack = createNativeStackNavigator();


  return (
   
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name='Login' component={Login} options={{
      headerShown: false,
    }}/>
    <Stack.Screen name='Transition' component={Transition} options={{
     
      headerShown: false,
    }}/>
    <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}}/>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Article' component={ArticleCard} options={{headerShown: false}}/>
    <Stack.Screen name='Recipe' component={RecipeCard} options={{headerShown: false}}/>
    <Stack.Screen name='Admin' component={Admin} options={{headerShown: false}}/>
    <Stack.Screen name='UserStatus' component={UserStatus} options={{headerShown: false}}/>
    <Stack.Screen name='AddArticle' component={AddArticle} options={{headerShown: false}}/>
  </Stack.Navigator>
</NavigationContainer>


  );
}

