import { apiClientBase, apiClientAuth } from "../../helpers/ApiClient";

export async function userLogin(loginData) {
  const res = await apiClientBase.post("/user", loginData);
  return res.data;
}

export async function userSignup(registrationData) {
  const res = await apiClientBase.post("/person", registrationData);
  return res.data;
}

export async function forgotPasswordFn(data) {
  const res = await apiClientBase.post("/user/forgot-password", data);
  return res.data;
}

export async function verifyFn(token) {
  const res = await apiClientBase.patch(`/user/verify/${token}`);
  return res.data;
}

export async function resetPasswordFn({ token, data }) {
  const res = await apiClientBase.patch(`/user/reset-password/${token}`, data);
  return res.data;
}

export async function deleteMyAccount() {
  const res = await apiClientAuth.delete("/person");
  return res.data;
}

export async function getMyInformations() {
  const res = await apiClientAuth.get("/person");
  return res.data;
}

export async function editMyInformations(values) {
  const res = await apiClientAuth.put("/person", values);
  return res.data;
}

export async function changeMyUsername(value) {
  const res = await apiClientAuth.patch("/user/username", { username: value });
  return res.data;
}

export async function changePassword(passwords) {
  const res = await apiClientAuth.patch("/user/password", passwords);
  return res.data;
}
