import React, {useEffect, useState} from "react";
import * as PartidosService from "../../services/PartidosServices";
import "../../sass/partidos.scss";

export default function VerPartidos(){
    const [partidos, setPartidos] = useState(undefined)

    useEffect(()=>{
        PartidosService.serviceListarPartidos()
            .then((data)=>{
                if(data && data.listaPartidos){
                    setPartidos(data.listaPartidos)
                }
            })
            .catch((error) =>{
                console.log(error)
            })
    },[]);

    return (
        <>
            <div className="jmdm-list_games">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Local</th>
                            <th>Visitante</th>
                            <th>Goles Local</th>
                            <th>Goles Visitantes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partidos && partidos.map( (partido,key)=>(
                                <tr key={key}>
                                    <td>{partido.fecha}</td>
                                    <td>{partido.equiposIdLocal.nombre}</td>
                                    <td>{partido.equiposIdVisitante.nombre}</td>
                                    <td>{partido.golesLocal}</td>
                                    <td>{partido.golesVisitante}</td>
                                    <td>
                                        <div>
                                            <a role="button" href={`/actualizar-partido/${partido.id}`} >Actualizar Marcador</a>
                                        </div>
                                    </td>
                                </tr>
                        ))}
                        {partidos && partidos.length === 0 &&
                                <tr>
                                    <td colspan="6">No hay partidos</td>
                                </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Fecha</th>
                            <th>Local</th>
                            <th>Visitante</th>
                            <th>Goles Local</th>
                            <th>Goles Visitantes</th>
                            <th>Acciones</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}