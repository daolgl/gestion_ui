import React from 'react'
import { Col, Row } from 'reactstrap'
import { useApi } from '../../../hooks/useApi/useApi'
import { TareaCard } from '../../molecules/TareaCard/TareaCard'

export const TareasList = () => {
    const tareas = useApi('http://localhost:8080/api/tareas/')
    console.log(tareas)


  return (
    <>
        <Row xs="5" >
            {
                !tareas.isLoading && tareas.data.map(tarea =>
                    <TareaCard id={tarea.id} actividad={tarea.actividad} asignado={tarea.asignado} estatus ={tarea.estatus_actividad} />
                )
            }
    </Row>
  </>
  )
}
