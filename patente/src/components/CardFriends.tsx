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

    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 5, padding: 4 }}>
                <Image source={{ uri: url }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 2 }}>
                    <Text style={{color:'black',marginVertical:3}}>{displayName.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => { nav.navigate('MessageScreen', { idUser: idUser }) }} activeOpacity={0.7} style={{ borderRadius: 10, width: 50, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: Primary }}>

                        <Icon style={{ lineHeight: 30 }} color={'white'} name={'chatbubbles-outline'} size={25} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        </View>
    )
}
