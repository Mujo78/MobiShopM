import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserRequired() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user?.role === 1) {
      navigate("*");
    }
  }, [user, navigate]);

  return <Outlet />;
}
