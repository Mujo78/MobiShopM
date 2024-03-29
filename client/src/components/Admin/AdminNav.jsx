import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import { Link, useLocation } from "react-router-dom";
import {
  BsPersonGear,
  BsPhone,
  BsFileEarmarkText,
  BsBox,
} from "react-icons/bs";

const AdminNav = () => {
  const location = useLocation().pathname;
  const styles = {
    height: "2rem",
    width: "2rem",
    color: "white",
  };
  return (
    <Container className="d-flex flex-sm-column flex-row">
      <Navbar.Brand as={Link} to="/admin-menu" className="d-none d-sm-block">
        Mshop System
      </Navbar.Brand>

      <Nav className="d-flex flex-row flex-sm-column justify-content-between w-100">
        <Nav.Link
          as={Link}
          to="/admin-menu"
          active={
            location === "/admin-menu" || location === "/admin-menu/add-admin"
          }
        >
          <span className="d-none d-sm-block">Admin Menu</span>
          <BsPersonGear style={styles} className="d-block d-sm-none" />
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="mobiles"
          active={location.startsWith("/admin-menu/mobiles")}
        >
          <span className="d-none d-sm-block">Mobile Menu</span>
          <BsPhone style={styles} className="d-block d-sm-none" />
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="comments"
          active={location.startsWith("/admin-menu/comments")}
        >
          <span className="d-none d-sm-block">Comments Menu</span>
          <BsFileEarmarkText style={styles} className="d-block d-sm-none" />
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="orders"
          active={location.startsWith("/admin-menu/orders")}
        >
          <span className="d-none d-sm-block">Orders Menu</span>
          <BsBox style={styles} className="d-block d-sm-none" />
        </Nav.Link>
      </Nav>
    </Container>
  );
};

export default AdminNav;
