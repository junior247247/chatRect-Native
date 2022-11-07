import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text } from 'react-native';
import { ChatsScreen } from '../screen/ChatsScreen';
import { ConfigScreen } from '../screen/ConfigScreen';
import { HomeScreen } from '../screen/HomeScreen';
import { ProfileScreen } from '../screen/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from '../colors/Colors'

const Tab=createBottomTabNavigator();

export const TabsNavigation = () => {
  return (
    <Tab.Navigator  screenOptions={{headerShown:false,tabBarLabelStyle:{fontFamily:'Arial',fontWeight:'bold',fontSize:12},tabBarStyle:{paddingBottom:5,height:53,borderTopWidth:1,elevation:90},tabBarActiveTintColor:Primary}}>
        <Tab.Screen component={HomeScreen} name={'Home'} options={{tabBarIcon:({color,size})=>(<Icon color={color}  name='home-outline' size={size}/>)}}/>
        <Tab.Screen component={ChatsScreen}name={'Chats'} options={{tabBarIcon:({color,size})=>(<Icon color={color} name='chatbubbles-outline' size={size}/>)}} />
        <Tab.Screen component={ProfileScreen} name={'Profile'} options={{tabBarIcon:({color,size})=>(<Icon color={color} name='person-outline' size={size}/>)}}/>
        <Tab.Screen component={ConfigScreen} name={'Buscar'} options={{tabBarIcon:({color,size})=>(<Icon color={color} name='search-outline' size={size}/>)}}/>
    </Tab.Navigator>
  )
}
