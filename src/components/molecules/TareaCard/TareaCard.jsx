import React, { useContext } from 'react'
import UserTarea from '../../../contexts/UserContext/UserTarea'
import clock from '../../atoms/clock.png'
import user from '../../atoms/user.png'
import './card.css'
export const TareaCard = ({id, actividad, asignado, estatus}) => {
  
  let color = estatus === "En Proceso" ? "status-yellow" : estatus === "Completado" ? "status-green" : "status-red" 


    const tarea = useContext(UserTarea)
  return (
    <div className="tarea-card">
    <h5>
      {actividad}
    </h5>
    <h6>
    <img src={user} alt="user"/>  Asignado: {asignado}
    </h6>
    <h6>
    <img src={clock} alt="clock" /> Estatus: <span className={color}>{estatus}</span> 
    </h6>
    <button className="tarea-card_button" st onClick={() => tarea.setTareaEdit({tarea:true, id})}>
      Ver
    </button>
  </div>
  )
}
