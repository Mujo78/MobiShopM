import { apiClientAuth, apiClientBase } from "../../helpers/ApiClient";

export async function fetchTopPrice() {
  const res = await apiClientBase.get("/mobile/top-prices");
  return res.data;
}

export async function fetchBrands() {
  const res = await apiClientBase.get("/brand");
  return res.data;
}

export async function deleteBrandFn(brandId) {
  const res = await apiClientAuth.delete(`/brand/${brandId}`);
  return res.data;
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

export async function getMobileByName(searchQuery, page) {
  const res = await apiClientAuth.get("/mobile/admin/search", {
    params: { searchQuery, page },
  });
  return res.data;
}

export async function editMobileFn(mobileId, mobileData) {
  const res = await apiClientAuth.put(`/mobile/${mobileId}`, mobileData);
  return res.data;
}

export async function deleteMobileFn(mobileId) {
  const res = await apiClientAuth.delete(`/mobile/${mobileId}`);
  return res.data;
}
