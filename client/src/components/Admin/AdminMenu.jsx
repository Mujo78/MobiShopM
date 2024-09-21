import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AdminNav from "./AdminNav";

export default function AdminMenu() {
  return (
    <Container
      fluid
      className="pt-3 d-flex justify-content-start align-items-start flex-wrap flex-md-nowrap vh-75"
    >
      <Navbar
        expand="lg"
        className="d-none sm-position-static d-sm-flex mx-sm-auto text-center text-md-start border-class"
      >
        <AdminNav />
      </Navbar>

      <Navbar expand="lg" bg="dark" className="fixed-bottom d-sm-none">
        <AdminNav />
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </Container>
  );
}
