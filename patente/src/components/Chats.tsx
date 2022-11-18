import { useNavigation } from '@react-navigation/native';
import React,{useEffect,useState} from 'react'
import {View,Text,TouchableOpacity,Image} from 'react-native';
import { Primary } from '../colors/Colors';
import firestore from '@react-native-firebase/firestore';


interface Props{
  url:string,
  idUser:string,
  displayName:string,
 
}
export const Chats = ({url,idUser,displayName}:Props) => {
    const nav= useNavigation();
    const [LastMessage, setLastMessage] = useState('');

    useEffect(() => {
      
      firestore().collection('chats').where('ids','array-contains-any',[idUser]).onSnapshot(res=>{
        if(res!=null){
          const idChat=res.docs[0].get('idChat')!.toString();
          firestore().collection('Messages').where('idChat','==',idChat).limit(1).orderBy('timestamp','desc').onSnapshot(resp=>{
            if(resp!=null){
              const mess=resp.docs[0].get('message')!.toString();
              if(mess.length>=20){
                setLastMessage(mess.substring(0,20)+'...');
              }else{
                setLastMessage(mess);
              }

    
            }
          })
        }

      })
    }, [])
    
  
  return (
   <TouchableOpacity onPress={()=>nav.navigate('MessageScreen',{idUser:idUser})} activeOpacity={0.7} style={{flexDirection:'row',marginVertical:5,padding:10,borderBottomColor:'#ccc',borderTopColor:'#ccc'}}>
        <Image source={{uri:url}} style={{width:60,height:60,borderRadius:100}}/>
        <View style={{marginLeft:10,flex:1,justifyContent:'center',marginTop:10}}>
            <Text style={{color:Primary,fontWeight:'bold'}}>{displayName.toUpperCase()}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
            <Text style={{color:Primary,fontWeight:'normal',fontSize:12}}>{LastMessage}</Text>
       
            </View>
        </View>
   </TouchableOpacity>
  )
}
