import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet, TextInput, FlatList } from 'react-native'
import { CardProfiles } from '../components/CardProfiles'
import { useAnimation } from '../hooks/useAnimation'
import auth from '@react-native-firebase/auth';
import { authContext } from '../components/AuthContext';
import { Primary } from '../colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';


interface user {
    name: string,
    displayName: string,
    img: string,
    lastNmae: string,
    idUser: string,
}

export const ConfigScreen = () => {
    const { signOut, state } = useContext(authContext);
    const { opacyti, fadeIn, fadeOut } = useAnimation();
    const [IsVisible, setIsVisible] = useState(false);
    const [friends, setFriends] = useState<user[]>([]);
    const showClose = () => {

        (!IsVisible) ? fadeIn() : fadeOut();
        (!IsVisible) ? setIsVisible(true) : setIsVisible(false);

    }
    useEffect(() => {
        traerAmigos();
    }, [])



    const traerAmigos = async () => {

        firestore().collection('amigos').where('id', '==', state.uid).onSnapshot(resp => {
            if (resp.size > 0) {

            }
        })

        firestore().collection('users').where('id', '!=', state.uid).onSnapshot(user => {



            const arr: string[] = user.docs.map(r => {
                return r.id;
            })
            // console.log(arr);



            firestore().collection('amigos').where('id', '==', state.uid).where('idFriends', 'array-contains-any', arr).onSnapshot(snap => {

                if (snap.size == 0) {
                    const data: user[] = user.docs.map(user => {
                        return {
                            name: user.get('name')!.toString(),
                            lastNmae: user.get('lastname')!.toString(),
                            displayName: user.get('displayName')!.toString(),
                            img: user.get('imgProfile')!.toString(),
                            idUser: user.id
                        }
                    })
                    console.log('no exite')
                    //console.log(data);
                    setFriends([...data]);

                } else {

                    const ids: any[] = snap.docs[0].get('idFriends')!.toString().split();
                    
                    console.log(ids);
                    ids.map(r => {
                        setFriends(resp => resp.filter(id => id.idUser !== r));
                    })
                }
            });


        });




    }

    const closeSession = () => {
        if (IsVisible) {
            showClose();
            auth().signOut();
            signOut();

        }





    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ECEEEF' }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: 'white', marginBottom: 1 }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ marginLeft: 5, color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>

                    <View style={{ flexDirection: 'row', height: 35, flex: 1, borderRadius: 90, paddingHorizontal: 5, marginHorizontal: 5, backgroundColor: '#ECEEEF', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput placeholder='Buscar' style={{ flex: 1, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }} />
                        <Icon color={Primary} style={{ textAlign: 'center', marginRight: 5, borderLeftColor: '#ccc' }} name={'search-outline'} size={20} />
                    </View>
                    <TouchableOpacity style={{ width: 15, alignItems: 'center', marginRight: 8 }} onPress={() => { showClose() }}>
                        <View style={style.menu} />
                        <View style={style.menu} />
                        <View style={style.menu} />

                    </TouchableOpacity>

                </View>
                <Animated.View style={{ borderRadius: 5, opacity: opacyti, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', width: 115, height: 30, right: 40, top: 13, backgroundColor: '#ECEEEF', position: 'absolute' }}>


                    <TouchableOpacity onPress={() => { closeSession() }} >
                        <Text style={{ color: Primary, fontWeight: 'bold' }}>Salir</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <FlatList

                data={friends}
                renderItem={({ item, index }) => (
                    <CardProfiles key={index} idUser={item.idUser!} displayName={item.displayName!} img={item.img!} />
                )}
            />


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