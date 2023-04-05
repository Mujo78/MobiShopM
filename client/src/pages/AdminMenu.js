import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import useResponsive from '../components/useResponsive';

export default function AdminMenu(){

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showCommentDropdown, setShowCommentDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

  const {isMobile} = useResponsive();

  const handleMouseEnter = (dropdown) => {
    switch (dropdown) {
      case 'admin':
        setShowAdminDropdown(true);
        break;
      case 'mobile':
        setShowMobileDropdown(true);
        break;
      case 'comments':
        setShowCommentDropdown(true);
        break;
      case 'orders':
        setShowOrdersDropdown(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (dropdown) => {
    switch (dropdown) {
      case 'admin':
        setShowAdminDropdown(false);
        break;
      case 'mobile':
        setShowMobileDropdown(false);
        break;
      case 'comments':
        setShowCommentDropdown(false);
        break;
      case 'orders':
        setShowOrdersDropdown(false);
        break;
      default:
        break;
    }
  };

    return(
      <Container fluid className='p-0 d-flex flex-wrap flex-column' style={{backgroundColor:"#C0C0C0"}}>
        <Navbar bg="light" expand="lg"  className={isMobile ? "w-100" : "w-100"}>
      <Container>
        <Navbar.Brand as={Link} to={"/admin-menu"}>Mshop System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Admin menu" id="basic-nav-dropdown" onMouseEnter={() => handleMouseEnter("admin")} onMouseLeave={() => handleMouseLeave("admin")} show={showAdminDropdown}>
              <NavDropdown.Item as={Link} to={"add-admin"}>Add new Admin</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"delete-admin"}>Delete Admin</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Mobile menu" id="basic-nav-dropdown" show={showMobileDropdown} onMouseEnter={() => handleMouseEnter("mobile")} onMouseLeave={() => handleMouseLeave("mobile")}>
              <NavDropdown.Item as={Link} to={"add-mobile"}>Add new mobile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"edit-mobile"}>Edit mobile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"delete-mobile"}>Delete mobile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"add-brand"}>Add new Brand</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Comments menu" id="basic-nav-dropdown" show={showCommentDropdown} onMouseEnter={() => handleMouseEnter("comments")} onMouseLeave={() => handleMouseLeave("comments")}>
              <NavDropdown.Item as={Link} to={"see-comments"}>See comments</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Orders menu" id="basic-nav-dropdown" show={showOrdersDropdown} onMouseEnter={() => handleMouseEnter("orders")} onMouseLeave={() => handleMouseLeave("orders")}>
              <NavDropdown.Item as={Link} to={"orders"}>See orders</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className=' p-0 mt-3 mb-4 flex-wrap d-flex flex-column align-items-center justify-content-center'>
      <Outlet />
    </Container>
    </Container>
    )
}