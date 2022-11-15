import React, { createContext, useEffect, useReducer } from 'react'
//import { initializeApp } from "firebase/app";
//import  {getAuth }  from "firebase/auth";
import { firebaseConfig } from '../data/ConfigFirebase';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface authState{
    state:'not-authenticate'|'authenticated'|'cheking';
    uid:string;
}
const initState:authState={
    state:'cheking',
    uid:''
}

interface Props{
    state:authState,
    signin:(uid:string)=>void;
    signOut:()=>void;
}



type authAction=|{type:'signin',uid:string}| {type:'signOut'};

const authReducer=(state:authState,action:authAction):authState=>{


    switch (action.type) {
        case 'signin':
            
           return{
            ...state,
            uid:action.uid,
            state:'authenticated'
           }

           case 'signOut':
            return{
                ...state,
                uid:'',
                state:'not-authenticate'
            }
    
        default:
           return state;
    }
   
}




export const authContext = createContext({}as Props);
//const app = initializeApp(firebaseConfig);
    
//const auth= getAuth(app);

export const AuthContext = ({children}:any) => {

    const [state, dispatch] = useReducer(authReducer, initState);
 



    useEffect(() => {
        console.log(auth().currentUser?.uid,'sssss');
        
        if(auth().currentUser!=null){
            dispatch({type:'signin',uid:auth().currentUser!.uid});
        }
       
        //console.log(auth.currentUser?.uid)
        //if(auth.currentUser!=null) dispatch({type:'signin',uid:auth.currentUser.uid});
    }, [])
    
    const signin=(uid:string)=>{
        dispatch({type:'signin',uid:uid});
    }

    const signOut=()=>{
        dispatch({type:'signOut'});
    }

  return (
    <authContext.Provider value={{
        state,
        signin,
        signOut
    }}>
        {children}
    </authContext.Provider>
  )
}
