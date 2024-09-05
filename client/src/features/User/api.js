import { apiClientBase } from "../../helpers/ApiClient";
import axios from "axios";
const URL = "http://localhost:3001/api";

export async function userLogin(loginData) {
  const res = await axios.post(`${URL}/login`, loginData);
  return res.data;
}

export async function userSignup(registrationData) {
  const res = await apiClientBase.post(`/person`, registrationData);
  return res.data;
}

export async function deleteMyAccount(token) {
  const res = await axios.delete(`${URL}/delete-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getMyInformations(token) {
  const res = await axios.get(`${URL}/person`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function editMyInformations(token, values) {
  const res = await axios.patch(`${URL}/edit-profile`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function changeMyUsername(token, value) {
  await axios.patch(
    `${URL}/change-username`,
    { username: value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function changePassword(token, passwords) {
  await axios.patch(`${URL}/change-password`, passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
