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
  const { deleteCartItem, cartItems, status, isError } = useCartData();
  const { user } = useAuth();

  const deleteItem = (event, itemId) => {
    event.stopPropagation();
    deleteCartItem(itemId);
  };

  const handleNavigate = (itemId) => {
    onHide();
    navigate(`/profile/my-cart?cartItem=${itemId}`, { replace: true });
  };

  return (
    <Offcanvas show={show} onHide={onHide}>
      {!user ? (
        <Offcanvas.Body>
          <CustomAlert variant="secondary" fromTop={5}>
            You have to be logged in to see your cart!
          </CustomAlert>
        </Offcanvas.Body>
      ) : (
        <>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">My cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body id="cart_modal_body" className="d-flex flex-column">
            {status === "pending" ? (
              <CustomSpinner />
            ) : cartItems?.length > 0 ? (
              <>
                <MyCartInfo size={3} />
                <ListGroup className="gap-3 mt-1">
                  {cartItems.map((n) => (
                    <ListGroup.Item
                      key={n.id}
                      className="border cart-list-item"
                      onClick={() => handleNavigate(n?.id)}
                    >
                      <h6>
                        {n.Mobile.mobile_name} ({n.Mobile.internal}/
                        {n.Mobile.ram} GB)
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>
                          Quantity: <strong> {n.quantity} </strong>
                        </p>
                        <IconButton
                          onClick={(event) => deleteItem(event, n.id)}
                        >
                          <BsTrash color="gray" />
                        </IconButton>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            ) : isError ? (
              <CustomAlert variant="danger" fromTop={5}>
                Something went wrong, please try again later!
              </CustomAlert>
            ) : (
              <CustomAlert id="alert_message" variant="secondary" fromTop={5}>
                Empty
              </CustomAlert>
            )}
          </Offcanvas.Body>
          <Offcanvas.Header>
            <Button
              onClick={onHide}
              className="w-100 bg-custom bg-custom-class border-0 rounded"
            >
              Continue shopping
            </Button>
          </Offcanvas.Header>
        </>
      )}
    </Offcanvas>
  );
}
