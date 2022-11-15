import React, { useContext,useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ChatsScreen } from '../screen/ChatsScreen';
import { LoginScreen } from '../screen/LoginScreen';
import { authContext } from '../components/AuthContext';
import { RegiterScreen } from '../components/RegisterScreen';
import { TabsNavigation } from './TabsNavigation';
import { CreatePostScreen } from '../screen/CreatePostScreen';
//import { initializeApp } from "firebase/app";
//import  {getAuth }  from "firebase/auth";
import { firebaseConfig } from '../data/ConfigFirebase';
import { ScreenImageByPost } from '../screen/ScreenImageByPost';
import { MessageScreen } from '../screen/MessageScreen';
//const app = initializeApp(firebaseConfig);
    
//const auth= getAuth(app);

export type RootParams={
  LoginScreen:undefined,
  RegiterScreen:undefined,
  TabsNavigation:undefined,
  CreatePostScreen:undefined,
  ScreenImageByPost:{idPost:string},
  MessageScreen:{idUser:string}
}
const Stack= createStackNavigator<RootParams>();

export const StackNavigation = () => {

  const {state,signin} = useContext(authContext);

  useEffect(() => {
   
  //if(auth.currentUser!=null)signin(auth.currentUser.uid);

  }, [])
  


  return (
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{cardStyle:{backgroundColor:'white'},headerShown:false}}  >

      {
        (state.state=='not-authenticate' || state.state=='cheking') ? 
        <>
         <Stack.Screen name='LoginScreen' component={LoginScreen}/>
         <Stack.Screen name='RegiterScreen' component={RegiterScreen}/>
  
        </>
         


        :
        <>
              <Stack.Screen name='TabsNavigation' component={TabsNavigation}/>
              <Stack.Screen name='CreatePostScreen' component={CreatePostScreen}/>
              <Stack.Screen name='ScreenImageByPost' component={ScreenImageByPost}/>
              <Stack.Screen name='MessageScreen' component={MessageScreen} />
              
        </>
  
      }
       
    </Stack.Navigator>
  )
}
