import React,{useRef} from 'react'
import { Animated } from 'react-native';

export const useAnimation = () => {
    const opacyti = useRef(new Animated.Value(0)).current;

    const fadeIn=()=>{
        Animated.timing(opacyti,{
            toValue:1,
            useNativeDriver:true,
            duration:100
        }).start();
    }

    const fadeOut=()=>{
        Animated.timing(opacyti,{
            toValue:0,
            useNativeDriver:true,
            duration:100
        }).start();
    }


    return{
        fadeIn,
        fadeOut,
        opacyti
    }
}
