import axios from "axios";
const URL = "http://localhost:3001/api";

export async function fetchBrands() {
  const res = await axios.get(`${URL}/brands`);
  return res.data;
}

export async function fetchMobilesByBrand(brandId, page, searchQuery) {
  const res = await axios.get(`${URL}/brand-mobiles/${brandId}`, {
    params: { page, searchQuery },
  });

  return res.data;
}
