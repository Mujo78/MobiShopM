import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import AdminNav from "../components/AdminNav";

export default function AdminMenu() {
  return (
    <Container
      fluid
      className="pt-3 d-flex justify-content-start align-items-start flex-wrap flex-sm-nowrap vh-100"
    >
      <Navbar expand="lg" className="d-none d-sm-block h-100 border-end">
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
