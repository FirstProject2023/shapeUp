import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Diary from "../Diary/Diary";
import Calc from "../Calc/Calc"
import Home from "../Home/Home";
import Articles  from "../Articles/Articles";
import Profile from "../Profile/Profile";


export default function Nav() {

    const BottomTab  = createBottomTabNavigator();

  return (
    <BottomTab.Navigator initialRouteName='Home'>
      <BottomTab.Screen name='Diary' component={Diary}   />
      <BottomTab.Screen name='Calc' component={Calc} />
      <BottomTab.Screen name='Home' component={Home} />
      <BottomTab.Screen name='Articles' component={Articles}/>
      <BottomTab.Screen name='Profile' component={Profile}/>
    </BottomTab.Navigator>
    
  )
}
