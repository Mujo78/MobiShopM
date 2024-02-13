import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import ProfileNavigation from "../components/ProfileNavigation";

export default function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function logOutFunction() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <Container fluid className="p-0">
      <Container
        fluid
        className="w-100 rounded"
        style={{ backgroundColor: "#DCDCDC" }}
      >
        <Container className="mt-3 py-4">
          <h2>{user?.username}</h2>
          <Container className="p-0 d-flex flex-wrap flex-column flex-md-row align-items-start align-items-md-center">
            <h5>{user?.role === 2 ? "Customer" : "Admin"}</h5>
            <Button
              onClick={logOutFunction}
              className="bg-custom border-0 ms-auto px-4 py-2"
            >
              Log out
            </Button>
          </Container>
        </Container>
      </Container>

      <Container className="d-flex mx-auto row flex-wrap flex-lg-nowrap p-0 w-100">
        <Container className="col-12 col-lg-3">
          <ProfileNavigation />
        </Container>
        <Container className=" col-12 col-lg-8 mt-4 ms-lg-5">
          <Outlet />
        </Container>
      </Container>
    </Container>
  );
}
