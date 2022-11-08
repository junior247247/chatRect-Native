import React,{useState,useEffect} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { CardPost } from '../components/CardPost'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from '../colors/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import { CardPostText } from '../components/CardPostText';

interface Post{
    idUser:string|undefined,
    img:string[]|undefined[],
    text:string|undefined,
    idPost:string|undefined,
    timestamp:string|undefined
}

interface Props extends StackScreenProps<any,any>{};

export const HomeScreen = ({navigation}:Props) => {



    const [Post, setPost] = useState<Post[]>([])

    useEffect(() => {
        getData();
     
    }, [])
 
    

    const getData = () => {
       
    
         firestore().collection('Post').orderBy('timestamp','desc').onSnapshot(resp=>{

           
             
                const data:Post[]=resp.docs.map((item)=>{
                    return{
                        idPost:item.id,
                        img: (item.get('img')!.toString())? item.get('img')?.toString().split(','):[],
                        text:item.get('text')?.toString(),
                        idUser:item.get('userId')?.toString(),
                        timestamp:item.get('timestamp')?.toString()
                    }
                })

                setPost([...data]);


               
                    
          
        });
       // usersCollection.then(resp => {
       
        
           
          
           
        //})

      
        
       
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 40 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>
                    <View style={{flex:1}}/>
                    <TouchableOpacity>
                        <View style={style.menu} />
                        <View  style={style.menu}/>
                        <View style={style.menu} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#ECEEEF' }}>
                    <View style={{ width: 40, height: 40, backgroundColor: 'black', borderRadius: 100, justifyContent: 'center' }} />
                    <TouchableOpacity onPress={()=>{navigation.navigate('CreatePostScreen')}} activeOpacity={0.7} style={{ backgroundColor: '#ECEEEF', width: '90%', height: 40,paddingHorizontal:10, justifyContent: 'center', borderRadius: 10 }}>
                        <Text>¿ Que estas pensando ?</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomColor: '#ECEEEF', justifyContent: 'space-around', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={()=>{console.log(Post[0].idPost)}} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'videocam-outline'} size={30} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'images-outline'} size={30} />
                        <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>Foto</Text>
                    </TouchableOpacity>

                </View>
            </View>
            

                <FlatList
                style={{backgroundColor:'#ECEEEF'}}
                    data={Post}
                    renderItem={({item,index})=>(
            
                            (item.text!='' && item.img.length==0)?

                                    <CardPostText key={index} idUser={item.idUser!} timestamp={item.timestamp!} text={item.text} />

                                   : <CardPost  timestamp={item.timestamp!} text={item.text!} url={item.img!} idUser={item.idUser!} idPost={item.idPost!}  count={item.img.length} />
                      
                    )}
                />

        

          
        </View>
    )
}

const style=StyleSheet.create({
    menu:{
        height:5,
        width:5,
        backgroundColor:'black',
        marginTop:5,
        borderRadius:100
        
    }
})