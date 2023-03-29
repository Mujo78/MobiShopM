import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import ErrorFinder from './ErrorFinder';
export default function RegistrationModal(props){

  const [errorsLogin, setErrors] = useState([])

  const[registrationData, setRegistrationData] = useState({
    first_name:"",
    last_name:"",
    phone_number:"",
    address: "",
    city: "",
    username:"",
    email: "",
    gender:"",
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
          first_name:"",
          last_name:"",
          phone_number:"",
          address: "",
          city: "",
          username:"",
          email: "",
          gender:"",
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
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-flex mb-1">
                  <div className="d-flex flex-column me-3 w-100">
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={registrationData.first_name}
                        onChange={handleChange}
                        name='first_name' 
                        autoFocus />
                     {num > 0 && <ErrorFinder err={errorsLogin} fieldName="first_name" />}
                  </div>
                  <div className="d-flex flex-column w-100">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={registrationData.last_name}
                        onChange={handleChange}
                        name='last_name' 
                        autoFocus />
                      {num > 0 && <ErrorFinder err={errorsLogin} fieldName="last_name" />}

                  </div>
              </Form.Group>
            <Form.Group className="d-flex mb-1">
                <div className="d-flex flex-column me-3 w-100">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                      type='text' 
                      value={registrationData.phone_number}
                      onChange={handleChange}
                      name="phone_number"
                      placeholder="+387** *** ***" 
                      autoFocus />
                      {num > 0 && <ErrorFinder err={errorsLogin} fieldName="phone_number" />}
                </div>
                <div className="d-flex flex-column w-50">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select 
                      aria-label="Default select example" 
                      value={registrationData.gender}
                      onChange={handleChange}
                      name="gender">
                        <option>Choose</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                    {num > 0 && <ErrorFinder err={errorsLogin} fieldName="gender" />}
                </div>
            </Form.Group>
            <Form.Group className="d-flex mb-1">
                <div className="d-flex flex-column me-3 w-100">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                      type="text" 
                      name='city'
                      value={registrationData.city}
                      onChange={handleChange}
                      autoFocus />
                      {num > 0 && <ErrorFinder err={errorsLogin} fieldName="city" />}
                </div>
                <div className="d-flex flex-column w-100">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="address"
                      value={registrationData.address}
                      onChange={handleChange}
                      autoFocus />
                      {num > 0 && <ErrorFinder err={errorsLogin} fieldName="address" />}
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
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="username" />}
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
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="email" />}
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
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="password" />}
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
                {registrationData.password === registrationData.confirmpassword ? "" : <p style={{fontSize:"12px", color:"red"}}>Passwords must be the same!</p>}
              
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