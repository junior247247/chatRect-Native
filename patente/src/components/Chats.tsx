import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native';
import { Primary } from '../colors/Colors';
export const Chats = () => {
  return (
   <TouchableOpacity activeOpacity={0.7} style={{flexDirection:'row',marginVertical:5,padding:10,borderTopWidth:1,borderBottomWidth:1,borderBottomColor:'#ccc',borderTopColor:'#ccc'}}>
        <View style={{width:60,height:60,borderRadius:100,backgroundColor:Primary}}/>
        <View style={{marginLeft:10,flex:1,justifyContent:'center',marginTop:10}}>
            <Text style={{color:Primary,fontWeight:'bold'}}>JUNIOR JIMENEZ</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
            <Text style={{color:Primary,fontWeight:'normal',fontSize:12}}>hola como estas...</Text>
            <Text style={{color:Primary,fontWeight:'normal' ,fontSize:10}}>en linea</Text>
            </View>
        </View>
   </TouchableOpacity>
  )
}
