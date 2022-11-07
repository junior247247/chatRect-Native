import React from 'react'
import {View,Text,TouchableOpacity,ScrollView} from 'react-native'
import { Primary } from '../colors/Colors'
import { Chats } from '../components/Chats'
import Icon from 'react-native-vector-icons/Ionicons';
//import Realm from "realm";


export const ChatsScreen = () => {
  return (
    <View style={{flex:1}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}>
        <View style={{flexDirection:'row',margin:10}}>
           <Text style={{color:Primary,fontSize:24,fontWeight:'bold',fontFamily:'arial'}}>Talk Safe</Text>
        </View>
        
        </View>
        <ScrollView>

     
        <Chats/>
        <Chats/>
        <Chats/>

        </ScrollView>
        <TouchableOpacity style={{elevation:5,justifyContent:'center',alignItems:'center',width:50,height:50,backgroundColor:Primary,position:'absolute',bottom:0,right:0,margin:20,borderRadius:100}}>
        <Icon color={'white'}  name={'chatbubbles-outline'} size={30}/>
        </TouchableOpacity>

    </View>
  )
}
