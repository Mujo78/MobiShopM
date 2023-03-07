import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import ErrorFinder from './ErrorFinder';
export default function RegistrationModal(props){

  const [errorsLogin, setErrors] = useState([])

  const[registrationData, setRegistrationData] = useState({
    ime:"",
    prezime:"",
    broj_telefona:"",
    adresa: "",
    grad: "",
    username:"",
    email: "",
    spol:"",
    password: "",
    confirmpassword: ""
  })

  function handleSubmit(event){
    event.preventDefault();

    axios.post("http://localhost:3001/registration", registrationData)
    .then(() => {
        props.handleClose();
        console.log(`Username: ${registrationData.username}` );
        setErrors([]);
        setRegistrationData({
          ime:"",
          prezime:"",
          broj_telefona:"",
          adresa: "",
          grad: "",
          username:"",
          email: "",
          spol:"",
          password: "",
          confirmpassword: ""
        })
        props.handleOpen();
    })
    .catch(error => {
      console.log(error)
      setErrors(error.response.data.errors);
    });
    
  }
  let num = errorsLogin.length;


  function handleChange(event){
    const name = event.target.name;
    const value = event.target.value;

    setRegistrationData(n => ({
      ...n,
      [name]: value
    }))
    
  }
    return(
        <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-flex mb-1">
                  <div className="d-flex flex-column me-3 w-100">
                      <Form.Label>Ime</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={registrationData.ime}
                        onChange={handleChange}
                        name='ime' 
                        autoFocus />
                     {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="ime" />}
                  </div>
                  <div className="d-flex flex-column w-100">
                      <Form.Label>Prezime</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={registrationData.prezime}
                        onChange={handleChange}
                        name='prezime' 
                        autoFocus />
                      {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="prezime" />}

                  </div>
              </Form.Group>
            <Form.Group className="d-flex mb-1">
                <div className="d-flex flex-column me-3 w-100">
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control 
                      type='text' 
                      value={registrationData.broj_telefona}
                      onChange={handleChange}
                      name="broj_telefona"
                      placeholder="+387** *** ***" 
                      autoFocus />
                      {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="broj_telefona" />}
                </div>
                <div className="d-flex flex-column w-50">
                    <Form.Label>Spol</Form.Label>
                    <Form.Select 
                      aria-label="Default select example" 
                      value={registrationData.spol}
                      onChange={handleChange}
                      name="spol">
                        <option>Choose</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                    {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="spol" />}
                </div>
            </Form.Group>
            <Form.Group className="d-flex mb-1">
                <div className="d-flex flex-column me-3 w-100">
                    <Form.Label>Grad</Form.Label>
                    <Form.Control 
                      type="text" 
                      name='grad'
                      value={registrationData.grad}
                      onChange={handleChange}
                      autoFocus />
                      {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="grad" />}
                </div>
                <div className="d-flex flex-column w-100">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="adresa"
                      value={registrationData.adresa}
                      onChange={handleChange}
                      autoFocus />
                      {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="adresa" />}
                </div>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={registrationData.username}
                  name="username"
                  onChange={handleChange}
                  autoFocus
                />
                {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="username" />}
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={registrationData.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="name@example.com"
                  autoFocus
                />
                {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="email" />}
              </Form.Group>
              <Form.Group
                className="mb-1"
                
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={registrationData.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="***********"
                  autoFocus
                />
                {num > 0 && <ErrorFinder errorsLogin={errorsLogin} fieldName="password" />}
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={registrationData.confirmpassword}
                  name="confirmpassword"
                  onChange={handleChange}
                  placeholder="***********"
                  autoFocus
                />
                {registrationData.password === registrationData.confirmpassword ? "" : <p style={{fontSize:"12px", color:"red"}}>Šifre moraju biti jednake!</p>}
              
              </Form.Group>
            <Modal.Footer>
              
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Sign Up
            </Button>
          </Modal.Footer>
          </Form>
          </Modal.Body>
          
        </Modal>
      </>
    )
}