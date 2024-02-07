import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useResponsive from "./useResponsive";

import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { BsPersonCircle, BsCart2, BsCartCheck } from "react-icons/bs";

const UserNav = ({ setShowReg, setShow }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { isDesktop } = useResponsive();

  function logOutFunction() {
    logout();
    navigate("/");
  }

  const imgStyles = {
    height: "1.3em",
    width: "1.3em",
    color: "white",
  };

  const handleShowReg = () => setShowReg(true);
  const handleShowLogin = () => setShow(true);

  return (
    <>
      {user ? (
        <Nav>
          {user.role === 2 && (
            <>
              <Nav.Link as={Link} to="/profile/wishlist">
                <BsCartCheck style={imgStyles} />
              </Nav.Link>
              <Nav.Link as={Link} to="/profile/my-cart">
                <BsCart2 style={imgStyles} />
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="profile">
            <BsPersonCircle style={imgStyles} />
          </Nav.Link>
          <NavDropdown
            align={isDesktop ? "end" : "start"}
            style={{ right: 0, left: "auto" }}
          >
            <NavDropdown.Item as={Link} to="/profile" variant="secondary">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Button
                style={{
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: "#219aeb",
                  border: "none",
                  borderRadius: 0,
                }}
                onClick={logOutFunction}
              >
                Log Out
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <>
          <Button
            onClick={handleShowLogin}
            style={{ borderRadius: 0 }}
            variant="btn btn-outline-light me-2 text-nowrap"
          >
            Log In
          </Button>
          <Button
            onClick={handleShowReg}
            style={{ borderRadius: 0 }}
            variant="btn btn-outline-light me-2 text-nowrap"
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};

export default UserNav;
