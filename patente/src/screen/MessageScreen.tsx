import React, { useState, useContext, useRef, useEffect ,useMemo} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Animated, Image, FlatList, ToastAndroid } from "react-native";
import { useAnimation } from '../hooks/useAnimation';
import auth from '@react-native-firebase/auth';
import { authContext } from '../components/AuthContext';
import { Primary } from '../colors/Colors';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import { RootParams } from '../stack/StackNavigation';
import { useForm } from '../hooks/useForm';
import { CardMessage } from '../components/CardMessage';

interface Props extends StackScreenProps<RootParams, 'MessageScreen'> { };


interface Messages {
    idChat: string,
    idEmisor: string,
    idReceptor: string,
    message: string,
    timestamp: string
}
interface Users{
    displayName:string,
    img:string
}

export const MessageScreen = ({ route,navigation }: Props) => {
    const { idUser } = route.params;
    const { signOut, state } = useContext(authContext);
    const [users, setUsers] = useState<Users>({img:'',displayName:''});
    
    const { message, onChange } = useForm({ message: '' });
    const [uidChat, setuidChat] = useState('');
   
    const ref = useRef<FlatList>(null);
    const { current } = useRef('https://firebasestorage.googleapis.com/v0/b/socialmediagamer-bb7d4.appspot.com/o/312278152_5712872142098721_8528669024002143528_n.jpg?alt=media&token=6836c1f0-33a7-4e2b-b948-46231eb2f69e');
    const [Messages, setMessages] = useState<Messages[]>([]);
        const idChat = useRef<string>('');
 
    useEffect(() => {
     
       getIdChat();
      
    }, [])

    const getIdChat=async()=>{
        const ids:string[]=[idUser,state.uid];
        
        const resp=  await  firestore().collection('chats').where('ids','array-contains-any',ids).get();
        if(resp==null)return;
         idChat.current=resp.docs[0].get('idChat')!.toString();
         
        const msj=firestore().collection('Messages').orderBy('timestamp','asc').where('idChat','==',idChat.current).onSnapshot((query)=>{
            const  menssjae:Messages[]=[];
         //   console.log(query)

            if(query!=null){

      
            query.forEach(document=>{
                menssjae.push({
                    idChat: document.get('idChat')!.toString(),
                        idEmisor: document.get('idEmisor')!.toString(),
                        idReceptor: document.get('idReceptor')!.toString(),
                        message: document.get('message')!.toString(),
                        timestamp: document.get('timestamp')!.toString()
                })
              
            })
          
            setMessages(menssjae);
        }

        });
    }
    
    useEffect(() => {
        firestore().collection('users').doc(idUser).get().then(resp=>{
           
           console.log(resp);
            const data:Users={
                displayName:resp.get('displayName')!.toString(),
                img:resp.get('imgProfile')!.toString()
           }
            setUsers(data);
        })
      
    }, [])





    




 

    const createChatWithMessage = () => {
      
        const data: any[] = [idUser , state.uid ];
        firestore().collection('chats').where('ids', 'array-contains-any', data).get().then(resp => {
            if (resp.size > 0) {
                const id = resp.docs[0].id;
                firestore().collection('Messages').doc().set({
                    idEmisor: state.uid,
                    idReceptor: idUser,
                    idChat: id,
                    message: message,
                    timestamp: new Date().getTime()
                });
            
            } else {
                const data: any[] = [idUser, state.uid];
                firestore().collection('chats').doc(idUser + state.uid).set({
                    idEmisor: state.uid,
                    idReceptor: idUser,
                    idChat: idUser + state.uid,
                    ids: data
                })
                idChat.current=idUser+state.uid

                firestore().collection('Messages').doc().set({
                    idEmisor: state.uid,
                    idReceptor: idUser,
                    idChat: idUser + state.uid,
                    message: message,
                    timestamp: new Date().getTime()
                });
                

            }
        })
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ECEEEF' }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}>

                    <TouchableOpacity onPress={()=>navigation.pop()} style={{justifyContent:'center'}}>
                        <Icon name='arrow-back-outline' color={Primary} size={25}/>
                    </TouchableOpacity>
                    <Image source={{ uri: users.img }} style={{ width: 40, height: 40, borderRadius: 100,marginLeft:10 }} />
                    <Text style={{ marginHorizontal: 10, fontSize: 16 ,marginTop:5,color:'black'}}>{users!.displayName}</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={{ width: 15, alignItems: 'center', marginRight: 8 }}>
                        <View style={style.menu} />
                        <View style={style.menu} />
                        <View style={style.menu} />

                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#ECEEEF' }}>
                <FlatList
                    
                    ref={ref}
                    keyExtractor={(item, index) => item.timestamp}
                    onContentSizeChange={()=>ref.current?.scrollToEnd()}
                    data={Messages}
                    renderItem={({ index, item }) => (
                        (item.idEmisor == state.uid) ?
                            <CardMessage colorFont='white' color={Primary} timestamp='' message={item.message} align='flex-end' />
                            :
                            <CardMessage colorFont='black' color='white' timestamp='' message={item.message} align='flex-start' />
                    )}
                />


            </View>


            <View style={{ paddingVertical: 9, borderRadius: 10, marginHorizontal: 10, flexDirection: 'row', paddingHorizontal: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput  placeholderTextColor={'black'} onChangeText={(txt) => onChange(txt, 'message')} placeholder='Escribe un mensaje' style={{ color:'black', paddingLeft: 10, backgroundColor: '#ECEEEF', flex: 1, borderRadius: 100 }} />
                <TouchableOpacity onPress={() => createChatWithMessage()}>
                    <Icon name='send-outline' style={{ marginLeft: 15 }} color={Primary} size={20} />
                </TouchableOpacity>
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