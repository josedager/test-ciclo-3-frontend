import React, {useEffect, useState} from "react";
import * as EquiposServices from "../../services/EquiposServices";
import * as PartidosServices from "../../services/PartidosServices";
import "../../sass/partidos.scss";
import { useHistory } from "react-router-dom";

export default function VerPartidos(){
    const [partido, setPartido] = useState({ new_game_date: "", new_game_local: "", new_game_gol_local: "", new_game_visitante: "", new_game_gol_visitante: "",  })
    const [equipos, setEquipos] = useState(undefined)
    const history = useHistory();

    useEffect(()=>{
        EquiposServices.serviceListarEquipos()
            .then((data)=>{
                if(data){
                    setEquipos(data)
                }
            })
            .catch((error) =>{
                console.log(error)
            })
    },[]);

    function handleChange(evt){
        let { name, value } = evt.target;
        setPartido((prev)=>({
            ...prev,
            [name] : value
        }));
    }

    function handleClick(evt){
        evt.preventDefault();
        let {name} = evt.target;
        if(name === "new_game_new_game"){
            let dto = {
                "usuarios_id": JSON.parse(localStorage.getItem("usuario")).id,
                "equipos_id_local": partido.new_game_local,
                "equipos_id_visitante": partido.new_game_visitante,
                "fecha": partido.new_game_date,
                "goles_local": partido.new_game_gol_local,
                "goles_visitante": partido.new_game_gol_visitante 
            }
            
            PartidosServices.serviceNuevoPartido(dto)
                .then((data)=>{
                    if(data && data.mensaje){
                        history.push("/dashboard");
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        else{
            history.push("/");
        }
    }

    return (
        <>
        <div className="jmdm-new_game">
            <div className="jmdm-new_game_div">
                <form className="jmdm-new_game_form">
                    <div className="jmdm-new_game_date">
                        <label htmlFor="new_game_date">Fecha: </label>
                        <input type="text" id="new_game_date" name="new_game_date" placeholder="Fecha(YYYY-MM-DD)" onChange={handleChange} />
                    </div>
                    <div className="jmdm-new_game_local">
                        <label htmlFor="new_game_local">Equipo Local: </label>
                        <select id="new_game_local" name="new_game_local" onChange={handleChange}>
                            <option key={`local-0`} value="-1">Seleccione un equipo local</option>
                            {equipos && equipos.map((equipo, key) => (
                                <option key={`local-${key}`} value={equipo.id}>{equipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="jmdm-new_game_gol_local">
                        <label htmlFor="new_game_gol_local">Goles Local: </label>
                        <input type="text" id="new_game_gol_local" name="new_game_gol_local" placeholder="Goles Local" onChange={handleChange} />
                    </div>
                    <div className="jmdm-new_game_visitante">
                        <label htmlFor="new_game_visitante">Equipo Visitante: </label>
                        <select id="new_game_visitante" name="new_game_visitante" onChange={handleChange}>
                            <option key={`visitante-0`} value="-1">Seleccione un equipo visitante</option>
                            {equipos && equipos.map((equipo, key) => (
                                <option key={`visitante-${key}`} value={equipo.id}>{equipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="jmdm-new_game_gol_visitante">
                        <label htmlFor="new_game_gol_visitante">Goles Visitante: </label>
                        <input type="text" id="new_game_gol_visitante" name="new_game_gol_visitante" placeholder="Goles Visitante" onChange={handleChange} />
                    </div>
                    <div className="jmdm-new_game_buttons">
                        <button className="jmdm-new_game_button_new_game" type="button" name="new_game_new_game" onClick={handleClick}>Registrar</button>
                        <button className="jmdm-new_game_button_return" type="button" name="new_game_return" onClick={handleClick}>Regresar</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}