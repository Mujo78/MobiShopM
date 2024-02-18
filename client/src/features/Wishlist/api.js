import axios from "axios";
const URL = "http://localhost:3001/api";

export async function getMyWishlistFn(token, includeMobile) {
  const res = await axios.get(`${URL}/wishlist`, {
    params: { includeMobile },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getMyWishlistDetailsFn(token, page) {
  const res = await axios.get(`${URL}/wishlist-details`, {
    params: { page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function addToWishListFn(token, mobileId) {
  await axios.post(
    `${URL}/add-to-wishlist/${mobileId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteWishitemFn(token, mobileId) {
  await axios.delete(`${URL}/delete-wishitem/${mobileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
