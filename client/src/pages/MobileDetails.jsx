import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/esm/Container";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useAddToCart } from "../features/Cart/useAddToCart";
import { useFetchMobile } from "../features/Mobiles/useFetchMobile";

export default function MobileDetails() {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mobileId } = useParams();

  const handleQuantity = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };

  console.log(mobileId);
  const { data: mobile, isFetching, isError } = useFetchMobile(mobileId);

  const { mutate, isPending } = useAddToCart();

  const addToCart = () => {
    mutate(
      { mobileId, quantity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("mobileById");
        },
      }
    );
  };

  const orderMobile = () => {};

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="pb-2 pb-xl-0">
      {isFetching || isPending ? (
        <div className="d-flex w-100 h-100 justify-content-center mt-12">
          <Spinner />
        </div>
      ) : mobile ? (
        <Container className="d-flex gap-5 mt-5 flex-wrap flex-xl-nowrap justify-content-center flex-row">
          <Image
            src={mobile.photo}
            alt="photo"
            className="mobile-img-class h-auto"
          />
          <Container className="d-flex flex-column gap-2">
            <ListGroup.Item className="d-flex justify-content-xl-between">
              <h2>{mobile.mobile_name}</h2>
              <CloseButton className="d-none d-xl-flex" onClick={goBack} />
            </ListGroup.Item>
            <ListGroup
              variant="flush"
              className=" gap-3  justify-content-center"
            >
              <ListGroup.Item>
                <strong>Display:</strong> {mobile.screen_size}"
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Internal/RAM:</strong> {mobile.internal}GB {mobile.ram}
                GB RAM
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Processor:</strong> {mobile.processor}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Baterry:</strong> {mobile.battery} mAh
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>OS:</strong> {mobile.os}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Camera:</strong> {mobile.camera}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> {mobile.price} KM
              </ListGroup.Item>
            </ListGroup>
            {user && mobile.quantity > 0 ? (
              <Container className="d-flex flex-row row flex-wrap gap-3 mt-3">
                <Form.Group className="d-flex flex-wrap justify-content-around gap-md-4 col-12 col-md-auto">
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    min={1}
                    className="w-auto"
                    defaultValue={1}
                    max={mobile.quantity}
                    onChange={handleQuantity}
                  />
                  <Button
                    onClick={() => addToCart(mobile.id)}
                    variant="light"
                    className="border-secondary col-9 col-md-auto"
                  >
                    Add to cart
                  </Button>
                </Form.Group>
                <Button
                  className="bg-custom col-11 mx-auto mx-md-0 col-md-auto border-0"
                  onClick={() => orderMobile()}
                >
                  Buy now
                </Button>
              </Container>
            ) : (
              <Alert variant="secondary" className="text-center">
                Product is not available
              </Alert>
            )}
          </Container>
        </Container>
      ) : (
        isError && <p>Something went wrong, please try again later!</p>
      )}
    </Container>
  );
}
