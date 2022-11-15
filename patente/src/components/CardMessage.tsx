import React from 'react'
import { View, Text } from "react-native";
import { Primary } from '../colors/Colors';

interface Props {
  message: string,
  align: 'flex-start' | 'flex-end',
  timestamp: string,
  color: string,
  colorFont:string

}





export const CardMessage = ({ message, align = 'flex-end', timestamp, color,colorFont }: Props) => {

  return (
    <View style={{ backgroundColor: color, maxWidth: 250, minWidth: 100, padding: 5, borderRadius: 10, margin: 10, alignSelf: align, justifyContent: 'center' }}>
      <Text style={{ color: colorFont, alignSelf: 'flex-end', marginRight: 10 }}>{message}</Text>
      <Text style={{ fontSize: 10, color: colorFont, marginTop: 5, alignSelf: 'flex-end', marginRight: 10 }}>1:42</Text>
    </View>
  )
}
