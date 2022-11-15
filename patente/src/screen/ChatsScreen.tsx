import React,{useEffect,useState,useContext} from 'react'
import {View,Text,TouchableOpacity,ScrollView} from 'react-native'
import { Primary } from '../colors/Colors'
import { Chats } from '../components/Chats'
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { authContext } from '../components/AuthContext';
//import Realm from "realm";

interface Friends{
  idUser:string,
}

export const ChatsScreen = () => {
    const [FriednsList, setFriednsList] = useState<Friends[]>([]);
    const {state} = useContext(authContext)
  
    useEffect(() => {
      /*firestore().collection('amigos').where('id','==',state.uid).onSnapshot(res=>{
        const arr:any[]=res.docs[0].get('idFriends');
        const data:Friends[]=arr.map(res=>{
          return{
            idUser:res
          }
        })
      })*/
      
  }, [])
  


  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}>
        <View style={{flexDirection:'row',margin:10}}>
           <Text style={{color:Primary,fontSize:24,fontWeight:'bold',fontFamily:'arial'}}>Talk Safe</Text>
        </View>
        
        </View>
        <ScrollView>

     
        <Chats idUser='' url=''/>
      

        </ScrollView>
        <TouchableOpacity style={{elevation:5,justifyContent:'center',alignItems:'center',width:50,height:50,backgroundColor:Primary,position:'absolute',bottom:0,right:0,margin:20,borderRadius:100}}>
        <Icon color={'white'}  name={'chatbubbles-outline'} size={30}/>
        </TouchableOpacity>

    </View>
  )
}
