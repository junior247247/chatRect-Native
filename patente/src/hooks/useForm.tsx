import React, { useState } from 'react'


export const useForm = <T extends object>(form:T) => {

    const [state, setstate] = useState(form);

    const onChange=(value:string,fiel:keyof T)=>{
        setstate({
            ...state,
            [fiel]:value
        })
    }
  return{
    ...state,
    onChange
  }
}
