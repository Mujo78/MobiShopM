import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useAuth } from "../../context/AuthContext";
import Alert from "react-bootstrap/Alert";
import { useCartData } from "../../context/CartContext";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

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
        <Alert variant="secondary" className="m-auto">
          You have to be logged in to see your cart!
        </Alert>
      ) : (
        <>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">My cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column">
            {status === "pending" ? (
              <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                <Spinner />
              </div>
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
                      <Button
                        className="bg-transparent border-0 cart-trash-btn"
                        onClick={(event) => deleteItem(event, n.id)}
                      >
                        <BsTrash color="gray" />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : isError ? (
              <Alert variant="danger" className="text-center mt-5">
                Something went wrong, please try again later!
              </Alert>
            ) : (
              <Alert variant="secondary" className="text-center mt-5">
                Empty
              </Alert>
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
