
import axios from 'axios';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import ErrorFinder from './ErrorFinder';
import Container from 'react-bootstrap/esm/Container';


export default function LoginModal({handleClose, show}){

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
        handleClose();
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

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(n => !n);
    };
    const showHideImagePass = !showPassword ? "/images/see.svg" : "/images/hide.svg";
  

      return (
        <>
          <Modal show={show} onHide={handleClose}>
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
                  <Container className="input-group p-0">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="***********"
                    autoFocus
                  />
                  <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <img style={{height:"20px"}} src={showHideImagePass} alt="seehide" />
                  </button>
                  </Container>
                </Form.Group>
                {num > 0 && <ErrorFinder err={errorsLogin} fieldName="password" />}
                <Modal.Footer>
                  <Button variant="secondary" style={{border: "none", borderRadius: 0}} onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" style={{backgroundColor: "#219aeb", border: "none", borderRadius: 0}} type='submit'>
                    Log In
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
            
          </Modal>
        </>
      );
    }