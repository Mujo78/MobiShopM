import { useCartData } from "../../context/CartContext";
import MyCartCard from "../../components/Cart/MyCartCard";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import MyCartInfo from "../../components/Cart/MyCartInfo";
import CustomSpinner from "../../components/UI/CustomSpinner";
import CustomAlert from "../../components/UI/Alert";

export default function MyCart() {
  const { cartItems, numOfItems, status, isError } = useCartData();

  return (
    <Container>
      {status === "pending" ? (
        <CustomSpinner />
      ) : cartItems ? (
        <>
          <Container className="p-0 d-flex flex-wrap justify-content-between align-items-center">
            <h3 className="mt-4">My Cart</h3>
            {numOfItems > 0 && (
              <Button className="bg-custom border-0 rounded">Order All</Button>
            )}
          </Container>
          {numOfItems > 0 ? (
            <>
              <MyCartInfo />
              <Container
                id="content"
                className="d-flex px-0 py-2 flex-column gap-4"
                style={{
                  scrollBehavior: "smooth",
                  maxHeight: "470px",
                  overflowY: "auto",
                }}
              >
                {cartItems.map((m) => (
                  <MyCartCard key={m.id} data={m} />
                ))}
              </Container>
            </>
          ) : (
            <CustomAlert fromTop={5} variant="secondary">
              Cart empty
            </CustomAlert>
          )}
        </>
      ) : (
        isError && (
          <CustomAlert fromTop={5} variant="danger">
            Something went wrong, please try again later!
          </CustomAlert>
        )
      )}
    </Container>
  );
}
