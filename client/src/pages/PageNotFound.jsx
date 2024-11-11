import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PageNotFound() {
  const {
    user: { role },
  } = useAuth();
  const stylesBtn = {
    borderColor: "#219aeb",
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="display-1" style={{ color: "#bababa" }}>
        404
      </h1>
      <h1 className="fw-bold">OOPS! PAGE NOT FOUND</h1>
      <p className="mb-4">
        Sorry, the page you're looking for doesn't exist. If you think something
        is broken, report the problem.
      </p>
      <Container className="align-items-center d-flex flex-wrap flex-md-nowrap justify-content-center gap-3">
        <Button
          as={Link}
          to={"/"}
          className="bg-custom bg-custom-class px-4 rounded-pill fw-bold text-center py-3"
          style={stylesBtn}
        >
          RETURN HOME
        </Button>
        {role !== 1 && (
          <Button
            as={Link}
            to={"/contact"}
            className="bg-light text-custom rounded-pill fw-bold text-center px-4 py-3"
            style={stylesBtn}
          >
            REPORT PROBLEM
          </Button>
        )}
      </Container>
    </Container>
  );
}
