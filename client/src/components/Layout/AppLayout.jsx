import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { BsCart2 } from "react-icons/bs";
import Cart from "../Cart/Cart";
import { ToastContainer } from "react-toastify";
import AppNavbar from "../UI/AppNavbar";
import { useCartData } from "../../context/CartContext";
import Container from "react-bootstrap/esm/Container";

const AppLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const { pathname } = useLocation();

  const { user } = useAuth();
  const { numOfItems } = useCartData();

  function handleCloseCart() {
    setShowCart(false);
  }

  function handleShowCart() {
    setShowCart(true);
  }

  const myCartLocation = pathname === "/profile/my-cart";

  return (
    <div className="App">
      <ToastContainer />
      <div className="container w-100 min-vh-100 d-flex flex-column gap-2">
        <AppNavbar />
        <div className="d-flex flex-grow-1">
          <Outlet />
        </div>
      </div>

      {user?.role !== 1 && !myCartLocation && (
        <Button
          id="cart_btn"
          onClick={handleShowCart}
          className="position-fixed mb-5 ms-5 p-4 z-3 rounded-pill bg-transparent bottom-0 start-0"
          style={{ border: "5px solid #219AEB" }}
        >
          <Container className="p-0 position-relative w-100 h-100">
            <BsCart2 color="black" size="30px" />
            {!isNaN(numOfItems) && (
              <div
                className="bg-danger text-white px-2 py-1 position-absolute fw-semibold rounded-circle"
                style={{ fontSize: "0.6rem", right: -10, top: -5 }}
              >
                {numOfItems}
              </div>
            )}
          </Container>
        </Button>
      )}

      {showCart && <Cart show={showCart} onHide={handleCloseCart} />}
    </div>
  );
};

export default AppLayout;
