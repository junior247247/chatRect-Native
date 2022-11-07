import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { CardPost } from '../components/CardPost'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from '../colors/Colors';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any,any>{};

export const HomeScreen = ({navigation}:Props) => {
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
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'videocam-outline'} size={30} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'images-outline'} size={30} />
                        <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>Foto</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <CardPost />

          
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