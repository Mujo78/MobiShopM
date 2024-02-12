import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function EditProfile() {
  const location = useLocation().pathname;

  return (
    <Container>
      <Navbar bg="light" expand="sm" className="rounded">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="."
                active={location === "/profile/edit-profile"}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="change-password"
                active={location === "/profile/edit-profile/change-password"}
              >
                Password
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Container>
  );
}
