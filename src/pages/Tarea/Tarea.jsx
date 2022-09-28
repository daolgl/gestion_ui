import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import { NavBar } from '../../components/organisms/NavBar/NavBar';
import { useApi } from '../../hooks/useApi/useApi';
import toast, { Toaster } from 'react-hot-toast';
import UserContext from '../../contexts/UserContext/UserContext';
import UserTarea from '../../contexts/UserContext/UserTarea';
import "./tarea.css"

export const Tarea = () => {
  const user = useContext(UserContext)
  const tarea = useContext(UserTarea)
  const usuarios = useApi('http://localhost:8080/api/users/')
//   console.log(usuarios)
//   console.log(usuarios.isLoading)
  const url = "http://localhost:8080/api/tareas/"
  return (
    <>
        <Toaster/>
        <NavBar text={"Agregar Nueva Tarea"}/>
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
                    toast.success('!Guardado exitosamente!')
                    setTimeout(() => {
                        tarea.setTarea(false)
                    }, 1000);
                });
            }}
            >
            {({ isSubmitting }) => (
                <Form className='tarea-form'>
                    <div className='tarea-form_input'>
                        <label htmlFor="tarea" >Tarea: </label>

                            <Field type="text" name="tarea"/>
                            <ErrorMessage name="tarea" component="div" />
                    </div>
                    <div className='tarea-form_input'>
                         <label htmlFor="asignar" >Asignar: </label>
                        <Field name="asignar" placeholder="Asignar"   as="select" defaultValue={"DEFAULT "}>
                            <option value="DEFAULT" hidden>
                                Selecciona a quien se le asignara la tarea
                            </option>
                        {!usuarios.isLoading && usuarios.data.map( usuario => !usuario.admin &&
                            <option key={usuario.id} value={usuario.id}>
                                {`${usuario.first_name} ${usuario.last_name}`}
                            </option>
                        )}
                        </Field>
                        <ErrorMessage name="asignar" component="div" />
                    </div>
                    <div className='tarea-form_textarea'>
                        <label htmlFor="descripcion" >Descripcion: </label>
                        <Field component="textarea" name="descripcion" className="mt-2" />
                        <ErrorMessage name="descripcion" component="div" />
                    </div>

                    <div>
                        <Button   onClick={()=> tarea.setTarea(false)} className="mt-4 tarea-form_button" color="info" size="sm"> Regresar </Button>
                        <Button   type="submit" className="mt-4 tarea-form_button" color="info" size="sm"> Guardar </Button>
                    </div>
                </Form>  
            )}
            </Formik>
    </>
    
  )
}
