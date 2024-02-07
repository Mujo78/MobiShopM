import axios from "axios";
const URL = "http://localhost:3001/api";

export async function userLogin(loginData) {
  const res = await axios.post(`${URL}/login`, loginData);
  return res.data;
}

export async function userSignup(registrationData) {
  const res = await axios.post(`${URL}/registration`, registrationData);
  return res.data;
}
