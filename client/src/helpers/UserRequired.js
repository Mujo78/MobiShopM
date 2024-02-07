import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserRequired() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const ac = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!ac) {
      navigate("*");
    } else if (ac && user.RoleId !== 2) {
      navigate("*");
    }
  }, [ac, user.RoleId]);

  return <Outlet />;
}
