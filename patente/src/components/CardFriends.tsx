import React, { useRef } from 'react'

import { View, Image, Text } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Primary } from '../colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Props {
    displayName: string,
    idUser: string,
    url: string
}

export const CardFriends = ({ displayName, idUser, url }: Props) => {
    const nav = useNavigation();
    const { current } = useRef('https://firebasestorage.googleapis.com/v0/b/socialmediagamer-bb7d4.appspot.com/o/312278152_5712872142098721_8528669024002143528_n.jpg?alt=media&token=6836c1f0-33a7-4e2b-b948-46231eb2f69e');

    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 5, padding: 4 }}>
                <Image source={{ uri: url }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 2 }}>
                    <Text style={{color:'black'}}>{displayName}</Text>
                    <TouchableOpacity onPress={() => { nav.navigate('MessageScreen', { idUser: idUser }) }} activeOpacity={0.7} style={{ borderRadius: 20, width: 50, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Primary }}>

                        <Icon style={{ lineHeight: 30 }} color={'white'} name={'chatbubbles-outline'} size={25} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        </View>
    )
}
