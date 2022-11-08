import React from 'react'
import {  View,Image} from "react-native";

interface Props{
    url:string|undefined
}
export const CardImage = ({url}:Props) => {
  return (
    <View style={{flex:1}}>
        <Image source={{uri:url}} style={{width:'100%',height:400,marginBottom:10}} />
    </View>
  )
}
