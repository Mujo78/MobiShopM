import React from "react";
import { useCartData } from "../../context/CartContext";
import Container from "react-bootstrap/esm/Container";

const MyCartInfo = ({ size }) => {
  const { numOfItems, total } = useCartData();

  return (
    <Container
      className={`px-${
        size ?? 0
      } d-flex flex-wrap justify-content-between align-items-center border-bottom`}
      style={{ fontSize: "0.9rem" }}
    >
      <p>
        <strong>{numOfItems}</strong> {numOfItems > 1 ? "ITEMS" : "ITEM"}
      </p>
      <p>
        Total: <strong>{parseInt(total).toFixed(2)}</strong> BAM
      </p>
    </Container>
  );
};

export default MyCartInfo;
