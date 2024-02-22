import React from "react";
import Nav from "react-bootstrap/Nav";
import SystemOutletLayout from "../../../components/Layout/SystemOutletLayout";
import { Link, useLocation } from "react-router-dom";

const MobileMenuLayout = () => {
  const location = useLocation().pathname;

  return (
    <SystemOutletLayout>
      <Nav.Link as={Link} to="." active={location === "/admin-menu/mobiles"}>
        Overview
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="brands"
        active={location === "/admin-menu/mobiles/brands"}
      >
        Brands
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-mobile"
        active={location === "/admin-menu/mobiles/add-mobile"}
      >
        Add mobile
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-brand"
        active={location === "/admin-menu/mobiles/add-brand"}
      >
        Add brand
      </Nav.Link>
    </SystemOutletLayout>
  );
};

export default MobileMenuLayout;
