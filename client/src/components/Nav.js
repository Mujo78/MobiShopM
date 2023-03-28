import { useContext, useState } from "react"
import Alert from "./Alert"
import LoginModal from "./LoginModal";


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";
import { AuthContext } from "../helpers/AuthContext";
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navbars(){

    const [show, setShow] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const {authState, setAuthState} = useContext(AuthContext);

    const navigate = useNavigate();
    

    const handleCloseLogin = () => setShow(false);
    const handleShowLogin = () => setShow(true);

    const handleCloseReg = () => setShowReg(false);
    const handleShowReg = () => setShowReg(true);
  
    function logOutFunction(){
        localStorage.removeItem("accessToken");
        setAuthState({
            id: 0,
            username: "",
            RoleId:0
        });
        navigate("/");
    }
    return(
        <div>
            <Alert />
            <Navbar expand="lg" style={{backgroundColor: "#219aeb"}}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/"><img src="../images/am.png" alt="logo" style={{height:"40px",   width: "40px"}} /></Navbar.Brand>
                    <Navbar.Brand as={Link} to="/" style={{fontFamily:"Audiowide", fontSize:"30px", color:"white"}}>MShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '120px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/search">Search</Nav.Link>
                        <Nav.Link as={Link} to="/models">Brands</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        {authState.RoleId === 1 ? <Nav.Link as={Link} to="/admin-menu">System</Nav.Link> : ""}
                    </Nav>
                    {authState.id !== 0 ? 
                            <NavDropdown title={authState.username} id="basic-nav-dropdown" align="end"style={{right: 0, left:"auto"}}>
                            <NavDropdown.Item as={Link} to="/profile" >Profile</NavDropdown.Item>
                           {authState.RoleId !== 1 && <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>}
                            <NavDropdown.Item as={Link} to="/setings">Setings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Button style={{width:"inherit", height:"inherit"}} onClick={logOutFunction}>Log Out</Button>
                            </NavDropdown.Item>
                        </NavDropdown>: 
                               <div> <Button onClick={handleShowLogin} variant="btn btn-outline-light me-2 text-nowrap">Log In</Button>
                                <Button onClick={handleShowReg} variant="btn btn-outline-light me-2 text-nowrap">Sign Up</Button> </div>
                            }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
          
            <LoginModal show={show} handleClose={handleCloseLogin} />
            <RegistrationModal show={showReg} handleClose={handleCloseReg} handleOpen={handleShowLogin} />
        </div>
    )
}