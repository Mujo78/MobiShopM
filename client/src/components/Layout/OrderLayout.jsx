import React from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Image from "react-bootstrap/esm/Image";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../UI/CustomSpinner";
import CustomAlert from "../UI/Alert";

const OrderLayout = ({
  isFetching,
  isPending,
  mobile,
  quantity,
  isError,
  children,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <Container className="pb-2 pb-xl-0">
      {isFetching || isPending ? (
        <CustomSpinner />
      ) : mobile && quantity ? (
        <Container className="d-flex gap-5 flex-wrap flex-xl-nowrap justify-content-center flex-row">
          <Image
            src={mobile?.photo}
            alt="photo"
            className="mobile-img-class h-auto"
          />
          <Container className="d-flex flex-column gap-2">
            <ListGroup.Item className="d-flex justify-content-xl-between">
              <h3 className="mx-auto">Order Details</h3>
              <CloseButton className="d-none d-xl-flex" onClick={goBack} />
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>{mobile?.mobile_name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {mobile?.internal}/{mobile?.ram} GB, {mobile?.processor},{" "}
              {mobile?.battery} mAh, {mobile?.os}, {mobile?.camera},{" "}
              {mobile?.screen_size}", {mobile?.camera}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                Price: <span className="text-danger">{mobile?.price} BAM</span>
              </h4>
            </ListGroup.Item>
            {children}
            <ListGroup.Item style={{ fontSize: "0.9rem" }}>
              <em>
                <strong>Note:</strong> All information needed for this order
                will be taken from your profile data (address, city,
                phone_number etc.).
              </em>
            </ListGroup.Item>
          </Container>
        </Container>
      ) : (
        (!quantity || isError) && (
          <CustomAlert variant="danger" fromTop={2}>
            Something went wrong, please try again later!
          </CustomAlert>
        )
      )}
    </Container>
  );
};

export default OrderLayout;
