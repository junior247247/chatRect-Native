import React,{useContext,useEffect,useState} from 'react'
import { View,Text,TouchableOpacity,StyleSheet,Animated, FlatList } from "react-native";
import { authContext } from '../components/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useAnimation } from '../hooks/useAnimation';
import { Primary } from '../colors/Colors';
import { CardFriends } from '../components/CardFriends';

interface Friends{
    idUser:string,
}
interface Users{
  idUser:string,
  url:string,
  displayName:string
}

export const ScreenAmigos = () => {

    const [Users, setUsers] = useState<Users[]>([]);

    const [FriednsList, setFriednsList] = useState<Friends[]>([]);
    const {state,signOut} = useContext(authContext)


    const {opacyti,fadeIn,fadeOut} = useAnimation();
    const [IsVisible, setIsVisible] = useState(false);
  const showClose=()=>{

        (!IsVisible)?fadeIn():fadeOut();
        (!IsVisible)? setIsVisible(true): setIsVisible(false);
       
  }

  const closeSession=()=>{
    if(IsVisible){
        showClose();
        auth().signOut();
        signOut();
       
    }


  }
  
    useEffect(() => {
      console.log(state.uid,auth().currentUser?.uid)
      firestore().collection('amigos').where('id','==',state.uid).onSnapshot(res=>{
        if(res!=null){
          if(res.size>0){

        
        
        const arr:any[]=res.docs[0].get('idFriends');
        console.log(arr)
        arr.map(resp=>{
          firestore().collection('users').doc(resp).onSnapshot(res=>{
            const data:Users={
              displayName:res.get('displayName')!.toString(),
              idUser:res.id,
              url:res.get('imgProfile')!.toString()
            }
            setUsers([...Users,data]);
        

          })
        })
      }
      }
      })
      
  }, [])
  return (
    <View style={{flex:1,backgroundColor:'#ECEEEF'}}>
         <View style={{ borderBottomWidth: 1,backgroundColor:'white', borderBottomColor: '#ccc', marginBottom: 1 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ marginLeft:5,color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{width:15,alignItems:'center',marginRight:8}} onPress={()=>{showClose()}}>
                        <View style={style.menu} />
                        <View style={style.menu} />
                        <View style={style.menu} />
                      
                    </TouchableOpacity>
                
                </View>
                <Animated.View style={{borderRadius:5,opacity:opacyti,alignItems:'center',justifyContent:'center',alignSelf:'flex-end',width:115,height:30,right:40,top:13,backgroundColor:'#ECEEEF',position:'absolute'}}>

               
                <TouchableOpacity onPress={()=>{ closeSession()}} >
                        <Text style={{color:Primary,fontWeight:'bold'}}>Salir</Text>
                </TouchableOpacity>
                </Animated.View>
            </View>

            <FlatList
              data={Users}
              renderItem={({index,item})=>(
                <CardFriends key={index} displayName={item.displayName} idUser={item.idUser} url={item.url!}/>
              )}
            />



    </View>
  )
}


const style = StyleSheet.create({
  menu: {
      height: 5,
      width: 5,
      backgroundColor: 'black',
      marginTop: 5,
      borderRadius: 100

  }
})