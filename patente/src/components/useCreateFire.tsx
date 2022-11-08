import React,{useState} from 'react'
//import { getFirestore, collection, getDocs,addDoc } from 'firebase/firestore/lite';
//import { async } from '@firebase/util';
import { firebaseConfig } from '../data/ConfigFirebase';
//import { initializeApp } from "firebase/app";


export const useCreateFire =<T extends object>(data:T) => {
        const [state, setState] = useState(data);



    const onChange=(value:string,field:keyof T)=>{
        setState({
            ...state,
            [field]:value
        })
    }

  const create= async (table:string)=>{

    
    
  }


return {
    create,
    onChange,
    state
}

}
