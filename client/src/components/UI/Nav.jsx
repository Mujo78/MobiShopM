import CustomAlert from "./Alert";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserNav from "../User/UserNav";
import Logo from "./Logo";
import Image from "react-bootstrap/esm/Image";

export default function Navbars() {
  const { user } = useAuth();
  const location = useLocation().pathname;

  return (
    <>
      <CustomAlert bold variant="secondary" closeButton>
        Unbeatable deals and amazing discounts, shop now and save big!
      </CustomAlert>
      <Navbar expand="lg" className=" rounded bg-custom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Image
              src="/am.png"
              alt="logo"
              style={{ height: "2em", width: "2em" }}
            />
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/">
            <Logo color="white" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "120px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" active={location === "/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="search" active={location === "/search"}>
                Search
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="models"
                active={location.startsWith("/models")}
              >
                Brands
              </Nav.Link>
              <Nav.Link as={Link} to="about" active={location === "/about"}>
                About
              </Nav.Link>
              {user?.role !== 1 && (
                <Nav.Link
                  as={Link}
                  to="contact"
                  active={location === "/contact"}
                >
                  Contact
                </Nav.Link>
              )}
              {user?.role === 1 && (
                <Nav.Link
                  as={Link}
                  to="admin-menu"
                  active={location.startsWith("/admin-menu")}
                >
                  System
                </Nav.Link>
              )}
            </Nav>
            <UserNav />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
