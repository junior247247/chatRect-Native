
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { Primary } from '../colors/Colors';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
interface Props {
    text: string | undefined,
    timestamp: string,
    idUser: string,
}

export const CardPostText = ({ idUser, timestamp, text }: Props) => {

    const [images, setimages] = useState('');
    const [name, setName] = useState('');
    const [times, setTimes] = useState('');
    useEffect(() => {
     
            firestore().collection('users').doc(idUser.trim()).get().then(resp => {
          
            setimages(resp.get('imgProfile')!.toString());
            setName(resp.get('displayName')!.toString());
            var date = new Date(Number(timestamp));
            setTimes(date.getDay().toString() + ' - ' + date.getMonth().toString() + ' - ' + date.getFullYear().toString());
        })
     
    }, [])


    return (
        <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#ECEEEF', borderTopWidth: 1, borderTopColor: '#ECEEEF', marginVertical: 10 }}>
            <TouchableOpacity activeOpacity={0.5} style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ borderRadius: 100, borderWidth:1,borderColor:Primary,height: 40, width: 40 }} source={{ uri: images! }} />

                    <View style={{ marginLeft: 5, justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: Primary, fontSize: 14 }}>{name}</Text>
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{times}</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: 5 }}>
                        <View style={style.menu} />
                        <View style={style.menu} />
                        <View style={style.menu} />

                    </TouchableOpacity>
                </View>

                <Text style={{ marginTop: 10, fontSize: 12, color: 'black' }}>{text}</Text>


            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 10, marginVertical: 5 }}>
                <Text>0 Me gustas</Text>
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