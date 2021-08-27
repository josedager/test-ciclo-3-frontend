import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../../sass/login.scss";
import * as AuthService from "../../services/AuthServices";


export default function Login(props){
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const history = useHistory();

    function handleChange(evt){
        let {name, value} = evt.target;
        switch(name){
            case "login_user":
                setUsuario(value);
                break;

            case "login_password":
                setContrasena(value);
                break;

            default:
                break;
        }
    }

    function handleClick(evt){
        evt.preventDefault();
        let {name} = evt.target;
        if(name === "login_login"){
            let dto = {
                "usuario": usuario,
                "contrasena": contrasena
            }

            AuthService.serviceLogin(dto)
                .then((data) =>{
                    if(data && data.token){
                        localStorage.setItem("usuario", JSON.stringify(data));
                        props.autenticado(true);
                        history.push("/dashboard");
                    }
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
        else{
            props.autenticado(false);
            history.push("/registrar");
        }
        
    }

    return(
        <>
            <div className="jmdm-login">
                <div className="jmdm-login_div">
                    <form className="jmdm-login_form">
                        <div className="jmdm-login_user">
                            <label htmlFor="login_user">Usuario: </label>
                            <input type="text" id="login_user" name="login_user" placeholder="Usuario" onChange={handleChange} />
                        </div>
                        <div className="jmdm-login_password">
                            <label htmlFor="login_password">Contraseña: </label>
                            <input type="password" id="login_password" name="login_password" onChange={handleChange} />
                        </div>
                        <div className="jmdm-login_buttons">
                            <button className="jmdm-login_button_login" type="button" name="login_login" onClick={handleClick}>Iniciar Sesión</button>
                            <button className="jmdm-login_button_register" type="button" name="login_register" onClick={handleClick}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}