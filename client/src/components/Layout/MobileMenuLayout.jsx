import React from "react";
import Nav from "react-bootstrap/Nav";
import SystemOutletLayout from "./SystemOutletLayout";
import { Link, useLocation } from "react-router-dom";

const MobileMenuLayout = () => {
  const { pathname } = useLocation();

  return (
    <SystemOutletLayout>
      <Nav.Link as={Link} to="." active={pathname === "/admin-menu/mobiles"}>
        Overview
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="brands"
        active={pathname === "/admin-menu/mobiles/brands"}
      >
        Brands
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-mobile"
        active={pathname === "/admin-menu/mobiles/add-mobile"}
      >
        Add mobile
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="add-brand"
        active={pathname === "/admin-menu/mobiles/add-brand"}
      >
        Add brand
      </Nav.Link>
    </SystemOutletLayout>
  );
};

export default MobileMenuLayout;
