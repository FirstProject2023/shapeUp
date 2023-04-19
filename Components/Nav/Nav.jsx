import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



import Diary from "../Diary/Diary";
import Calc from "../Calc/Calc"
import Home from "../Home/Home";
import Articles  from "../Articles/Articles";
import Profile from "../Profile/Profile";
import Login from '../Login/Login';
import { TouchableOpacity } from 'react-native';


export default function Nav() {

    const BottomTab  = createBottomTabNavigator();

  return (
    <BottomTab.Navigator initialRouteName='Home'
      screenOptions={({route})=> ({
        tabBarIcon: () =>{
           
            let rn = route.name;

            if(rn === 'Home'){      
            return <Entypo name="home" size={24} color="#d89b5c" />
            } else if(rn === "Calc"){
            return <FontAwesome5 name="calculator" size={24} color="#d89b5c" />            
            } else if(rn === "Articles"){
            return <MaterialIcons name="article" size={24} color="#d89b5c" />   
            } else if(rn === "Diary"){
            return <FontAwesome name="bomb" size={24} color="#d89b5c" /> 
            } else if(rn === "Profile"){
            return <MaterialCommunityIcons name="face-man-profile" size={24} color="#d89b5c" /> 
            } 

        },
      })}
    >
      <BottomTab.Screen  name='Diary' component={Diary} options={{
        
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: 'rgb(225, 150, 30)',
        tabBarActiveBackgroundColor: '#ffefbf',
        headerShown: false,
      }}   />
      <BottomTab.Screen name='Calc' component={Calc} options={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: 'rgb(225, 150, 30)',
        tabBarActiveBackgroundColor: '#ffefbf',
        headerShown: false,
      }} />
      <BottomTab.Screen name='Home' component={Home} options={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: 'rgb(225, 150, 30)',
        tabBarActiveBackgroundColor: '#ffefbf',
        headerShown: false,
      }}/>
      <BottomTab.Screen name='Articles' component={Articles} options={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: 'rgb(225, 150, 30)',
        tabBarActiveBackgroundColor: '#ffefbf',
        headerShown: false,
      }}/>
      <BottomTab.Screen name='Profile' component={Profile} options={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveTintColor: 'rgb(225, 150, 30)',
        tabBarActiveBackgroundColor: '#ffefbf',
        headerShown: false,
      }}/>

    </BottomTab.Navigator>
    
  )
}
