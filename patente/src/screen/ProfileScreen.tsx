import React, { useState, useContext, useRef,useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image,FlatList } from 'react-native'
import { CardProfiles } from '../components/CardProfiles'
import { useAnimation } from '../hooks/useAnimation'
import auth from '@react-native-firebase/auth';
import { authContext } from '../components/AuthContext';
import { Primary } from '../colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { CardPostText } from '../components/CardPostText';
import { CardPost } from '../components/CardPost';

interface Post {
  idUser: string | undefined,
  img: string[] | undefined[],
  text: string | undefined,
  idPost: string | undefined,
  timestamp: string | undefined
}

interface Users{
  idUser:string,
  url:string,
  displayName:string
}



export const ProfileScreen = () => {
  const { signOut,state } = useContext(authContext);
  const { opacyti, fadeIn, fadeOut } = useAnimation();
  const [IsVisible, setIsVisible] = useState(false);
  const [Posts, setPost] = useState<Post[]>([]);
  const [Name, setName] = useState('');
  const [Count, setCount] = useState('');
  const [Images, setImages] = useState('');
 
  const { current } = useRef('https://firebasestorage.googleapis.com/v0/b/socialmediagamer-bb7d4.appspot.com/o/312278152_5712872142098721_8528669024002143528_n.jpg?alt=media&token=6836c1f0-33a7-4e2b-b948-46231eb2f69e');
  const showClose = () => {

    (!IsVisible) ? fadeIn() : fadeOut();
    (!IsVisible) ? setIsVisible(true) : setIsVisible(false);

  }


    
  useEffect(() => {
 
    firestore().collection('amigos').where('id','==',state.uid).onSnapshot(res=>{
      if(res!=null){
        if(res.size>0){

      
      
      const arr:any[]=res.docs[0].get('idFriends');
   
      setCount(arr.length+'');
      
    }
    }
    })
    
}, [])

  useEffect(() => {

    firestore().collection('users').doc(state.uid).onSnapshot(resp=>{

      if(resp!=null){
        setName(resp.get('displayName')!.toString());
        setImages(resp.get('imgProfile')!.toString());

      }
    });
    
  }, [])
  

  useEffect(() => {
    
    firestore().collection('Post').where('userId','==',state.uid).orderBy('timestamp', 'desc').onSnapshot(resp => {
        //console.log(resp.docs)
      if(resp!=null){

    

  const data: Post[] = resp.docs.map((item) => {
      return {
          idPost: item.id,
          img: (item.get('img')!.toString()) ? item.get('img')!.toString().split(',') : [],
          text: item.get('text')!.toString(),
          idUser: item.get('userId')!.toString(),
          timestamp: item.get('timestamp')!.toString()
      }
  })
  console.log(data)

  setPost([...data]);
}
});

  }, [])
  

  const closeSession = () => {
    if (IsVisible) {
      showClose();
      auth().signOut();
      signOut();

    }


  }
  return (
    <View style={{ flex: 1 ,backgroundColor:'white'}}>
      <View style={{ borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#ccc' }}>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ marginLeft: 5, color: Primary, fontSize: 24, fontWeight: 'bold', fontFamily: 'arial' }}>Talk Safe</Text>
          <View style={{ flex: 1 }} />
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
      <View style={{ height: 200 ,backgroundColor:'white'}}>


        <Image source={{uri:Images}} style={{ height: 170, backgroundColor: '#ccc' }}/>

        

        <Image source={{ uri: Images }} style={{ borderWidth: 2, borderColor: 'white', marginLeft: 10, width: 80, height: 80, borderRadius: 100, backgroundColor: 'red', position: 'absolute', bottom: -10 }} />

      <TouchableOpacity style={{backgroundColor:Primary,width:100,marginRight:10,marginTop:10,height:30,alignSelf:'flex-end',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text>Editar</Text>
      </TouchableOpacity>

        <View style={{ marginTop: 5, paddingHorizontal: 15,paddingBottom:15,backgroundColor:'white'}}>
          <Text style={{ color: 'black', fontWeight: 'bold' ,fontFamily:'Arial'}}>{Name.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{Count}</Text>
              <Text style={{ color: '#333', marginLeft: 5 }}>amigos</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>{Posts.length}</Text>
              <Text style={{ color: '#333', marginLeft: 5 }}>publicaciones</Text>
            </View>
          </View>


        </View>

       
     
      

      </View>

      <FlatList
                style={{ backgroundColor: '#ECEEEF' ,marginTop:60}}
                data={Posts}
               
                renderItem={({ item, index }) => (

                    (item.text != '' && item.img.length == 0) ?

                        <CardPostText key={index} idUser={item.idUser!} timestamp={item.timestamp!} text={item.text} />

                        : <CardPost timestamp={item.timestamp!} text={item.text!} url={item.img!} idUser={item.idUser!} idPost={item.idPost!} count={item.img.length} />

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