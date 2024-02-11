import { redirect } from "react-router-dom";

export default function UserRequired() {
  const user = localStorage.getItem("user");
  const userObj = user && JSON.parse(user);

  if (userObj?.role !== 2) {
    return redirect("/");
  }

  return null;
}
