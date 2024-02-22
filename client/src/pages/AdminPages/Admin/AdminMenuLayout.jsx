import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import SystemOutletLayout from "../../../components/Layout/SystemOutletLayout";

const AdminMenuLayout = () => {
  const location = useLocation().pathname;
  return (
    <SystemOutletLayout>
      <Nav.Link as={Link} to="." active={location === "/admin-menu"}>
        Overview
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-admin"
        active={location === "/admin-menu/add-admin"}
      >
        Add Admin
      </Nav.Link>
    </SystemOutletLayout>
  );
};

export default AdminMenuLayout;
