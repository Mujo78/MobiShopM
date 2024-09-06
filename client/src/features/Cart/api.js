import { apiClientAuth } from "../../helpers/ApiClient";
import axios from "axios";
const URL = "http://localhost:3001/api";

export async function addToCartFn(mobileId, quantity) {
  const res = await apiClientAuth.post(`/cart/${mobileId}`, { quantity });
  return res.data;
}

export async function fetchMyCartFn() {
  const res = await apiClientAuth.get("/cart");
  return res.data;
}

export async function fetchCartItemFn(token, itemId) {
  const res = await axios.get(`${URL}/cart-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateCartItemFn(itemId, quantity) {
  const res = await apiClientAuth.patch(`/cart/${itemId}`, {
    quantity,
  });
  return res.data;
}

export async function deleteCartItemFn(itemId) {
  const res = await apiClientAuth.delete(`/cart/${itemId}`);
  return res.data;
}
