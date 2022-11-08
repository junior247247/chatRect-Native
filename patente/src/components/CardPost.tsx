import React, { useRef ,useEffect,useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Primary } from '../colors/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
interface Props {
    count?: number;
    url: string[] | undefined[],
    idPost: string,
    idUser: string,
    text: string,
    timestamp:string,
}
export const CardPost = ({ count = 6, url, idPost, idUser, text,timestamp }: Props) => {

    const nav = useNavigation();
    const [name, setname] = useState('');
    const [images, setimages] = useState('');
    const [times, settimes] = useState('');

    useEffect(() => {
        console.log(url.length)
        firestore().collection('users').doc(idUser).get().then(resp=>{
            setimages(resp.get('imgProfile')!.toString())
            setname(resp.get('name')!.toString());
            console.log(timestamp)
            var date=new Date(Number(timestamp));
            settimes(date.getDay().toString()+' - '+date.getMonth().toString()+' - '+date.getFullYear().toString());
        })


    
    }, [])
    

    return (
        <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ECEEEF', borderTopWidth: 1, borderTopColor: '#ECEEEF', marginVertical: 10 }}>


            <TouchableOpacity activeOpacity={0.5} style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{borderRadius:100,borderWidth:1,borderColor:Primary,height:40,width:40}} source={{uri:images!}} />
                
                    <View style={{ marginLeft: 5, justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: Primary, fontSize: 14 }}>{name}</Text>
                        <Text style={{ fontSize: 10 ,fontWeight:'bold'}}>{times}</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 5 }}>
                        <View style={style.menu} />
                        <View style={style.menu} />
                        <View style={style.menu} />
                      
                    </TouchableOpacity>
                </View>
                {
                    (text) && <Text style={{ marginTop: 10, fontSize: 12, color: 'black' }}>{text}</Text>
                }

            </TouchableOpacity>
             
                         <View style={{ width: '100%', backgroundColor: '#ECEEEF', height: 300, marginTop: 2, flexDirection: 'row' }}>
                    {
                        (count == 2) ? <View style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[0]! }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[1]! }} />
                            </TouchableOpacity>
    
    
    
                        </View> :
                            (count == 3) ?
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                            <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[0]! }} />
                                        </TouchableOpacity>
    
    
    
                                        <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                            <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[1]!}} />
                                        </TouchableOpacity>
                                    </View>
    
    
                                    <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                        <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[2]! }} />
                                    </TouchableOpacity>
    
    
    
                                </View> :
                                (count == 4) ?
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[0]! }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[1]! }} />
                                            </TouchableOpacity>
                                        </View>
    
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[2]! }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[3]! }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    (count > 4) ?
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                    <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[0]! }} />
                                                </TouchableOpacity>
    
                                                <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
                                                    <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[1]! }} />
                                                </TouchableOpacity>
    
    
    
                                            </View>
    
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                    <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[2]! }} />
                                                </TouchableOpacity>
    
    
                                                <TouchableOpacity activeOpacity={0.7} onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
                                                    <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[3]! }} />
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', opacity: 0.4, position: 'absolute', backgroundColor: '#ECEEEF', width: '100%', height: '100%', zIndex: 999 }}>
    
    
                                                        <Text style={{ fontSize: 34, color: 'white', fontWeight: 'bold' }}>{count - 4}+</Text>
    
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={() => nav.navigate('ScreenImageByPost', { idPost: idPost })} style={{ flex: 1 }}>
    
    
                                                <Image style={{ flex: 1, marginHorizontal: 1, marginVertical: 1 }} source={{ uri: url[0]! }} />
                                            </TouchableOpacity>
                                        </View>
    
                    }
    
                </View>
             
      

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10, marginVertical: 5 }}>
                <Text>0 comentarios</Text>
                <Text>0 compartidas</Text>
            </View>
            <View style={{ flexDirection: 'row',borderTopWidth:0.5,borderTopColor:'#ccc',paddingBottom:5,paddingTop:5, justifyContent: 'space-around', alignItems: 'center', margin: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={25} color={Primary} style={{ marginRight: 10 }} name={'heart-outline'} />
                    <Text style={{ color: 'black' }}>Me gusta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{ marginRight: 10 }} size={25} color={Primary} name={'document-text-outline'} />

                    <Text style={{ color: 'black' }}>Comentar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon style={{ marginRight: 10 }} size={25} color={Primary} name={'share-social-outline'} />

                    <Text style={{ color: 'black' }}>Compartir</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const style = StyleSheet.create({
    menu: {
        width: 5,
        height: 5,
        backgroundColor: 'black',
        marginVertical: 2,
        borderRadius: 100
    }
})