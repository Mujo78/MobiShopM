/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import OrderModal from "../Order/OrderModal";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Image } from "../UI/Nav";
import useResponsive from "../useResponsive";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../../context/AuthContext";

const CustomListGroupItem = styled(ListGroup.Item)`
  p {
    color: #c0c0c0;
    font-family: sans-serif;
    font-size: 13px;
  }

  h6 {
    margin: 0;
  }
`;

export default function MyCartCard() {
  const { user } = useAuth();
  const infoPersonState = {
    first_name: "",
    last_name: "",
    city: "",
    address: "",
  };

  const cartItemsInfo = [];

  const setCartItemsInfo = () => {
    console.log("object");
  };
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [specificPhone, setSpecificPhone] = useState(null);
  const { isMobile, isTablet } = useResponsive();

  const handleClose = () => {
    getCartItemsInfo();
    setShowOrderModal(false);
  };

  const getCartItemsInfo = () => {
    if (user && user?.id !== 0) {
      axios
        .get(`http://localhost:3001/cart/${user?.id}`, {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => setCartItemsInfo(response.data))
        .catch((error) => console.log(error));
    }
  };

  const deleteFromCart = (id) => {
    axios
      .delete(`http://localhost:3001/delete-item/${id}`, {
        headers: {
          accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        getCartItemsInfo();
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getCartItemsInfo();
  }, []);

  const orderSpecificPhone = (n) => {
    setSpecificPhone(n);
    setShowOrderModal(true);
  };

  return (
    <>
      {cartItemsInfo.length > 0 ? (
        <ListGroup
          className="mb-5"
          variant="flush"
          style={{ maxHeight: "470px", overflowX: "hidden", overflowY: "auto" }}
        >
          {!isMobile && (
            <CustomListGroupItem className="w-100 justify-content-end p-0 m-0 d-flex flex-wrap">
              <Row className="d-flex w-75 justify-content-end">
                <Col style={{ flex: "0.15" }}>
                  <p>Price</p>
                </Col>
                <Col style={{ flex: "0.24" }}>
                  <p>Quantity</p>
                </Col>
                <Col style={{ flex: "0.15" }}>
                  <p>Total</p>
                </Col>
                <Col sm={1}>
                  <p>Buy</p>
                </Col>
                <Col sm={2}>
                  <p>Remove</p>
                </Col>
              </Row>
            </CustomListGroupItem>
          )}
          {cartItemsInfo.map((n) => (
            <CustomListGroupItem
              key={n.id}
              className={`w-100 mt-2 mb-2 d-flex justify-content-start ${
                isMobile && `flex-column`
              } align-items-center text-center`}
              style={{ border: "1px solid #219aeb", borderRadius: 0 }}
            >
              <Container
                className={`d-flex p-0 align-items-center ${
                  isMobile ? "w-100" : "w-25"
                }`}
              >
                <Col>
                  <img src={n.photo} alt="img" style={{ height: "80px" }} />
                </Col>
                <h6 className="ms-3">{n.mobile_name}</h6>
              </Container>
              <Container
                className={`d-flex ${
                  isMobile
                    ? `w-100  justify-content-around`
                    : `w-75 justify-content-end`
                } p-0 align-items-center`}
              >
                {!isMobile && (
                  <Col sm={2}>
                    <h6>{n.price} KM</h6>
                  </Col>
                )}
                <Col sm={2}>
                  <h6>
                    {isMobile && "Q:"} {n.quantity}
                  </h6>
                </Col>
                <Col sm={2}>
                  <h6>
                    {isMobile && "T:"} {n.price * n.quantity} KM
                  </h6>
                </Col>
                <Col sm={isTablet ? 2 : 1}>
                  <Button
                    style={{
                      backgroundColor: "#219aeb",
                      borderRadius: 0,
                      border: "none",
                    }}
                    onClick={() => orderSpecificPhone(n)}
                  >
                    Order
                  </Button>
                </Col>
                <Col sm={isTablet ? 1 : 2}>
                  <Button
                    onClick={() => deleteFromCart(n.id)}
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <Image
                      src="/images/trash.png"
                      alt="trash"
                      style={{ height: "20px" }}
                    />
                  </Button>
                </Col>
              </Container>
              {showOrderModal && (
                <OrderModal
                  show={showOrderModal}
                  handleClose={handleClose}
                  data={specificPhone}
                  dataPerson={infoPersonState}
                />
              )}
            </CustomListGroupItem>
          ))}{" "}
        </ListGroup>
      ) : (
        <Alert className="mt-5 text-center" variant="secondary">
          Cart is empty
        </Alert>
      )}
    </>
  );
}
