import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/esm/Container";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAddToWishlist } from "../features/Wishlist/useAddToWishlist";
import { useDeleteFromWishlist } from "../features/Wishlist/useDeleteWishitem";
import { useState } from "react";

export default function Cards({ mob, wishlist, disabled }) {
  const { user } = useAuth();
  const [heartState, setHeartState] = useState(
    wishlist?.find((n) => n.mobileId === mob.id)
  );
  const navigate = useNavigate();
  const { addToWishlist } = useAddToWishlist();
  const { deleteWishitem } = useDeleteFromWishlist();

  const addProductToWishlist = (event) => {
    event.stopPropagation();
    if (mob.id) {
      addToWishlist(mob.id, {
        onSuccess: () => {
          setHeartState(true);
        },
      });
    }
  };
  const deleteProductFromWishlist = (event) => {
    event.stopPropagation();
    if (mob.id) {
      deleteWishitem(mob.id, {
        onSuccess: () => {
          setHeartState(false);
        },
      });
    }
  };

  const handleNavigate = () => {
    if (!disabled) {
      navigate(`/mobile/${mob.id}/${mob.mobile_name}`);
    }
  };

  return (
    <Card
      className="border-0 position-relative text-center pb-1"
      onClick={handleNavigate}
      style={{ maxWidth: "12rem", cursor: "pointer" }}
    >
      <Card.Img variant="top" src={mob.photo} alt="photo" />
      <Card.Title className="mt-2" style={{ fontSize: "0.9rem" }}>
        {mob.mobile_name}
      </Card.Title>
      <Card.Body className="d-flex flex-column pb-0 pt-1">
        <Container>
          <Card.Text
            className="p-0 text-danger fw-bold"
            style={{ fontSize: "0.9rem" }}
          >
            {mob.price} BAM
          </Card.Text>
        </Container>
      </Card.Body>
      {user?.role === 2 &&
        !disabled &&
        (heartState ? (
          <Button
            onClick={(event) => deleteProductFromWishlist(event)}
            className="border-0 bg-transparent wishlist-btn p-0"
          >
            <BsHeartFill fill="red" />
          </Button>
        ) : (
          <Button
            onClick={(event) => addProductToWishlist(event)}
            className="border-0 bg-transparent wishlist-btn p-0"
          >
            <BsHeart fill="white" />
          </Button>
        ))}
    </Card>
  );
}
