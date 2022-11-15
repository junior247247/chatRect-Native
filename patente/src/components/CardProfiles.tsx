import React, { useEffect, useState, useContext } from 'react'
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Primary } from '../colors/Colors';

import firestore from '@react-native-firebase/firestore';
import { authContext } from './AuthContext';
interface Props {
    displayName: string,
    img: string,
    idUser: string
}

interface solicitud {
    solicito: boolean,
    recibio: boolean
}

export const CardProfiles = ({ img, displayName, idUser }: Props) => {
    const [soli, setSoli] = useState<solicitud>({ solicito: false, recibio: false });
    const idUsers = [idUser];
    const { state } = useContext(authContext);
    useEffect(() => {
        console.log(state.uid)
        firestore().collection('solicitudes').where('Recibido', '==', state.uid).where('isAccep', '==', false).get().then(resp => {
            if (resp.size > 0) {
                setSoli({ ...soli, recibio: true });
            }
        });
    }, [soli.recibio])


    useEffect(() => {
        firestore().collection('solicitudes').where('isAccep', '==', false).where('Solicitante', '==', state.uid).get().then(resp => {
            if (resp.size > 0) {
                setSoli({ ...soli, solicito: true });
            }
        });
    }, [soli.solicito])

    const aceptarSolicitud = () => {

        firestore().collection('amigos').where('id', '==', state.uid).get().then(resp => {
            if (resp.size > 0) {
                const amigos: any[] = resp.docs.map(res => {
                    return res.get('idFriends')?.toString();
                })

                amigos.push(idUser);

                firestore().collection('solicitudes').where('Solicitante','==',idUser).where('isAccep', '==', false).where('Recibido','==',state.uid).get().then(res=>{
                    if(res.size>0){
                        res.docs.map(resp=>{
                            const id=resp.id;
                            firestore().collection('amigos').doc(id).update({ isAccep:true})                 
                        })
                    }
                })

                firestore().collection('amigos').doc(state.uid).update({idFriends: amigos})
                firestore().collection('amigos').doc(idUser).update({idFriends: amigos})
            } else {
                firestore().collection('amigos').doc(state.uid).set({
                    id: state.uid,
                    idFriends: idUsers
                })

                firestore().collection('amigos').doc(idUser).set({
                    id: idUser,
                    idFriends: idUsers
                })

                
            }
        })

    }

    const enviarSolicitu = () => {
        firestore().collection('solicitudes').add({
            Solicitante: state.uid,
            Recibido: idUser,
            isAccep: false
        })
        setSoli({ ...soli, solicito: true });
    }


    return (

        <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10 }}>
            <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 100 }} />
            <View style={{ marginLeft: 5 }}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>{displayName}</Text>
                <Text style={{ fontSize: 12 }}>3 amigos en comun</Text>

                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', width: '100%' }}>
                    {
                        (soli.solicito) ?

                            <TouchableOpacity activeOpacity={1} style={{ width: 150, height: 35, backgroundColor: Primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Solicitud enviada</Text>

                            </TouchableOpacity>
                            :
                            (soli.recibio) ?
                                <TouchableOpacity onPress={() => aceptarSolicitud()} style={{ width: 150, height: 35, backgroundColor: Primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Aceptar Solicitut</Text>

                                </TouchableOpacity>
                                :
                                (!soli.recibio && !soli.solicito) &&
                                <TouchableOpacity onPress={() => enviarSolicitu()} style={{ width: 150, height: 35, backgroundColor: Primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Agregar</Text>

                                </TouchableOpacity>
                    }

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 35, marginHorizontal: 20, borderRadius: 10, width: 150, backgroundColor: '#ccc' }}>
                        <Text style={{ fontWeight: 'bold' }}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
