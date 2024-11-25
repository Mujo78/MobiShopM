import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Image from "react-bootstrap/esm/Image";
import { BsTrash, BsCheck } from "react-icons/bs";
import { useCartData } from "../../context/CartContext";
import IconButton from "../UI/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyCartCard({
  data: {
    quantity,
    total,
    id: itemId,
    Mobile: { id, mobile_name, price, photo, quantity: mobileQuantity },
  },
}) {
  const [value, setValue] = useState(quantity);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { deleteCartItem, updateCartItem } = useCartData();

  const deleteFromCart = () => {
    deleteCartItem(itemId);
  };

  const handleUpdate = () => {
    if (parseInt(value) === 0) {
      toast.error("Quantity cannot be equal or less than 0.");
    } else {
      updateCartItem(itemId, value);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;

    setValue(value);
  };

  const handleNavigate = () => {
    navigate(`/mobile/${id}/${mobile_name}`);
  };

  const handleOrder = () => {
    if (itemId) {
      navigate(`/order/cart-item/${itemId}`, { replace: true });
    }
  };

  const showBtn = quantity !== value;

  return (
    <Card
      className={`d-flex flex-column flex-sm-row w-100 align-items-center ${
        state === parseInt(itemId) ? "border" : "border-0"
      }`}
    >
      <Image
        src={photo}
        alt="mobile photo"
        style={{ cursor: "pointer" }}
        className="w-25 h-auto"
        onClick={handleNavigate}
      />
      <Card.Body className="w-100 d-flex flex-column gap-2">
        <Container className="p-0 d-flex justify-content-between align-items-center">
          <Card.Title>{mobile_name}</Card.Title>
          {showBtn && (
            <Button
              onClick={handleUpdate}
              className="bg-custom bg-custom-class border-0 rounded px-2 py-1"
            >
              <BsCheck />
            </Button>
          )}
        </Container>
        <span>
          <strong>Price: </strong>
          {price} BAM
        </span>
        <Container className="p-0 d-flex align-items-baseline gap-1">
          <span>
            <strong>Quantity: </strong>
          </span>
          <Form.Control
            value={value}
            min={1}
            max={mobileQuantity + quantity}
            type="number"
            className="px-1 py-0"
            style={{ width: "3rem" }}
            name="value"
            onChange={handleChange}
          />
        </Container>
        <span>
          <strong>Total: </strong>
          {total.toFixed(2)} BAM
        </span>

        <Container className="d-flex justify-content-between p-0">
          <Button
            onClick={handleOrder}
            className="bg-custom border-0 rounded bg-custom-class"
          >
            Order
          </Button>
          <IconButton onClick={deleteFromCart}>
            <BsTrash color="gray" />
          </IconButton>
        </Container>
      </Card.Body>
    </Card>
  );
}
