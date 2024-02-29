import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMobile } from "../../features/Mobiles/useFetchMobile";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import CustomAlert from "../../components/UI/Alert";
import { useAuth } from "../../context/AuthContext";
import { useQueryParams } from "../../hooks/useQueryParams";
import { BsTruck, BsCreditCard } from "react-icons/bs";
import { useBuyNow } from "../../features/Order/useBuyNow";
import OrderLayout from "../../components/Layout/OrderLayout";

const OrderMobile = () => {
  const quantity = useQueryParams().get("quantity");
  const [values, setValues] = useState({
    payment_info: "Delivery",
    quantity,
  });
  const { mobileId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { data: mobile, isFetching, isError } = useFetchMobile(mobileId);
  const { mutate, isPending } = useBuyNow(mobileId);

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((n) => ({
      ...n,
      [name]: value,
    }));
  };

  const makeOrder = (event) => {
    event.preventDefault();
    mutate(values, {
      onSuccess: () => {
        goBack();
      },
    });
  };

  return (
    <OrderLayout
      isFetching={isFetching}
      isError={isError}
      isPending={isPending}
      mobile={mobile}
      quantity={quantity}
    >
      <ListGroup.Item>
        <h5>
          Total: {mobile?.price} * {quantity}x ={" "}
          {(mobile?.price * parseInt(quantity)).toFixed(2)} BAM
        </h5>
      </ListGroup.Item>
      {user && mobile.quantity > 0 ? (
        <>
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
                  name="payment_info"
                  value="Delivery"
                  onChange={handleChange}
                  checked={values.payment_info === "Delivery"}
                />
              </Container>
              <Container className="p-0 d-flex flex-column align-items-center">
                <BsCreditCard color="gray" style={{ width: 36, height: 36 }} />
                <Form.Check
                  disabled
                  type="radio"
                  label="Credit card"
                  className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2"
                  name="payment_info"
                  value="Card"
                  onChange={handleChange}
                  checked={values.payment_info === "Card"}
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
        </>
      ) : (
        <CustomAlert variant="secondary">Product is not available</CustomAlert>
      )}
    </OrderLayout>
  );
};

export default OrderMobile;
