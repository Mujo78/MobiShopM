import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteMyAccount } from "../features/User/api";

const ProfileNavigation = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: ["accountDelete"],
    mutationFn: (token) => deleteMyAccount(token),
  });

  const [showErrorModal, setShowShowErrorModal] = useState(isError);
  const styles = {
    borderRadius: "0px",
    marginBottom: "1px",
    border: "none",
    textAlign: "center",
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const deleteMyAcc = () => {
    mutate(user.token);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      logout();
      navigate("/");
    }
  }, [isSuccess, logout, navigate]);

  return (
    <>
      <ListGroup className="d-flex flex-column flex-md-row flex-lg-column mt-5 w-100 margin-class">
        <ListGroup.Item
          className="rounded-top rounded-start-class"
          as={NavLink}
          end
          to={`.`}
          style={styles}
          variant="secondary"
          action
        >
          Profile
        </ListGroup.Item>
        <ListGroup.Item
          as={NavLink}
          end
          to={`edit-profile`}
          style={styles}
          variant="secondary"
          action
        >
          Edit profile
        </ListGroup.Item>
        {user?.role === 2 && (
          <>
            <ListGroup.Item
              as={NavLink}
              to={`my-cart`}
              style={styles}
              variant="secondary"
              action
            >
              Cart
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              to={`orders`}
              style={styles}
              variant="secondary"
              action
            >
              Orders
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              to={`wishlist`}
              style={styles}
              variant="secondary"
              action
            >
              Wishlist
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item
          className="rounded-bottom rounded-end-class"
          onClick={handleShow}
          as={Button}
          style={styles}
          variant="danger"
          action
        >
          Delete Account
        </ListGroup.Item>
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete your account?</h5>
          <p>By deleting your account, you will lose access forever!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteMyAcc}>
            Delete My Account
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Account Problem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            There was an error while deleting your account, please try again
            latter!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowShowErrorModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileNavigation;
