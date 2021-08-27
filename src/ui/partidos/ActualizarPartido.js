import React, {useEffect, useState} from "react";
import * as PartidosServices from "../../services/PartidosServices";
import "../../sass/partidos.scss";
import { useHistory  } from "react-router-dom";

export default function VerPartidos(props){
    const [partido, setPartido] = useState(undefined)
    const [marcador, setMarcador] = useState({update_game_gol_local: "", update_game_gol_visitante: ""})
    const history = useHistory();

    useEffect(()=>{
        PartidosServices.serviceListarPartido(props.match.params.id)
            .then((data)=>{
                if(data){
                    setPartido(data)
                    setMarcador({
                        update_game_gol_visitante: data.golesVisitante,
                        update_game_gol_local: data.golesLocal
                    });
                }
            })
            .catch((error) =>{
                console.log(error)
            })
    },[props.match.params.id]);

    function handleChange(evt){
        let { name, value } = evt.target;
        setMarcador((prev)=>({
            ...prev,
            [name] : value
        }));
    }

    function handleClick(evt){
        evt.preventDefault();
        let {name} = evt.target;
        if(name === "update_game_update_game"){
            let dto = {
                "partidosID": partido.id,
                "golesLocal": marcador.update_game_gol_local,
                "golesVisitante": marcador.update_game_gol_visitante 
            }
            
            PartidosServices.serviceActualizarPartido(dto)
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
        <div className="jmdm-update_game">
            <div className="jmdm-update_game_div">
                <form className="jmdm-update_game_form">
                    <div className="jmdm-update_game_date">
                        <label htmlFor="update_game_date">Fecha: </label>
                        <input readOnly disabled type="text" id="update_game_date" name="update_game_date" defaultValue={partido && partido.fecha} />
                    </div>
                    <div className="jmdm-update_game_local">
                        <label htmlFor="update_game_local">Equipo Local: </label>
                        <input readOnly disabled type="text" id="update_game_local" name="update_game_local" defaultValue={partido && partido.equiposIdLocal.nombre} />
                    </div>
                    <div className="jmdm-update_game_gol_local">
                        <label htmlFor="update_game_gol_local">Goles Local: </label>
                        <input type="text" id="update_game_gol_local" name="update_game_gol_local" placeholder="Goles Local" onChange={handleChange} value={marcador.update_game_gol_local} />
                    </div>
                    <div className="jmdm-update_game_visitante">
                        <label htmlFor="update_game_visitante">Equipo Visitante: </label>
                        <input readOnly disabled type="text" id="update_game_visitante" name="update_game_visitante" placeholder="Goles Visitante" defaultValue={partido && partido.equiposIdVisitante.nombre} />
                    </div>
                    <div className="jmdm-update_game_gol_visitante">
                        <label htmlFor="update_game_gol_visitante">Goles Visitante: </label>
                        <input type="text" id="update_game_gol_visitante" name="update_game_gol_visitante" onChange={handleChange} value={marcador.update_game_gol_visitante}/>
                    </div>
                    <div className="jmdm-update_game_buttons">
                        <button className="jmdm-update_game_button_update_game" type="button" name="update_game_update_game" onClick={handleClick}>Actualizar</button>
                        <button className="jmdm-update_game_button_return" type="button" name="update_game_return" onClick={handleClick}>Regresar</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}