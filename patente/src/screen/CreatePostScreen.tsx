import React, { useEffect, useState, useContext, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ToastAndroid,ActivityIndicator } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Primary } from '../colors/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

import { useCreateFire } from '../components/useCreateFire';
import { authContext } from '../components/AuthContext';

import { firebaseConfig } from '../data/ConfigFirebase';

import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { RootParams } from '../stack/StackNavigation';


interface File {
    name: string | undefined,
    base64: string | undefined,
    uri: string | undefined,
    type: string | undefined
}


interface Props extends StackScreenProps<RootParams, 'CreatePostScreen'> { };

export const CreatePostScreen = ({ navigation }: Props) => {

    const [fileImages, setfileImages] = useState<File[]>([]);
    const [text, setText] = useState('');
    const { state: contexState } = useContext(authContext);
    
        
       const [Isloading, setIsloading] = useState(false); 
   
    const url = useRef<string[]>([]);







    const uploadImage = async () => {


        save();






    }

    const getUri = async (file: string) => {
        const ref = await storage().ref('img' + new Date().getTime().toString());

        const response = await fetch(file);
        const blob = await response.blob();
        const task = await ref.put(blob);

        const url = await ref.getDownloadURL();
        return url;
    }


    const save = async () => {
        if (text || fileImages.length > 0) {
            setIsloading(true);

            if (fileImages.length > 0) {


                for (let i = 0; i < fileImages.length; i++) {

                    if (fileImages[i].uri != undefined) {
                        const r = await getUri(fileImages[i].uri!);
                        url.current[i] = r;
                        //ToastAndroid.show(r,ToastAndroid.SHORT);
                    }

                }
            }


         const resp=  await  firestore().collection('Post').add({
                img: url.current,
                text: text,
                userId: contexState.uid,
                timestamp: new Date().getTime()
            });
            setIsloading(false);
        
                navigation.pop();
            


        } else {
            ToastAndroid.show('ingresa una imagen o una descriptiom',ToastAndroid.SHORT);
        }


    }


    const openGaleryVideo = () => {
        launchImageLibrary({ mediaType: 'video', includeBase64: true, selectionLimit: 1 }, resp => {
            if (resp.didCancel) return;
            if (!resp.assets![0].base64) return;
        })
    }

    const openGalery = () => {

        launchImageLibrary({ mediaType: 'photo', includeBase64: true, includeExtra: true, selectionLimit: 5, }, resp => {
            if (resp.didCancel) return;
            if (!resp.assets![0].base64) return;

            const img: File[] = resp.assets!.map((item) => {
                return {
                    name: item.fileName,
                    base64: item.base64,
                    uri: item.uri,
                    type: item.type
                }
            })
            setfileImages([...fileImages, ...img]);

        })
    }

    return (
        <View style={{flex:1}}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomColor: '#ECEEEF', justifyContent: 'space-around', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => openGaleryVideo()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'videocam-outline'} size={30} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openGalery()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'images-outline'} size={30} />
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Foto</Text>
                    </TouchableOpacity>

                </View>



            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: 'row', flexWrap: 'wrap' }}>

                {
                    fileImages.map((item, index) => (
                        <Image key={index} source={{ uri: item?.uri }} style={{ width: 120, height: 120, marginHorizontal: 6, marginVertical: 5 }} />
                    ))
                }


            </View>

            <TextInput onChangeText={(txt) => setText(txt)} multiline style={{ paddingHorizontal: 5, color: 'black', marginVertical: 20, width: 350, backgroundColor: '#ECEEEF', alignSelf: 'center', borderRadius: 10 }} placeholderTextColor={'black'} placeholder='Escribe algo' />
            <TouchableOpacity onPress={() => uploadImage()} activeOpacity={0.7} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: (Isloading)?'#ccc':Primary, height: 50, marginHorizontal: 20, marginTop: 60 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Publicar</Text>
            </TouchableOpacity>
            {
                (Isloading) &&             <ActivityIndicator  style={{position:'absolute',top:'50%',alignSelf:'center'}} color={Primary} size={70}/>
            }

        </View>
    )
}
