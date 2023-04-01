import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

export default function EditProfile(){
    return(
        <Container>
            <div>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to=".">Info</Nav.Link>
              <Nav.Link as={Link} to="profile-data">Profile</Nav.Link>
              <Nav.Link as={Link} to="change-password">Password</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <div>
        <Outlet />
      </div>
      </Container>
    )
}