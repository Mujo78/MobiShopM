import axios from "axios";
const URL = "http://localhost:3001/api";

export async function buyNowMobileFn(token, mobileId, data) {
  await axios.post(`${URL}/buy-now/${mobileId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function buyCartItemFn(token, itemId, payment_info) {
  const res = await axios.post(
    `${URL}/buy-cart-item/${itemId}`,
    { payment_info },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
