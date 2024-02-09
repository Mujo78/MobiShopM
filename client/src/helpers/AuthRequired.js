import { redirect, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRequired = () => {
  const user = localStorage.getItem("user");
  const userObj = user && JSON.parse(user);

  console.log(user);

  if (!userObj) {
    return redirect("/profile");
  }

  return null;
};

export default AuthRequired;
