import axios from "axios";
import { apiClientAuth } from "../../helpers/ApiClient";
const URL = "http://localhost:3001/api";

export async function buyNowMobileFn(mobileId, data) {
  const res = await apiClientAuth.post(`/order/buy-now/${mobileId}`, data);
  return res.data;
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
