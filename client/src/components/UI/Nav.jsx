import { useEffect, useState } from "react";
import CustomAlert from "./Alert";
import LoginModal from "../User/LoginModal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import RegistrationModal from "../User/RegistrationModal";
import { useAuth } from "../../context/AuthContext";
import UserNav from "../User/UserNav";

export default function Navbars() {
  const [show, setShow] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setShow(false);
    }
  }, [user]);

  const handleCloseLogin = () => setShow(false);
  const handleCloseReg = () => setShowReg(false);

  return (
    <>
      <CustomAlert bold variant="secondary" closeButton>
        Unbeatable deals and amazing discounts, shop now and save big!
      </CustomAlert>
      <Navbar expand="lg" className=" rounded bg-custom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/am.png"
              alt="logo"
              style={{ height: "2em", width: "2em" }}
            />
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontFamily: "Audiowide",
              fontSize: "30px",
              color: "white",
            }}
          >
            MShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "120px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="search">
                Search
              </Nav.Link>
              <Nav.Link as={Link} to="models">
                Brands
              </Nav.Link>
              <Nav.Link as={Link} to="about">
                About
              </Nav.Link>
              {user?.role !== 1 && (
                <Nav.Link as={Link} to="contact">
                  Contact
                </Nav.Link>
              )}
              {user?.role === 1 && (
                <Nav.Link as={Link} to="admin-menu">
                  System
                </Nav.Link>
              )}
            </Nav>
            <UserNav setShow={setShow} setShowReg={setShowReg} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={show} handleClose={handleCloseLogin} />
      <RegistrationModal show={showReg} handleClose={handleCloseReg} />
    </>
  );
}
