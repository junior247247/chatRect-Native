import React,{useEffect,useState,useContext, useRef} from 'react'
import {View,Text,TouchableOpacity,Image, ToastAndroid} from 'react-native'
import { Primary } from '../colors/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref,uploadBytes,uploadString,getDownloadURL  } from "firebase/storage";
import { async } from '@firebase/util';
import { useCreateFire } from '../components/useCreateFire';
import { authContext } from '../components/AuthContext';

//import { getFirestore, collection,doc,getDoc } from 'firebase/firestore/lite';
import { collection, getDocs,getFirestore } from "firebase/firestore";


import { firebaseConfig } from '../data/ConfigFirebase';
import { initializeApp } from "firebase/app";
import { useForm } from '../hooks/useForm';

interface File{
    name:string|undefined,
    base64:string|undefined,
    uri:string|undefined,
    type:string|undefined
}

export const CreatePostScreen = () => {

    const [fileImages, setfileImages] = useState<File[]>([]);
    const [text, setText] = useState('');
    const {state:contexState} = useContext(authContext);
    const {texto,img,userId,onChange} =    useForm({texto:'',img:'',userId:''})
    const [images, setimages] = useState<string[]>([]);
   const url=  useRef<string[]>([]);
    useEffect(() => {
        getData();
    }, [])
    


    const getData=()=>{
        const firebaseConfig2 = {
            apiKey: "AIzaSyBVfBR3kgY18SeGL28ZRy9gR1xUBFZsYno",
            authDomain: "socialmediagamer-bb7d4.firebaseapp.com",
            projectId: "socialmediagamer-bb7d4",
            storageBucket: "socialmediagamer-bb7d4.appspot.com",
            messagingSenderId: "528005352144",
            appId: "1:528005352144:web:c01afea33730fe251eecd5"
          };
    
            const app = initializeApp(firebaseConfig2);
             const db = getFirestore(app);
        get(db).then(resp=>{
            console.log(resp);
        });
    }

const get= async(db:any)=>{
   
         const citiesCol = collection(db, 'Post');
         const citySnapshot = await getDocs(citiesCol);
         const cityList = citySnapshot.docs.map(doc => doc.data());
         //console.log(cityList);
         return cityList;



 
}
   

    const uploadImage= async()=>{
     
        


        //fileImages.map(resp=>{
         
             save(); 
    
          
      //  })

    }

    const getUri= async(file:string)=>{
        const storage = getStorage();
        const storageRef = ref(storage, new Date().getTime().toString());
        const response = await fetch(file); 
        const blob = await response.blob(); 
        const metadata = {
            contentType: 'image/jpeg',
          };
        
         const task= await  uploadBytes(storageRef,blob,metadata);
         const t=await getDownloadURL(task.ref); 

         return t;
    }


    const save=async(file?:string)=>{

        const metadata = {
            contentType: 'image/jpeg',
          };    
      
          for(let i=0; i<fileImages.length ; i++){

            if(fileImages[i].uri!=undefined){
                const r=await getUri(fileImages[i].uri!);
                url.current[i]=r;
                ToastAndroid.show(r,ToastAndroid.SHORT);
            }
           
          }
      //  ToastAndroid.show('asd',ToastAndroid.LONG);
      
          
        
         const app = initializeApp(firebaseConfig);
         const db = getFirestore(app);
     
         await addDoc(collection(db, 'Post'), {
            texto:texto,
            img:url.current,
            userId:contexState.uid
           });
        ToastAndroid.show('creado',ToastAndroid.SHORT);
    }


    const openGaleryVideo=()=>{
        launchImageLibrary({mediaType:'video',includeBase64:true,selectionLimit:1},resp=>{
            if(resp.didCancel)return;
            if(!resp.assets![0].base64)return;
        })
    }

    const openGalery=()=>{
   
        launchImageLibrary({mediaType:'photo',includeBase64:true, includeExtra:true,selectionLimit:5,},resp=>{
            if(resp.didCancel)return;
            if(!resp.assets![0].base64)return;
            const img:File={
                name:resp.assets![0].fileName,
                base64:resp.assets![0].base64,
                uri:resp.assets![0].uri,
                type:resp.assets![0].type
            }
            setfileImages([...fileImages,img]);
               
        })
    }

  return (
   <View>
      <View style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}>
        <View style={{flexDirection:'row',margin:10}}>
           <Text style={{color:Primary,fontSize:24,fontWeight:'bold',fontFamily:'arial'}}>Talk Safe</Text>
        </View>

        <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomColor: '#ECEEEF', justifyContent: 'space-around', borderBottomWidth: 1, paddingBottom: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={()=>openGaleryVideo()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'videocam-outline'} size={30} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>openGalery()} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                        <Icon color={Primary} name={'images-outline'} size={30} />
                        <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>Foto</Text>
                    </TouchableOpacity>

                </View>

              
        
        </View>
            <View style={{marginHorizontal:20,marginVertical:10,flexDirection:'row',flexWrap:'wrap'}}>
           
                {
                    fileImages.map((item,index)=>(
                        <Image key={index} source={{uri:item?.uri}} style={{width:120,height:120,marginHorizontal:6,marginVertical:5}}/>
                    ))
                }
              
          
            </View>
          
        <TextInput onChangeText={(txt)=>onChange(txt,'texto')}  multiline style={{paddingHorizontal:5,color:'black',marginVertical:20,width:350,backgroundColor:'#ECEEEF',alignSelf:'center',borderRadius:10}}placeholderTextColor={'black'} placeholder='Escribe algo' />
        <TouchableOpacity onPress={()=>uploadImage()} activeOpacity={0.7} style={{alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:Primary,height:50,marginHorizontal:20,marginTop:60}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Publicar</Text>
        </TouchableOpacity>
   </View>
  )
}
