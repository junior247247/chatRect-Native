import React,{useRef} from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import { Primary } from '../colors/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
interface Props{
    count?:number;
}
export const CardPost = ({count=6}:Props) => {

    

    const image = useRef('https://firebasestorage.googleapis.com/v0/b/socialmediagamer-bb7d4.appspot.com/o/1667832731564?alt=media&token=f15c2976-d303-404a-86e4-a41f2ab26298');

  return (
    <View style={{borderBottomWidth:1,borderBottomColor:'#ECEEEF',borderTopWidth:1,borderTopColor:'#ECEEEF',marginVertical:10}}>

   
        <View style={{margin:10}}>
            <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:100,backgroundColor:'black',height:50,width:50}}/>
                <View style={{marginLeft:5,justifyContent:'center',flex:1}}>
                    <Text style={{color:Primary,fontSize:14}}>Junior Jimenez</Text>
                    <Text style={{fontSize:10}}>Hace un momento</Text>
                </View>
                <TouchableOpacity style={{justifyContent:'center',marginRight:5}}>
                    <View style={style.menu}/>
                    <View style={style.menu}/>
                    <View style={style.menu}/>
                </TouchableOpacity>
            </View>
          
        </View>

        <View style={{width:'100%',backgroundColor:'#ECEEEF',height:300,marginTop:5,flexDirection:'row'}}>
            {
               (count==2)?<View style={{flexDirection:'row',flex:1}}>
                  <Image style={{flex:1,marginHorizontal:1}} source={{uri:image.current}} />
                  <Image style={{flex:1,marginHorizontal:1}} source={{uri:image.current}} />
                </View> :
                    (count==3)? 
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row',flex:1}}>
                            <Image style={{flex:1,marginHorizontal:1}} source={{uri:image.current}} />
                            <Image style={{flex:1,marginHorizontal:1}} source={{uri:image.current}} />
                            </View>
                            <Image style={{flex:1,marginVertical:1,marginHorizontal:1}} source={{uri:image.current}} />
                        </View>:
                            (count==4)?
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row',flex:1}}>
                                <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                </View>

                                <View style={{flexDirection:'row',flex:1}}>
                                <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                </View>
                            </View>
                                : 
                                 (count>4)?
                                 <View style={{flex:1}}>
                                 <View style={{flexDirection:'row',flex:1}}>
                                 <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                 <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                 </View>
 
                                 <View style={{flexDirection:'row',flex:1}}>
                                 <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                 <View style={{flex:1}}>
                                 <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                     <View style={{justifyContent:'center',alignItems:'center',opacity:0.4,position:'absolute',backgroundColor:'#ECEEEF',width:'100%',height:'100%',zIndex:999}}>
                                        
                                        
                                        <Text style={{fontSize:34,color:'white',fontWeight:'bold'}}>{ count-4}+</Text>
                                     
                                     </View>
                                 </View>
                                 </View>
                             </View>
                                        :
                                        <View style={{flex:1}}>
                                            <Image style={{flex:1,marginHorizontal:1,marginVertical:1}} source={{uri:image.current}} />
                                        </View>

            }
           
        </View>

         <View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:10,marginVertical:5}}>
                <Text>0 comentarios</Text>
                <Text>0 compartidas</Text>
         </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',margin:10}}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon size={25} color={Primary} style={{marginRight:10}} name={'heart-outline'}/>
                    <Text style={{color:'black'}}>Me gusta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon style={{marginRight:10}} size={25} color={Primary} name={'share-social-outline'}/>
                    
                    <Text style={{color:'black'}}>Compartir</Text>
                </TouchableOpacity>
            </View>


        </View>
  )
}

const style=StyleSheet.create({
    menu:{
        width:5,
        height:5,
        backgroundColor:'black',
        marginVertical:2,
        borderRadius:100
    }
})