import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as AuthService from "../../services/AuthServices";
import "../../sass/register.scss";

export default function Registrar(props){
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const history = useHistory();

    function handleChange(evt){
        let {name, value} = evt.target;
        switch(name){
            case "register_name":
                setNombre(value);
                break;

            case "register_email":
                setCorreo(value);
                break;

            case "register_user":
                setUsuario(value);
                break;

            case "register_password":
                setContrasena(value);
                break;

            default:
                break;
        }
    }

    function handleClick(evt){
        evt.preventDefault();
        let {name} = evt.target;
        if(name === "register_register"){
            let dto = {
                "nombre": nombre,
                "correo": correo,
                "usuario": usuario,
                "contrasena": contrasena 
            }
            console.log(nombre, correo, usuario, contrasena)
            AuthService.serviceRegister(dto)
                .then((data)=>{
                    if(data && data.mensaje){
                        history.push("/login");
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        else{
            history.push("/login");
        }
    }

    return(
        <>
        <div className="jmdm-register">
            <div className="jmdm-register_div">
                <form className="jmdm-register_form">
                    <div className="jmdm-register_name">
                        <label htmlFor="register_name">Nombre: </label>
                        <input type="text" id="register_name" name="register_name" placeholder="Nombre Completo" onChange={handleChange} />
                    </div>
                    <div className="jmdm-register_email">
                        <label htmlFor="register_email">Correo electrónico: </label>
                        <input type="text" id="register_email" name="register_email" placeholder="E-mail" onChange={handleChange} />
                    </div>
                    <div className="jmdm-register_user">
                        <label htmlFor="register_user">Usuario: </label>
                        <input type="text" id="register_user" name="register_user" placeholder="Usuario" onChange={handleChange} />
                    </div>
                    <div className="jmdm-register_password">
                        <label htmlFor="register_password">Contraseña: </label>
                        <input type="password" id="register_password" name="register_password" onChange={handleChange} />
                    </div>
                    <div className="jmdm-register_buttons">
                        <button className="jmdm-register_button_register" type="button" name="register_register" onClick={handleClick}>Registrar</button>
                        <button className="jmdm-register_button_return" type="button" name="register_return" onClick={handleClick}>Regresar</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}