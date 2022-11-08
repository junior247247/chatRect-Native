import React,{useEffect,useState} from 'react'
import {  View,Text,TouchableOpacity,StyleSheet,FlatList,Image} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import { RootParams } from '../stack/StackNavigation';
import { Primary } from '../colors/Colors';

import { CardImage } from '../components/CardImage';

interface Prop extends StackScreenProps<RootParams,'ScreenImageByPost'>{};
interface file{
    img:string;
}
export const ScreenImageByPost = ({route}:Prop) => {
    const {idPost}=route.params;
    const [images, setimages] = useState<string[]>([])


    useEffect(() => {
      
    
        firestore().collection('Post').doc(idPost).onSnapshot(resp=>{

          let img:string[]=resp.get('img')!.toString().split(',');
             
        console.log(idPost);
         setimages([...img]);
        


           
                
      
    });
    
    }, [])
    
  return (
    <View style={{flex:1}}>
   <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>
                    <View style={{flex:1}}/>
                    
                </View>

            </View>
          
       {     <FlatList 
                style={{flex:1}}
                data={images}
                renderItem={({item,index})=>(
                   <CardImage url={item} />
                )}
            
                />}
    </View>
  )
}

