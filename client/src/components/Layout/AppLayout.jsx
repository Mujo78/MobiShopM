import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { BsCart2 } from "react-icons/bs";
import Cart from "../Cart/Cart";
import { ToastContainer } from "react-toastify";
import Navbars from "../UI/Nav";

const AppLayout = () => {
  const [showCart, setShowCart] = useState(false);
  const location = useLocation().pathname;

  const { user } = useAuth();

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
          onClick={() => handleShowCart()}
          className="position-fixed mb-5 ms-5 p-4 rounded-pill bg-transparent bottom-0"
          style={{
            left: 0,
            border: "5px solid #219AEB",
          }}
        >
          <BsCart2
            className=" text-dark"
            style={{ height: "30px", width: "30px" }}
          />
        </Button>
      )}

      <Cart show={showCart} onHide={handleCloseCart} />
    </div>
  );
};

export default AppLayout;
