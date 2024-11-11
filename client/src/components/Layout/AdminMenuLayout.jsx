import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import SystemOutletLayout from "./SystemOutletLayout";

const AdminMenuLayout = () => {
  const { pathname } = useLocation();
  return (
    <SystemOutletLayout>
      <Nav.Link as={Link} to="." active={pathname === "/admin-menu"}>
        Overview
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-admin"
        active={pathname === "/admin-menu/add-admin"}
      >
        Add Admin
      </Nav.Link>
    </SystemOutletLayout>
  );
};

export default AdminMenuLayout;
