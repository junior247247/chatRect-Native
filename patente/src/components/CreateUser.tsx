import React, { useContext, useState,useRef } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { authContext } from './AuthContext';

import { ToastAndroid } from 'react-native';

interface Prosp{
    email:string;
    pass:string,
    name:string,
    lastname:string
}

export const CreteUser = ({email,pass,name,lastname}:Prosp) => {

    const {signin} = useContext(authContext);
    const [Isloading, setIsloading] = useState(false);
    const imageProfile = useRef('https://firebasestorage.googleapis.com/v0/b/socialmediagamer-bb7d4.appspot.com/o/312278152_5712872142098721_8528669024002143528_n.jpg?alt=media&token=6836c1f0-33a7-4e2b-b948-46231eb2f69e');

    const creteUserWithEmailAndPass= async()=>{
        setIsloading(true);
       
      
        const resp=await  auth().createUserWithEmailAndPassword(email,pass);
      if(resp.user==null)return ToastAndroid.show('error',ToastAndroid.SHORT);
        firestore().collection('users').doc(resp.user.uid).set({
          name:name,
          imgProfile:imageProfile.current,
          id:resp.user.uid,
          lastname:lastname,
          displayName:name+' '+lastname,
          timestamp:new Date().getTime()
        })
        signin(resp.user.uid);
        setIsloading(false);
        
    }

    return{
        Isloading,
        creteUserWithEmailAndPass
    }
   

 
}
