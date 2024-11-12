import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { BsPersonCircle, BsCart2, BsCartCheck } from "react-icons/bs";

const UserNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function logOutFunction() {
    logout();
    navigate("/");
  }

  const imgStyles = {
    height: "1.3em",
    width: "1.3em",
    color: "white",
  };

  const handleNavigateReg = () => navigate("/signup");
  const handleNavigateLogin = () => navigate("/login");

  return (
    <>
      {user ? (
        <Nav className="text-center">
          {user.role === 2 && (
            <>
              <Nav.Link as={Link} to="/profile/wishlist">
                <BsCartCheck style={imgStyles} className="btn_hover" />
              </Nav.Link>
              <Nav.Link as={Link} to="/profile/my-cart">
                <BsCart2 style={imgStyles} className="btn_hover" />
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="profile">
            <BsPersonCircle style={imgStyles} className="btn_hover" />
          </Nav.Link>
          <NavDropdown align="end">
            <NavDropdown.Item as={Link} to="/profile" variant="secondary">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Button
                className="bg-custom bg-custom-class w-100 border-0"
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
            id="login_btn_modal"
            onClick={handleNavigateLogin}
            variant="btn btn-outline-light me-2 text-nowrap fw-bolder"
          >
            Log In
          </Button>
          <Button
            id="signup_btn_modal"
            onClick={handleNavigateReg}
            variant="btn btn-outline-light me-2 text-nowrap fw-bolder"
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  );
};

export default UserNav;
