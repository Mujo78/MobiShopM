import { useCartData } from "../../context/CartContext";
import MyCartCard from "../../components/Cart/MyCartCard";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import MyCartInfo from "../../components/Cart/MyCartInfo";
import CustomSpinner from "../../components/UI/CustomSpinner";
import CustomAlert from "../../components/UI/Alert";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useEffect } from "react";
import { Element, scroller } from "react-scroll";

export default function MyCart() {
  const { cartItems, status, isError, numOfItems } = useCartData();
  const cartItem = useQueryParams().get("cartItem") ?? null;

  useEffect(() => {
    if (cartItem) {
      const toProp = `itemCard${cartItem}`;
      scroller.scrollTo(toProp, {
        duration: 300,
        smooth: "easeInOutQuint",
        containerId: "content",
      });
    }
  }, [cartItem]);

  return (
    <Container>
      {status === "pending" ? (
        <CustomSpinner />
      ) : cartItems ? (
        <>
          <Container className="p-0 d-flex flex-wrap justify-content-between align-items-center">
            <h3 className="mt-4">My Cart</h3>
            {numOfItems > 0 && (
              <Button className="bg-custom border-0 rounded bg-custom-class">
                Order All
              </Button>
            )}
          </Container>
          {numOfItems > 0 ? (
            <>
              <MyCartInfo />
              <Container
                className="d-flex px-0 py-2 flex-column gap-4"
                id="content"
                style={{
                  scrollBehavior: "smooth",
                  maxHeight: "470px",
                  overflowY: "auto",
                }}
              >
                {cartItems.map((m) => (
                  <Element key={m.id} name={`itemCard${m.id}`}>
                    <MyCartCard data={m} />
                  </Element>
                ))}
              </Container>
            </>
          ) : (
            status === "idle" &&
            !isError && (
              <CustomAlert fromTop={5} variant="secondary">
                Cart empty
              </CustomAlert>
            )
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
