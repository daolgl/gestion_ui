import React from 'react'
import { Row } from 'reactstrap'
import { TareaCard } from '../../molecules/TareaCard/TareaCard'
import "./tareaList.css"
export const TareasList = ({tareas}) => {
  return (
    <>
      <div className='tarea-list'>
            {
              tareas.data?.length === 0 && <h2>No hay tareas</h2>
            }
            {
                !tareas.isLoading && tareas.data.map(tarea =>
                    <TareaCard key={tarea.id} id={tarea.id} actividad={tarea.actividad} asignado={`${tarea.first_name} ${tarea.last_name}`} estatus ={tarea.estatus_actividad} />
                )
            }
     </div>
  </>
  )
}
