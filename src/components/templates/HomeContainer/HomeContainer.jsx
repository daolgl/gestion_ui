import React, { useContext, useState } from 'react'
import { useApi } from '../../../hooks/useApi/useApi'
import { NavBar } from '../../organisms/NavBar/NavBar'
import { TareasList } from '../../organisms/TareasList/TareasList'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import UserTarea from '../../../contexts/UserContext/UserTarea';

export const HomeContainer = () => {
  const [url, setUrl] = useState('http://localhost:8080/api/tareas/')
  const [filtro, setFiltro] =useState('')
  const [tareasFiltradas, setTareasFiltradas] =useState({data: [], isLoading: false})
  const tarea = useContext(UserTarea)


  const tareas = useApi(url)

  const tareasConFiltro = (e) =>{
    setFiltro(e.target.value)
   let filtrado = tareas.data?.filter(tarea => tarea.actividad.includes(filtro) || tarea.estatus_actividad.includes(filtro) )
   setTareasFiltradas({data: filtrado, isLoading: false})
  }
//   console.log(tareas)
  return (
    <Container>
      <NavBar text={"Tareas Pendientes"}/>
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
                console.log(values)
                let data ={
                  }

                  console.log(data)
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data), 
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
                    
                
                    <Row >
                            <Field type="text" name="consulta" style={{"width": "50vw"}} placeholder="Filtro: Nombre, Asignado, Estatus" onChange={e => tareasConFiltro(e)}/>
                            {/* <ErrorMessage name="consulta" component="div" /> */}
                    </Row>
    
                    <Row >
                        <Button  style={{"width": "20vw"}} onClick={() => tarea.setTarea(true)} className="mt-4" color="info" size="sm"> Nueva Tarea </Button>
                        {
                          url === 'http://localhost:8080/api/tareas/' ?  <Button  style={{"width": "20vw"}} onClick={() => setUrl('http://localhost:8080/api/tareas/accepted')} type="submit" className="mt-4" color="info" size="sm"> Consultados </Button> :
                          <Button  style={{"width": "20vw"}} onClick={() => setUrl('http://localhost:8080/api/tareas/')} type="submit" className="mt-4" color="info" size="sm"> Todos </Button>
                        }
                       
                        
                    </Row>
                </Form>
            )}
            </Formik>






      <TareasList tareas={filtro ? tareasFiltradas : tareas} />
      
      </Container>
  )
}
