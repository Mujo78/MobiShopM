import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import SystemOutletLayout from "./SystemOutletLayout";

export default function EditProfileLayout() {
  const { pathname } = useLocation();

  return (
    <SystemOutletLayout>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex flex-column flex-sm-row me-auto">
            <Nav.Link
              as={Link}
              to="edit-profile"
              active={pathname === "/profile/edit-profile"}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="change-password"
              active={pathname === "/profile/change-password"}
            >
              Password
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </SystemOutletLayout>
  );
}
