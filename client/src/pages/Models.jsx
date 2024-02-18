import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "../features/Mobiles/api";
import Spinner from "react-bootstrap/esm/Spinner";
import BrandsList from "../components/BrandsList";

export default function Models() {
  const navigate = useNavigate();
  const { brandId } = useParams();

  const [showOffMobile, setShowOffMobile] = useState(false);

  const {
    data: brands,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const handleShowOff = () => {
    setShowOffMobile(true);
  };
  const closeIt = () => {
    setShowOffMobile(false);
  };

  useEffect(() => {
    if (brandId) {
      navigate(`/models/${brandId}`);
    } else {
      if (brands) {
        navigate(`/models/${brands[0].id}`);
      }
    }
  }, [brands, navigate, brandId]);

  return (
    <Container className="p-0 w-100">
      {isFetching ? (
        <div className="d-flex mt-5 justify-content-center align-items-center">
          <Spinner variant="secondary" />
        </div>
      ) : brands ? (
        <Container className="d-flex justify-content-end row">
          <Container className="d-flex justify-content-end row flex-row mt-4">
            <Button
              className="col-auto rounded-pill d-sm-none end-0 text-center bg-white text-custom"
              style={{ position: "fixed" }}
              onClick={handleShowOff}
            >
              B
            </Button>
            <Container className="d-none d-sm-flex col-3 p-0">
              {brands && <BrandsList brands={brands} />}
            </Container>
            <Container className="col-12 col-sm-9">
              <Outlet />
            </Container>
          </Container>
          <Offcanvas show={showOffMobile} placement="end" onHide={closeIt}>
            <Offcanvas.Header closeButton>Brands filter</Offcanvas.Header>
            <Offcanvas.Body>
              <Container className="d-flex flex-column w-100">
                {brands && <BrandsList brands={brands} />}
              </Container>
            </Offcanvas.Body>
            <Offcanvas.Header>
              <Button className="w-100" onClick={closeIt}>
                Continue
              </Button>
            </Offcanvas.Header>
          </Offcanvas>
        </Container>
      ) : (
        isError && (
          <Alert variant="danger">
            Something went erong, please try again latter!
          </Alert>
        )
      )}
    </Container>
  );
}
