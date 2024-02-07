import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminAuthRequired() {
  const { user } = useAuth();
  const ac = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!ac) {
      navigate("*");
    } else if (ac && user.RoleId !== 1) {
      navigate("*");
    }
  }, [ac]);

  return <Outlet />;
}
