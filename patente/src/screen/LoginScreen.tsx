import React, { useContext } from 'react'
import {StyleSheet, Text, View,StatusBar, TouchableOpacity, ToastAndroid} from 'react-native'
import  {getAuth,createUserWithEmailAndPassword,EmailAuthCredential ,signInWithEmailAndPassword,onAuthStateChanged }  from "firebase/auth";
import { Primary } from '../colors/Colors';
import { Inputs } from '../components/Inputs';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { firebaseConfig } from '../data/ConfigFirebase';
import { initializeApp } from "firebase/app";
import { authContext, AuthContext } from '../components/AuthContext';


interface Props extends StackScreenProps<any,any>{};


export const LoginScreen = ({navigation}:Props) => {

  const {onChange,email,pass}=useForm({email:'',pass:''});

  const {signin}=useContext(authContext);

  const Login=async()=>{

      if(email.trim()==='' && pass.trim()==='')return ToastAndroid.show('completa todos los campos',ToastAndroid.SHORT);

   
      const app = initializeApp(firebaseConfig);
    
      const auth= getAuth(app);
      const resp= await signInWithEmailAndPassword(auth,email,pass);
      if(resp.user==null)return ToastAndroid.show('Email o contraseña incorrecta',ToastAndroid.SHORT);
        signin(resp.user.uid);
  }


  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor={Primary}/>
      <View style={{width:'100%',height:50,justifyContent:'center',backgroundColor:Primary}}>
        <Text style={{fontWeight:'bold',color:'white',fontSize:20,marginVertical:10,marginHorizontal:20}}>Talk Safe</Text>
      </View>
      <Text style={{alignSelf:'center',fontWeight:'bold',color:Primary,position:'absolute',marginTop:100,fontSize:30}}>Login</Text>
    <View style={{flex:1}}>
    <View style={{justifyContent:'center',flex:1}}>
        <View style={{padding:10,borderRadius:10,marginHorizontal:10,height:300,borderWidth:1,borderColor:'#ccc'}}>
        <Inputs onChange={(txt)=>onChange(txt,'email')} placeholder='correo@test.com' inputType={'email-address'} icon={'mail-outline'}/>
        <Inputs onChange={(txt)=>onChange(txt,'pass')} placeholder='contraseña' inputType={'default'} security={true}  icon={'lock-closed-outline'} />
        <TouchableOpacity
        
          onPress={()=>Login()}
          style={{
          backgroundColor:Primary,
          height:50,
          borderRadius:10,
          marginTop:15,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{color:'white',fontFamily:'Arial',fontWeight:'bold',fontSize:18}}>Login</Text>
        </TouchableOpacity>
      </View>


 <View style={{marginTop:10,flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'black'}}>¿No tienes cuenta?</Text>
          <Text onPress={()=>{navigation.navigate('RegiterScreen')}} style={{borderBottomColor:Primary,borderBottomWidth:0.2,fontWeight:'bold',marginLeft:10,fontSize:18,color:Primary}}>Registrate Aqui</Text>
        </View>
    </View>
    </View>

       

    </View>
  )
}
