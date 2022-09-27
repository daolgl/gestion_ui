import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import UserContext from '../../contexts/UserContext/UserContext';

export const Login = () => {
  const user = useContext(UserContext)
  const url = "http://localhost:8080/api/users/login"
  return (
    <Container>
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
            <Row style={{"width": "60vw"}}>
                <Field type="email" name="email" placeholder="Email" className="mt-4"/>
                <ErrorMessage name="email" component="div" />
            </Row>
            <Row style={{"width": "60vw"}}>
                <Field type="password" name="password" placeholder="Password" className="mt-4"/>
                <ErrorMessage name="password" component="div" />
                
            </Row>
            <Row>
                <Col
                md={{
                    offset: 3,
                    size: 2
                }}
                >
                <Button  style={{"width": "20vw"}} type="submit" disabled={isSubmitting} className="mt-4" color="info" size="sm">
                                Ingresar
                        </Button>
                        <h6 className="mt-2">Crea una cuenta </h6>
                </Col>
            </Row>
        </Form>
      )}
    </Formik>
  </Container>
  )
}
