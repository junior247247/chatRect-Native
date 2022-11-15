import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/stack/StackNavigation';
import {StatusBar} from 'react-native'
import { AuthContext } from './src/components/AuthContext';



const AppState=({children}:any)=>{
  return(
    <AuthContext>
      {children}
    </AuthContext>
  )
}

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StatusBar  backgroundColor={'white'} />
        <StackNavigation/>
        </AppState>
    </NavigationContainer>
  )
}
export default App;