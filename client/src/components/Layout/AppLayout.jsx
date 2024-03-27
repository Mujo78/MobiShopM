import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { BsCart2 } from "react-icons/bs";
import Cart from "../Cart/Cart";
import { ToastContainer } from "react-toastify";
import Navbars from "../UI/Nav";
import { useCartData } from "../../context/CartContext";
import Container from "react-bootstrap/esm/Container";

const AppLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const location = useLocation().pathname;

  const { user } = useAuth();
  const { numOfItems } = useCartData();

  function handleCloseCart() {
    setShowCart(false);
  }

  function handleShowCart() {
    setShowCart(true);
  }

  const myCartLocation = location === "/profile/my-cart";

  return (
    <div className="App px-0 px-sm-5 pt-2">
      <ToastContainer />
      <Navbars />
      <Outlet />

      {user?.role !== 1 && !myCartLocation && (
        <Button
          id="cart_btn"
          onClick={() => handleShowCart()}
          className="position-fixed mb-5 ms-5 p-4 rounded-pill bg-transparent bottom-0"
          style={{
            left: 0,
            border: "5px solid #219AEB",
          }}
        >
          <Container className="p-0 position-relative w-100 h-100">
            <BsCart2 color="black" style={{ height: "30px", width: "30px" }} />
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
