import axios from "axios";
const URL = "http://localhost:3001/api";

export async function fetchTopPrice() {
  const res = await axios.get(`${URL}/mobiles-top-prices`);

  return res.data;
}
