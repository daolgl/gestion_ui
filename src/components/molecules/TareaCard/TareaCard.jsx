import React, { useContext } from 'react'
import { Button, Card, CardText, CardTitle } from 'reactstrap'
import UserTarea from '../../../contexts/UserContext/UserTarea'

export const TareaCard = ({id, actividad, asignado, estatus}) => {
    const tarea = useContext(UserTarea)
  return (
    <Card
    body
    className="text-center m-2"
  >
    <CardTitle tag="h5">
      {actividad}
    </CardTitle>
    <CardText>
      Asignado: {asignado}
    </CardText>
    <CardText>
      Estatus: {estatus}
    </CardText>
    <Button color="primary" onClick={() => tarea.setTareaEdit({tarea:true, id})}>
      Ver
    </Button>
  </Card>
  )
}
