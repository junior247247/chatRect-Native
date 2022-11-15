import React,{useEffect,useState,useContext} from 'react'
import {View,Text,TouchableOpacity,ScrollView, FlatList} from 'react-native'
import { Primary } from '../colors/Colors'
import { Chats } from '../components/Chats'
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { authContext } from '../components/AuthContext';
//import Realm from "realm";

interface Users{
  idUser:string,
  displayName:string,
  url:string
}

export const ChatsScreen = () => {
    const [Users, setUsers] = useState<Users[]>([]);
    const {state} = useContext(authContext)
  
    useEffect(() => {
      getChat();
      
  }, [])

  const getChat= async()=>{
       firestore().collection('chats').where('ids','array-contains-any',[state.uid]).onSnapshot(res=>{
        if(res!=null){

       
        const arr:any[]=res.docs[0].get('ids');
        arr.map(resp=>{
          if(resp!==state.uid){
            firestore().collection('users').doc(resp).onSnapshot(user=>{
                if(user!=null){
                  const data:Users={
                    idUser:user.id,
                    displayName:user.get('displayName')!.toString(),
                    url:user.get('imgProfile')!.toString()
                  }
                  setUsers([...Users,data]);
                }
            })
          }
        })
      }

      })
  }
  


  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}>
        <View style={{flexDirection:'row',margin:10}}>
           <Text style={{color:Primary,fontSize:24,fontWeight:'bold',fontFamily:'arial'}}>Talk Safe</Text>
        </View>
        
        </View>
        
      <FlatList
      
      data={Users}
      renderItem={({item,index})=>(
        <Chats displayName={item.displayName} idUser={item.idUser} url={item.url}/>
      )}
      />
     
       
      

       
        <TouchableOpacity style={{elevation:5,justifyContent:'center',alignItems:'center',width:50,height:50,backgroundColor:Primary,position:'absolute',bottom:0,right:0,margin:20,borderRadius:100}}>
        <Icon color={'white'}  name={'chatbubbles-outline'} size={30}/>
        </TouchableOpacity>

    </View>
  )
}
