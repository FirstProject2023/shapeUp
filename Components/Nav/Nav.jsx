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


export default function Nav() {

    const BottomTab  = createBottomTabNavigator();

  return (
    <BottomTab.Navigator initialRouteName='Home'
      screenOptions={({route})=> ({
        tabBarIcon: () =>{
           
            let rn = route.name;

            if(rn === 'Home'){      
            return <Entypo name="home" size={24} color="#71c0fc" />
            } else if(rn === "Calc"){
            return <FontAwesome5 name="calculator" size={24} color="#71c0fc" />            
            } else if(rn === "Articles"){
            return <MaterialIcons name="article" size={24} color="#71c0fc" />   
            } else if(rn === "Diary"){
            return <FontAwesome name="bomb" size={24} color="#71c0fc" /> 
            } else if(rn === "Profile"){
            return <MaterialCommunityIcons name="face-man-profile" size={24} color="#71c0fc" /> 
            } 

        },
      })}
    >
      <BottomTab.Screen  name='Diary' component={Diary}   />
      <BottomTab.Screen name='Calc' component={Calc} />
      <BottomTab.Screen name='Home' component={Home} />
      <BottomTab.Screen name='Articles' component={Articles}/>
      <BottomTab.Screen name='Profile' component={Profile}/>
    </BottomTab.Navigator>
    
  )
}
