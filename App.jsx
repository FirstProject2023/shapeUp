import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import { Header } from '@react-navigation/stack';


export default function App() {

  const Stack = createNativeStackNavigator();


  return (
   
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Nav" component={Nav} options={{headerShown: false}}/>
    <Stack.Screen name='Home' component={Home}/>
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
