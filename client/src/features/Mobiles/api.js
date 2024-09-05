import axios from "axios";
import { apiClientBase } from "../../helpers/ApiClient";
const URL = "http://localhost:3001/api";

export async function fetchTopPrice() {
  const res = await apiClientBase.get("/mobile/top-prices");
  return res.data;
}

export async function fetchBrands() {
  const res = await apiClientBase.get("brand");
  return res.data;
}

export async function deleteBrandFn(token, brandId) {
  await axios.delete(`${URL}/delete-brand/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchMobilesByBrand(brandId, page, searchQuery) {
  const res = await apiClientBase.get(`/mobile/brand/${brandId}`, {
    params: { page, searchQuery },
  });

  return res.data;
}

export async function getMobileByIdFn(mobileId) {
  const res = await apiClientBase.get(`/mobile/${mobileId}`);
  return res.data;
}

export async function getMobileByName(token, searchQuery, page) {
  const res = await axios.get(`${URL}/search-mobile-name`, {
    params: {
      searchQuery,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function editMobileFn(token, mobileId, mobileData) {
  await axios.put(`${URL}/edit-mobile/${mobileId}`, mobileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteMobileFn(token, mobileId) {
  await axios.delete(`${URL}/delete-mobile/${mobileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
