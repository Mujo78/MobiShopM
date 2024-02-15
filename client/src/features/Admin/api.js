import axios from "axios";
const URL = "http://localhost:3001/api";

export async function getAllAdmins(token) {
  const res = await axios.get(`${URL}/all-admins`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function addNewAdminFn(token, adminData) {
  await axios.post(`${URL}/add-admin`, adminData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteAdminFn(token, id) {
  await axios.delete(`${URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addNewMobileFn(token, mobileData) {
  await axios.post(`${URL}/add-mobile`, mobileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getBrandsFn() {
  const res = await axios.get(`${URL}/brands`);

  return res.data;
}

export async function addNewBrandFn(token, brandData) {
  await axios.post(
    `${URL}/add-brand`,
    { name: brandData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getAllCommentsFn(token) {
  const res = await axios.get(`${URL}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function deleteCommentFn(token, id) {
  await axios.delete(`${URL}/delete-comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
