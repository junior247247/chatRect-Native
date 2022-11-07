import React, { useContext,useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChatsScreen } from '../screen/ChatsScreen';
import { LoginScreen } from '../screen/LoginScreen';
import { authContext } from '../components/AuthContext';
import { RegiterScreen } from '../components/RegisterScreen';
import { TabsNavigation } from './TabsNavigation';
import { CreatePostScreen } from '../screen/CreatePostScreen';
import { initializeApp } from "firebase/app";
import  {getAuth }  from "firebase/auth";
import { firebaseConfig } from '../data/ConfigFirebase';
const app = initializeApp(firebaseConfig);
    
const auth= getAuth(app);
const Stack= createStackNavigator();

export const StackNavigation = () => {

  const {state,signin} = useContext(authContext);

  useEffect(() => {
   
  if(auth.currentUser!=null)signin(auth.currentUser.uid);

  }, [])
  


  return (
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{cardStyle:{backgroundColor:'white'},headerShown:false}}  >

      {
        (state.state=='not-authenticate') ? 
        <>
         <Stack.Screen name='LoginScreen' component={LoginScreen}/>
         <Stack.Screen name='RegiterScreen' component={RegiterScreen}/>
  
        </>
         


        :
        <>
              <Stack.Screen name='TabsNavigation' component={TabsNavigation}/>
              <Stack.Screen name='CreatePostScreen' component={CreatePostScreen}/>
              
        </>
  
      }
       
    </Stack.Navigator>
  )
}
