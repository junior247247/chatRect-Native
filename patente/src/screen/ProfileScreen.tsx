import React,{useState,useContext} from 'react'
import { View,Text,TouchableOpacity,Animated,StyleSheet } from 'react-native'
import { CardProfiles } from '../components/CardProfiles'
import { useAnimation } from '../hooks/useAnimation'
import auth from '@react-native-firebase/auth';
import { authContext } from '../components/AuthContext';
import { Primary } from '../colors/Colors';

export const ProfileScreen = () => {
  const {signOut} = useContext(authContext);
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
  return (
    <View style={{flex:1}}>
          <View style={{ borderBottomWidth: 1, backgroundColor:'white',borderBottomColor:'#ccc', marginBottom: 4 }}>
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