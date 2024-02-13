import React from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";

const SystemOutletLayout = ({ children }) => {
  return (
    <Container
      fluid
      className="d-flex flex-column gap-3 mt-3 justify-content-center justify-content-sm-start align-items-center align-items-md-start"
    >
      <Navbar className="bg-light p-2 w-100 rounded">
        <Nav>{children}</Nav>
      </Navbar>
      <Outlet />
    </Container>
  );
};

export default SystemOutletLayout;
