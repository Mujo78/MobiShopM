import { useCartData } from "../../context/CartContext";
import MyCartCard from "../../components/Cart/MyCartCard";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from "react-bootstrap/esm/Alert";
import Button from "react-bootstrap/esm/Button";

export default function MyCart() {
  const { cartItems, status, isError } = useCartData();
  const numOfItems = cartItems?.length;

  return (
    <Container>
      {status === "pending" ? (
        <div className="w-100 mt-3 d-flex justify-content-center">
          <Spinner />
        </div>
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
              <Container
                className="p-0 d-flex flex-wrap justify-content-between align-items-center border-bottom"
                style={{ fontSize: "0.9rem" }}
              >
                <p>
                  {numOfItems} {numOfItems > 1 ? "ITEMS" : "ITEM"}
                </p>
                <p>Total: </p>
              </Container>
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
            <Alert className="mt-5 text-center" variant="secondary">
              Cart empty
            </Alert>
          )}
        </>
      ) : (
        isError && (
          <Alert className="mt-5 text-center" variant="danger">
            Something went wrong, please try again later!
          </Alert>
        )
      )}
    </Container>
  );
}
