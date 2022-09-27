import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { useApi } from '../../../hooks/useApi/useApi';
import UserContext from '../../../contexts/UserContext/UserContext';
import UserTarea from '../../../contexts/UserContext/UserTarea';


export const HomeForm = () => {
  const user = useContext(UserContext)
  const tarea = useContext(UserTarea)
  const usuarios = useApi('http://localhost:8080/api/users/')
//   console.log(usuarios)
//   console.log(usuarios.isLoading)
  const url = "http://localhost:8080/api/tareas/"
  return (
    <>
        <Container>
            <Formik
            initialValues={{
                tarea: "",
                descripcion: ""
            }}
            validate={values => {
                const errors = {};
                if (!values.consulta) {
                errors.tarea = 'Required';
                } 
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                let data ={
                  }

                  console.log(data)
                fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{
                    'Content-Type': 'application/json'
                    }})
                    .then(res => res.json())
                    .catch(error =>{ 
                    console.error('Error:', error)
                    setSubmitting(false);
                })
                    .then(response =>{ 
                    console.log('Success:', response)
                    setSubmitting(false);
                    tarea.setTarea(false)
                });
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    
                <h1>Tareas Pendientes</h1>
                    <Row >
                            <Field type="text" name="consulta" style={{"width": "50vw"}} placeholder="Filtro: Nombre, Asignado, Estatus" />
                            {/* <ErrorMessage name="consulta" component="div" /> */}
                    </Row>
    
                    <Row >
                        <Button  style={{"width": "20vw"}} onClick={() => tarea.setTarea(true)} className="mt-4" color="info" size="sm"> Nueva Tarea </Button>
                        <Button  style={{"width": "20vw"}} type="submit" className="mt-4" color="info" size="sm"> Consultados </Button>
                    </Row>
                </Form>
            )}
            </Formik>
        </Container>
    </>
    
  )
}
