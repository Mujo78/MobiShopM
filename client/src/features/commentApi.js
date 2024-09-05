import { apiClientBase } from "../helpers/ApiClient";

export async function postComment(commentData) {
  const res = await apiClientBase.post("/comment", commentData);
  return res.data;
}
