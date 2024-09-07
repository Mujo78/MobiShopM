import { apiClientAuth } from "../../helpers/ApiClient";

export async function getAllAdmins(page) {
  const res = await apiClientAuth.get("/user/all", { params: { page } });
  return res.data;
}

export async function addNewAdminFn(adminData) {
  const res = await apiClientAuth.post("person/admin", adminData);
  return res.data;
}

export async function deleteAdminFn(id) {
  const res = await apiClientAuth.delete(`/person/${id}`);
  return res.data;
}

export async function addNewMobileFn(mobileData) {
  const res = await apiClientAuth.post("/mobile", mobileData);
  return res.data;
}

export async function addNewBrandFn(brandData) {
  const res = await apiClientAuth.post("/brand/", { name: brandData });
  return res.data;
}

export async function getAllCommentsFn(page) {
  const res = await apiClientAuth.get("/comment", { params: { page } });
  return res.data;
}

export async function deleteCommentFn(id) {
  const res = await apiClientAuth.delete(`/comment/${id}`);
  return res.data;
}
