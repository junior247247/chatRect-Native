import React, { useContext, useState } from 'react'
import  {getAuth,createUserWithEmailAndPassword }  from "firebase/auth";
import { getFirestore, collection, getDocs,addDoc } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";

import { initializeApp } from "firebase/app";
import { authContext } from './AuthContext';
import { firebaseConfig } from '../data/ConfigFirebase';
import { ToastAndroid } from 'react-native';

interface Prosp{
    email:string;
    pass:string,
    name:string,
}

export const CreteUser = ({email,pass,name}:Prosp) => {

    const {signin} = useContext(authContext);
    const [Isloading, setIsloading] = useState(false);

    const creteUserWithEmailAndPass= async()=>{
        setIsloading(true);
       
          const app = initializeApp(firebaseConfig);
      
          const auth= getAuth(app);
        const resp=await  createUserWithEmailAndPassword(auth,email,pass);
      if(resp.user==null)return ToastAndroid.show('error',ToastAndroid.SHORT);
        const db = getFirestore(app);

             await addDoc(collection(db, "userssssss"), {
            id:resp.user.uid,
            name: name,
            email: email,
          });


          
        signin(resp.user.uid);
        setIsloading(false);
        
    }

    return{
        Isloading,
        creteUserWithEmailAndPass
    }
   

 
}
