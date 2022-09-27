import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/organisms/NavBar/NavBar';
import { useApi } from '../../hooks/useApi/useApi';
import UserContext from '../../contexts/UserContext/UserContext';
import UserTarea from '../../contexts/UserContext/UserTarea';

export const Tarea = () => {
  const user = useContext(UserContext)
  const tarea = useContext(UserTarea)
  const usuarios = useApi('http://localhost:8080/api/users/')
//   console.log(usuarios)
//   console.log(usuarios.isLoading)
  const url = "http://localhost:8080/api/tareas/"
  return (
    <>
        <NavBar text={"Agregar Nueva Tarea"}/>
        <Container>
            <Formik
            initialValues={{
                tarea: "",
                descripcion: ""
            }}
            validate={values => {
                const errors = {};
                if (!values.tarea) {
                errors.tarea = 'Required';
                } 
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                let data ={  
                    actividad: values.tarea, 
                    usuario : user.user.id, 
                    estatus_actividad: "Pendiente", 
                    descripcion_actividad: values.descripcion, 
                    documento_entregable: "a", 
                    asignado: values.asignar,
                    fecha_envio: "2022-09-10", 
                    fecha_final: "2022-09-30",
                    isAcepted: false
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
                    // console.error('Error:', error)
                    setSubmitting(false);
                })
                    .then(response =>{ 
                    // console.log('Success:', response)
                    setSubmitting(false);
                    tarea.setTarea(false)
                });
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Row >
                            <label htmlFor="tarea" style={{"width": "10vw"}}>Tarea: </label>

                            <Field type="text" name="tarea" style={{"width": "20vw"}}/>
                            <ErrorMessage name="tarea" component="div" />
                    </Row>
                    <Row style={{"width": "60vw"}} className="mt-4">
                        <label htmlFor="asignar" style={{"width": "10vw"}}>Asignar: </label>
                        <Field name="asignar" placeholder="Asignar" style={{"width": "20vw"}}  as="select" defaultValue={"DEFAULT "}>
                            <option value="DEFAULT" hidden>
                                Selecciona a que se le asignara la tarea
                            </option>
                        {!usuarios.isLoading && usuarios.data.map( usuario => !usuario.admin &&
                            <option key={usuario.id} value={usuario.id}>
                                {`${usuario.first_name} ${usuario.last_name}`}
                            </option>
                        )}
                        </Field>
                        <ErrorMessage name="asignar" component="div" />
                    </Row>
                    <Row style={{"width": "60vw"}} className="mt-4">
                        <label htmlFor="descripcion" style={{"width": "5vw"}}>Descripcion: </label>
                        <Field component="textarea" name="descripcion" className="mt-2" />
                        <ErrorMessage name="descripcion" component="div" />
                    </Row>
                    <Row >
                        <Col
                        md={{
                            offset: 3,
                            size: 2
                        }}
                        >
                        <Button  style={{"width": "20vw"}} onClick={()=> tarea.setTarea(false)} className="mt-4" color="info" size="sm"> Regresar </Button>
                        <Button  style={{"width": "20vw"}} type="submit" className="mt-4" color="info" size="sm"> Guardar </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
        </Container>
    </>
    
  )
}
