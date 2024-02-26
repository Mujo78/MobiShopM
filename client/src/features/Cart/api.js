import axios from "axios";
const URL = "http://localhost:3001/api";

export async function addToCartFn(token, mobileId, quantity) {
  const res = await axios.post(
    `${URL}/add-to-cart/${mobileId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchMyCartFn(token) {
  const res = await axios.get(`${URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateCartItemFn(token, itemId, quantity) {
  const res = await axios.patch(
    `${URL}/update-cart-item/${itemId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteCartItemFn(token, itemId) {
  await axios.delete(`${URL}/delete-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
