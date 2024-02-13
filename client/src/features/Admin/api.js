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
