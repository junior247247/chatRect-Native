import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native';
import { Primary } from '../colors/Colors';


interface Props{
  url:string,
  idUser:string,
  displayName:string
}
export const Chats = ({url,idUser,displayName}:Props) => {
    const nav= useNavigation();
  
  return (
   <TouchableOpacity onPress={()=>nav.navigate('MessageScreen',{idUser:idUser})} activeOpacity={0.7} style={{flexDirection:'row',marginVertical:5,padding:10,borderTopWidth:1,borderBottomWidth:1,borderBottomColor:'#ccc',borderTopColor:'#ccc'}}>
        <Image source={{uri:url}} style={{width:60,height:60,borderRadius:100}}/>
        <View style={{marginLeft:10,flex:1,justifyContent:'center',marginTop:10}}>
            <Text style={{color:Primary,fontWeight:'bold'}}>{displayName}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
            <Text style={{color:Primary,fontWeight:'normal',fontSize:12}}>hola como estas...</Text>
       
            </View>
        </View>
   </TouchableOpacity>
  )
}
