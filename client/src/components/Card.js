import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/esm/Container";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Cards({ mob }) {
  const [heartState, setheartState] = useState(false);
  const [wishListState, setWishListState] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleHeartFillTrue = (id) => {
    axios
      .post(
        `http://localhost:3001/add-to-wishlist/${id}`,
        {},
        {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        setheartState(true);
        getWishItems();
        toast.success("Successfully added to wishlist!");
      })
      .catch((error) => toast.error(error));
  };
  const handleHeartEmptyFalse = (id) => {
    axios
      .delete(`http://localhost:3001/delete-wishitem/${id}`, {
        headers: {
          accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        getWishItems();
        setheartState(false);
        toast.info("Item removed from wishlist!");
      })
      .catch((error) => toast.error(error));
  };

  const getWishItems = () => {
    if (user?.id !== 0 && user?.role === 2) {
      axios
        .get(`http://localhost:3001/wish-items`, {
          headers: {
            accessToken: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => setWishListState(response.data))
        .catch((error) => toast.error(error));
    }
  };

  const handleNavigate = () => {
    navigate(`/mobile/${mob.id}/${mob.mobile_name}`);
  };

  return (
    <Card
      className="border-0 position-relative text-center"
      onClick={handleNavigate}
      style={{ width: "12rem", cursor: "pointer" }}
    >
      <Card.Img variant="top" src={mob.photo} alt="photo" />
      <Card.Title className="mt-2" style={{ fontSize: "0.9rem" }}>
        {mob.mobile_name}
      </Card.Title>
      <Card.Body className="d-flex flex-column pb-0 pt-1">
        <Container>
          <Card.Text className="p-0 text-danger">
            <p style={{ fontSize: "0.9rem" }} className="fw-bold">
              {mob.price} BAM
            </p>
          </Card.Text>
        </Container>
      </Card.Body>
      {user?.role === 2 &&
        (wishListState.some((n) => n.MobileId === mob.id) ? (
          <Button
            onClick={() => handleHeartEmptyFalse(mob.id)}
            className="border-0 bg-transparent wishlist-btn p-0"
          >
            <BsHeartFill fill="red" />
          </Button>
        ) : (
          <Button
            onClick={() => handleHeartFillTrue(mob.id)}
            className="border-0 bg-transparent wishlist-btn p-0"
          >
            <BsHeart fill="white" />
          </Button>
        ))}
    </Card>
  );
}
