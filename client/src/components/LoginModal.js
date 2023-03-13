
import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import ErrorFinder from './ErrorFinder';


export default function LoginModal(props){

    const {setAuthState} = useContext(AuthContext);
    const [errorsLogin, setErrors] = useState([]);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      username:"",
      password:""
    })

    function handleSubmit(event){
      event.preventDefault();

      axios.post("http://localhost:3001/login", loginData)
      .then(response => {
        let responseData = response.data;
     
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthState({
          id: responseData.id,
          username: responseData.username,
          RoleId: responseData.RoleId
        })
        setErrors([]);
        props.handleClose();
        navigate("/");
      }).catch(error => {
        if(error){
          setErrors(error.response.data.errors);
        }else{
          setErrors(error.response.data);
        }
      })      
    }

    let num = errorsLogin.length;

    function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;
      setLoginData(n => {
        return {
          ...n,
          [name] : value
      }})
    }
      return (
        <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-0">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name='username'
                    value={loginData.username}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="username" />}

                <Form.Group
                  className="mb-0"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name='password'
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="***********"
                    autoFocus
                  />
                </Form.Group>
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="password" />}
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type='submit'>
                    Log In
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
            
          </Modal>
        </>
      );
    }