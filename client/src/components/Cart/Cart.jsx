import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth } from "../../context/AuthContext";
import { useCartData } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import MyCartInfo from "./MyCartInfo";
import IconButton from "../UI/IconButton";
import CustomSpinner from "../UI/CustomSpinner";
import CustomAlert from "../UI/Alert";

export default function Cart({ show, onHide }) {
  const navigate = useNavigate();
  const { cartItems, status, isError, deleteCartItem } = useCartData();
  const { user } = useAuth();

  const deleteItem = (event, itemId) => {
    event.stopPropagation();
    deleteCartItem(itemId);
  };

  const handleNavigate = (mobileId, mobileName) => {
    onHide();
    navigate(`/mobile/${mobileId}/${mobileName}`, { replace: true });
  };

  return (
    <Offcanvas show={show} onHide={onHide}>
      {!user ? (
        <CustomAlert variant="secondary">
          You have to be logged in to see your cart!
        </CustomAlert>
      ) : (
        <>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">My cart</Offcanvas.Title>
          </Offcanvas.Header>
          <MyCartInfo size={3} />
          <Offcanvas.Body className="d-flex flex-column">
            {status === "pending" ? (
              <CustomSpinner />
            ) : cartItems?.length > 0 ? (
              <ListGroup className="gap-3">
                {cartItems.map((n) => (
                  <ListGroup.Item
                    key={n.id}
                    className="border cart-list-item"
                    onClick={() =>
                      handleNavigate(n?.Mobile?.id, n?.Mobile?.mobile_name)
                    }
                  >
                    <h6>
                      {n.Mobile.mobile_name} ({n.Mobile.internal}/{n.Mobile.ram}{" "}
                      GB)
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        Quantity: <strong> {n.quantity} </strong>
                      </p>
                      <IconButton onClick={(event) => deleteItem(event, n.id)}>
                        <BsTrash color="gray" />
                      </IconButton>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : isError ? (
              <CustomAlert variant="danger" fromTop={5}>
                Something went wrong, please try again later!
              </CustomAlert>
            ) : (
              <CustomAlert variant="secondary" fromTop={5}>
                Empty
              </CustomAlert>
            )}
          </Offcanvas.Body>
          <Offcanvas.Header>
            <Button
              onClick={onHide}
              className="w-100 bg-custom border-0 rounded"
            >
              Continue shopping
            </Button>
          </Offcanvas.Header>
        </>
      )}
    </Offcanvas>
  );
}
