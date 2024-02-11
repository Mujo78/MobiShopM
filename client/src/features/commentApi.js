import axios from "axios";
const URL = "http://localhost:3001/api";

export async function postComment(commentData) {
  const res = await axios.post(`${URL}/add-comment`, commentData);

  return res.data;
}
