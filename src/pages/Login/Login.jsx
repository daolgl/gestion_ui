import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container } from 'reactstrap';
import UserContext from '../../contexts/UserContext/UserContext';
import profile from '../../components/atoms/profile.png'
import './login.css'

export const Login = () => {
  const user = useContext(UserContext)
  const url = "http://localhost:8080/api/users/login"
  return (
    <Container>
      <div className='login'>

     <div className='login-img'>
        <img src={profile} alt="Logo"/>
     </div>
        
 
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(values), // data can be `string` or {object}!
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
              if(!response.message) user.setUser(response)
              setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
            <div>
                <Field type="email" name="email" placeholder="Usuario" className="login-form_field"/>
                <ErrorMessage name="email" component="div" />
            </div>
            <div >
                <Field type="password" name="password" placeholder="Password" className="login-form_field"/>
                <ErrorMessage name="password" component="div" />
                
            </div>
            <div>
                <Button type="submit" disabled={isSubmitting} className="login-form_button" color="info" size="sm">
                                Ingresar
                </Button>
                
            </div>
        
              <h6  className="login-form_create">Crea una cuenta </h6>
            
        </Form>
      )}
    </Formik>
    </div>
  </Container>
  )
}
