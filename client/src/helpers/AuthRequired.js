import { redirect } from "react-router-dom";

const AuthRequired = () => {
  const user = localStorage.getItem("user");
  const userObj = user && JSON.parse(user);

  if (!userObj) {
    return redirect("/login");
  }

  return null;
};

export default AuthRequired;
