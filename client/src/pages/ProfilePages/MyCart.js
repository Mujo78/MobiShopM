import MyCartCard from "../../components/Cart/MyCartCard";

export default function MyCart() {
  const cartItemsInfo = [];

  return (
    <>
      <h3>My Cart</h3>
      <p style={{ fontSize: "13px" }}>
        {cartItemsInfo.length} {cartItemsInfo.length > 1 ? "ITEMS" : "ITEM"}
      </p>
      <MyCartCard />
    </>
  );
}
