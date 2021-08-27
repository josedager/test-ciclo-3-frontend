import React from "react";
import "../../sass/header.scss"

export default function Header(){
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    return(
        <>
            <div>
                <ul className="jmdm-header">
                    <li><a className="active" href="/dashboard">Inicio</a></li>
                    <li><a href="/nuevo-partido">Nuevo Partido</a></li>
                    <li style={{float:"right"}}><a href="/logout">Cerrar Sesión</a></li>
                    <li style={{float:"right"}}><span>{usuario.nombre}</span></li>
                </ul>
            </div>
        </>
    );
}