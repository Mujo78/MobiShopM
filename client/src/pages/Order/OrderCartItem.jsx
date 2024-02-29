import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCartItemFn } from "../../features/Cart/api";
import { useAuth } from "../../context/AuthContext";
import OrderLayout from "../../components/Layout/OrderLayout";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from "react-bootstrap/esm/Form";
import { BsTruck, BsCreditCard } from "react-icons/bs";
import Container from "react-bootstrap/esm/Container";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/esm/Button";
import { useCartData } from "../../context/CartContext";

const OrderCartItem = () => {
  const [value, setValue] = useState("Delivery");
  const { itemId } = useParams();
  const { user } = useAuth();
  const { orderCartItemFn, status } = useCartData();
  const navigate = useNavigate();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => {
      if (itemId) {
        const token = user?.token;
        return fetchCartItemFn(token, itemId);
      }
    },
    retry: 1,
  });

  const handleChange = (event) => {
    const value = event.target.value;

    setValue(value);
  };

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  const makeOrder = (event) => {
    event.preventDefault();
    orderCartItemFn(itemId, value, () => goBack());
  };

  return (
    <OrderLayout
      isFetching={isFetching}
      isError={isError}
      mobile={data?.Mobile}
      quantity={data?.quantity}
      isPending={status === "pending"}
    >
      <ListGroup.Item>
        <h5>
          Total: {data?.Mobile?.price} * {data?.quantity}x ={" "}
          {data?.total?.toFixed(2)} BAM
        </h5>
        <ListGroup.Item>
          <strong>Choose payment method:</strong>
        </ListGroup.Item>
        <Form
          onSubmit={makeOrder}
          className="d-flex flex-column gap-3 w-100 row"
        >
          <FormGroup className="d-flex flex-wrap flex-sm-nowrap justify-content-around col-12">
            <Container className="d-flex p-0 flex-column align-items-center">
              <BsTruck color="#219aeb" style={{ width: 36, height: 36 }} />
              <Form.Check
                type="radio"
                label="While delivery"
                className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2"
                name="value"
                value="Delivery"
                onChange={handleChange}
                checked={value === "Delivery"}
              />
            </Container>
            <Container className="p-0 d-flex flex-column align-items-center">
              <BsCreditCard color="gray" style={{ width: 36, height: 36 }} />
              <Form.Check
                type="radio"
                label="Credit card"
                className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2"
                name="value"
                value="Card"
                onChange={handleChange}
                checked={value === "Card"}
              />
            </Container>
          </FormGroup>
          <Button
            type="submit"
            className="col-12 col-sm-9 bg-custom bg-custom-class mx-auto border-0"
          >
            Make Order
          </Button>
        </Form>
      </ListGroup.Item>
    </OrderLayout>
  );
};

export default OrderCartItem;
