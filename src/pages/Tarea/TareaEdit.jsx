import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, Row } from 'reactstrap';
import { NavBar } from '../../components/organisms/NavBar/NavBar';
import { useApi } from '../../hooks/useApi/useApi';
import UserContext from '../../contexts/UserContext/UserContext';
import UserTarea from '../../contexts/UserContext/UserTarea';
import "./tarea.css"
export const TareaEdit = () => {
  const [disabled, setDisabled] = useState(true)
  const user = useContext(UserContext)
  const tarea = useContext(UserTarea)
  const url = `http://localhost:8080/api/tareas/${tarea.tareaEdit.id}`
  const usuarios = useApi('http://localhost:8080/api/users/')
  const tareaValues = useApi(url)
 useEffect(() => {
    if(tareaValues.data?.isAcepted === false){
        let data ={
            tarea: tareaValues.data?.actividad,
            descripcion: tareaValues.data?.descripcion_actividad,
            asignar: tareaValues.data?.asignado,
            actividad: tareaValues.data?.actividad, 
            usuario : tareaValues.data?.usuario, 
            estatus_actividad: tareaValues.data?.estatus_actividad, 
            descripcion_actividad: tareaValues.data?.descripcion_actividad, 
            documento_entregable: tareaValues.data?.documento_entregable, 
            asignado: tareaValues.data?.asignado,
            fecha_envio: tareaValues.data?.fecha_envio, 
            fecha_final: tareaValues.data?.fecha_final,
            isAcepted: true
          }
          fetch(url, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .catch(error =>{ 
            console.error('Error:', error)
        })
            .then(response =>{ 
            console.log('Success:', response)
        });
    }
    
 }, [tareaValues])
 
  return (
    <>
        
        <NavBar />
            <Formik
            enableReinitialize={true}
            initialValues={{
                tarea: tareaValues.data?.actividad,
                descripcion: tareaValues.data?.descripcion_actividad,
                asignar: tareaValues.data?.asignado
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
                    estatus_actividad: "En Proceso", 
                    descripcion_actividad: values.descripcion, 
                    documento_entregable: "a", 
                    asignado: values.asignar,
                    fecha_envio: "2022-09-10", 
                    fecha_final: "2022-09-30",
                    isAcepted: true
                  }

                  console.log(data)
                fetch(url, {
                    method: 'PUT', // or 'PUT'
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
                <Form  className='tarea-form'>
                    <div className='tarea-form_input' >
                            <label htmlFor="tarea">Tarea: </label>

                            <Field type="text" name="tarea" disabled={disabled}/>
                            <ErrorMessage name="tarea" component="div" />
                    </div>
                    <div className='tarea-form_input'>
                        <label htmlFor="asignar">Asignar: </label>
                        <Field name="asignar" placeholder="Asignar"  as="select" disabled={disabled}>
                        {!usuarios.isLoading && usuarios.data.map( usuario => !usuario.admin &&
                            <option key={usuario.id} value={usuario.id}>
                                {`${usuario.first_name} ${usuario.last_name}`}
                            </option>
                        )}
                        </Field>
                        <ErrorMessage name="asignar" component="div" />
                    </div>
                    <div className='tarea-form_textarea'>
                        <label htmlFor="descripcion">Descripcion: </label>
                        <Field component="textarea" name="descripcion" className="mt-2" disabled={disabled}/>
                        <ErrorMessage name="descripcion" component="div" />
                    </div>
                    <div className='tarea-form_entregables'>
                        Da click o arrastra para cargar los entregables
                    </div>
                    <div >
        
                            <Button  onClick={()=> tarea.setTareaEdit({tarea: false, id: null})} className="mt-4 tarea-form_button" color="info" size="sm"> Regresar </Button>
                            {disabled ? 
                                <Button    onClick={() => setDisabled(false)} className="mt-4 tarea-form_button_modify" color="info" size="sm"> Modificar </Button> :
                                <Button  type="submit" className="mt-4 tarea-form_button" color="info" size="sm"> Guardar </Button>
                        }
                    </div>

                    
                </Form>
            )}
            </Formik>
      
    </>
    
  )
}
