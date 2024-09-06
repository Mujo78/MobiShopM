import { apiClientAuth } from "../../helpers/ApiClient";

export async function getMyWishlistFn() {
  const res = await apiClientAuth.get("/wishlist");
  return res.data;
}

export async function getMyWishlistDetailsFn(page) {
  const res = await apiClientAuth.get("/wishlist/details", {
    params: { page },
  });
  return res.data;
}

export async function addToWishListFn(mobileId) {
  const res = await apiClientAuth.post(`/wishlist/${mobileId}`, {});
  return res.data;
}

export async function deleteWishitemFn(mobileId) {
  const res = await apiClientAuth.delete(`/wishlist/${mobileId}`);
  return res.data;
}
