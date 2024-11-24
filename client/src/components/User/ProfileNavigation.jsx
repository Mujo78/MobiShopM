import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteMyAccount } from "../../features/User/api";

const ProfileNavigation = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationKey: ["accountDelete"],
    mutationFn: deleteMyAccount,
    retry: 1,
    onSuccess: () => {
      handleClose();
      logout();
      navigate("/");
    },
    onError: () => {
      handleClose();
      handleShowErrorModal();
    },
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

  const handleShowErrorModal = () => {
    setShowShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowShowErrorModal(false);
  };
  const deleteMyAcc = () => {
    mutate();
  };

  return (
    <>
      <ListGroup className="d-flex flex-column flex-md-row flex-lg-column mt-5 w-100 border-class">
        <ListGroup.Item as={NavLink} to="." end style={styles} variant="light">
          General
        </ListGroup.Item>
        <ListGroup.Item
          as={NavLink}
          end
          active={
            pathname.includes("edit-profile") ||
            pathname.includes("change-password")
          }
          to="edit-profile"
          style={styles}
          variant="light"
        >
          Edit profile
        </ListGroup.Item>
        {user?.role === 2 && (
          <>
            <ListGroup.Item
              as={NavLink}
              to="my-cart"
              style={styles}
              variant="light"
            >
              Cart
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              to="orders"
              style={styles}
              variant="light"
            >
              My Orders
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              to="wishlist"
              style={styles}
              variant="light"
            >
              Wishlist
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item
          className="rounded-bottom rounded-end-class w-auto"
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
          <Button
            variant="light"
            className="border me-auto"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="danger" onClick={deleteMyAcc}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
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
          <Button
            className="bg-custom bg-custom-class border-0"
            onClick={handleCloseErrorModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileNavigation;
