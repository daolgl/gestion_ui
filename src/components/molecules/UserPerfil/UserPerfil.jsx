import React, { useContext } from 'react'
import { Button, Card, CardText, CardTitle, Col, Row } from 'reactstrap'
import UserContext from '../../../contexts/UserContext/UserContext'
import UserTarea from '../../../contexts/UserContext/UserTarea'

export const UserPerfil = () => {
    const user = useContext(UserContext)
    const tarea = useContext(UserTarea)
  return (
    <>
     <Card
        body
        className="my-2"
        style={{
            border: "none"
        }}
    >
        <Row >
            <Col>
               
               <h1>Aqui va la foto</h1>
            </Col>
            <Col>
                <CardTitle tag="h5">
                {`${user.user.first_name} ${user.user.last_name}`}
                </CardTitle>
                <CardText>
                {user.user.email}
                </CardText>
                <Button color="danger" onClick={() =>{ 
                    user.setUser(null)
                    tarea.setTarea(false)
                    tarea.setTareaEdit(false)
                    }}>
                    Cerrar Sesión
                </Button>
            </Col>
        </Row>
    </Card>
    </>
    
  )
}
