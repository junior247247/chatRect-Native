import React from 'react'
import { View,Text,TouchableOpacity, ToastAndroid,ActivityIndicator } from 'react-native'
import { Primary } from '../colors/Colors'
import { useForm } from '../hooks/useForm'
import { CreteUser } from '../components/CreateUser'
import { Inputs } from './Inputs'


export const RegiterScreen = () => {
   const {username,email,pass,passconfirm,lastname,onChange} = useForm({username:'',email:'',pass:'',passconfirm:'',lastname:''});
    const {Isloading,creteUserWithEmailAndPass} =  CreteUser({email:email,pass:pass,name:username,lastname:lastname});
    
   const createUser=()=>{
      if(username.trim()=='' && email.trim()=='' && pass.trim()=='' && passconfirm.trim()=='' && lastname.trim()=='')return ToastAndroid.show('completa todos los campos',ToastAndroid.LONG);

      creteUserWithEmailAndPass();
   }


  return (
   <View style={{flex:1}}>
         <View style={{width:'100%',height:50,justifyContent:'center',backgroundColor:Primary}}>
        <Text style={{fontWeight:'bold',color:'white',fontSize:20,marginVertical:10,marginHorizontal:20}}>Talk Safe</Text>
      </View>
      <Text style={{alignSelf:'center',fontWeight:'bold',color:Primary,position:'absolute',marginTop:70,fontSize:30}}>Registro Usuario</Text>

      <View style={{flex:1,marginTop:90,marginHorizontal:10}}>

      <Inputs onChange={(txt)=>{onChange(txt,'username')}} placeholder='username' inputType={'default'} security={false}  icon={'person-circle-outline'} />
      <Inputs onChange={(txt)=>{onChange(txt,'lastname')}} placeholder='lastname' inputType={'default'} security={false}  icon={'person-circle-outline'} />
      <Inputs onChange={(txt)=>{onChange(txt,'email')}} placeholder='correo@test.com' inputType={'default'} security={false}  icon={'mail-outline'} />
      <Inputs onChange={(txt)=>{onChange(txt,'pass')}} placeholder='contraseña' inputType={'default'} security={true}  icon={'lock-closed-outline'} />
      <Inputs onChange={(txt)=>{onChange(txt,'passconfirm')}} placeholder='confirmar contraseña' inputType={'default'} security={true}  icon={'lock-closed-outline'} />
      
      <TouchableOpacity
      activeOpacity={0.7}
        onPress={()=>{createUser()}}

        style={{
          backgroundColor:Primary,
          height:50,
          borderRadius:10,
          marginTop:15,
          justifyContent:'center',
          alignItems:'center'


          
        }}>
          <Text style={{color:'white',fontFamily:'Arial',fontWeight:'bold',fontSize:18}}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
      {
        (Isloading) && <ActivityIndicator color={Primary} size={70} style={{position:'absolute',alignSelf:'center',top:'50%'}}/>
      }

     
   </View>
  )
}
