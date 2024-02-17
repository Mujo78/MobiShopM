import axios from "axios";
const URL = "http://localhost:3001/api";

export async function addToCartFn(token, mobileId, quantity) {
  await axios.post(
    `${URL}/add-to-cart/${mobileId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
