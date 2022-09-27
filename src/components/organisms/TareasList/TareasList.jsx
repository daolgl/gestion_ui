import React from 'react'
import { Row } from 'reactstrap'
import { TareaCard } from '../../molecules/TareaCard/TareaCard'

export const TareasList = ({tareas}) => {

  return (
    <>
        <Row xs="5" >
            {
              tareas.data?.length === 0 && <h2>No hay tareas</h2>
            }
            {
                !tareas.isLoading && tareas.data.map(tarea =>
                    <TareaCard key={tarea.id} id={tarea.id} actividad={tarea.actividad} asignado={tarea.asignado} estatus ={tarea.estatus_actividad} />
                )
            }
    </Row>
  </>
  )
}
