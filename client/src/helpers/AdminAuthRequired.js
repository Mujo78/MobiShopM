import { redirect } from "react-router-dom";

const AdminAuthRequired = () => {
  const user = localStorage.getItem("user");
  const adminUserObj = user && JSON.parse(user);

  if (adminUserObj?.role !== 1) {
    return redirect("/login");
  }

  return null;
};
export default AdminAuthRequired;
