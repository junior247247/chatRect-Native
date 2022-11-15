import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from '../colors/Colors';
interface Props{
    security?:boolean;
    inputType: 'email-address'|'default' |'numeric'| 'email-address'| 'ascii-capable'| 'numbers-and-punctuation'| 'number-pad'| 'phone-pad'| 'name-phone-pad'| 'decimal-pad'| 'twitter'| 'web-search' |'visible-password';
    icon:'lock-closed-outline'| 'mail-outline' |'person-circle-outline'|'';
    placeholder:'contraseña'|'correo@test.com'|'username'|'confirmar contraseña' |'lastname',
    onChange:(value:string)=>void;

}

export const Inputs = ({security=false,inputType,icon,placeholder,onChange}:Props) => {
  return (
   <View style={{alignItems:'center',marginVertical:20,borderColor:'#ccc',flexDirection:'row',borderWidth:1,borderRadius:10}}>   
    <Icon color={Primary} style={{marginLeft:10,borderLeftColor:'#ccc'}} name={icon} size={20}/>
    <TextInput onChangeText={onChange} placeholder={placeholder}  secureTextEntry={security} keyboardType={inputType} style={{flex:1}} />

   </View>
  )
}
