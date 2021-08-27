import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Logout(props){
    localStorage.clear();
    useEffect(()=>{
        props.autenticado(false);
    },[props])
    
    return(
        <>
            <Redirect to="/" />
        </>
    );
}