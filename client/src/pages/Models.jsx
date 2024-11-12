import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import BrandsList from "../components/Mobile/BrandsList";
import { useBrands } from "../features/Mobiles/useBrands";
import CustomSpinner from "../components/UI/CustomSpinner";

export default function Models() {
  const [showOffMobile, setShowOffMobile] = useState(false);
  const navigate = useNavigate();
  const { brandId } = useParams();

  const { data: brands, isFetching, isError } = useBrands();

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
        <CustomSpinner />
      ) : brands ? (
        <Container className="d-flex justify-content-end">
          <Container className="d-flex justify-content-end row flex-row">
            <Button
              className="col-auto rounded-pill position-fixed d-sm-none end-0 text-center bg-white text-custom"
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
          <CustomSpinner variant="danger">
            Something went erong, please try again latter!
          </CustomSpinner>
        )
      )}
    </Container>
  );
}
