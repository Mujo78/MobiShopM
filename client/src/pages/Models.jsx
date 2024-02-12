import { useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/esm/Container";
import useResponsive from "../components/useResponsive";
import Button from "react-bootstrap/esm/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "../features/Mobiles/api";
import Spinner from "react-bootstrap/esm/Spinner";
import { useQueryParams } from "../hooks/useQueryParams";

export default function Models() {
  const navigate = useNavigate();
  const query = useQueryParams();
  const { brandId } = useParams();

  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showOffMobile, setShowOffMobile] = useState(false);

  const {
    data: brands,
    isLoading,
    isError,
    error,
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

  const navigateToBrand = (id) => {
    navigate(`/models/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex mt-5 justify-content-center align-items-center">
          <Spinner variant="secondary" />
        </div>
      ) : (
        <>
          <Container
            className={`d-flex p-0  ${
              isMobile ? `ms-0` : `ms-4`
            } me-0 w-100 flex-row mt-4 mb-4`}
          >
            {isMobile ? (
              <Button
                style={{
                  position: "fixed",
                  right: 0,
                  borderRadius: "120px",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  color: "#219aeb",
                }}
                onClick={handleShowOff}
              >
                B
              </Button>
            ) : (
              <Container className="w-25">
                <ListGroup className="d-flex gap-2 p-0 flex-column jusify-center">
                  {brands &&
                    brands.map((n) => (
                      <ListGroup.Item
                        key={n.id}
                        onClick={() => navigateToBrand(n.id)}
                        className={`${
                          parseInt(brandId) === n.id && "bg-custom"
                        } w-75 list-group-item-model text-center border-top-0 border-start-0 border-end-0`}
                      >
                        {n.name}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Container>
            )}
            <Container className="w-75">
              <Outlet />
            </Container>
          </Container>
          <Offcanvas show={showOffMobile} placement="end" onHide={closeIt}>
            <Offcanvas.Header closeButton>Brands filter</Offcanvas.Header>
            <Offcanvas.Body>
              <Container className="d-flex flex-column w-100 jusify-center">
                <ListGroup>
                  {/* brands.map((n) => (
                <ListGroup.Item
                  key={n.id}
                  style={{ borderRadius: "0px", border: "none" }}
                  variant="secondary"
                  action
                  className="mb-2 text-center w-100"
                  as={Link}
                  to={genNewSearcParam("brand_id", n.id)}
                  onClick={() => {
                    refreshPageNumber(1);
                    closeIt();
                  }}
                >
                  {n.name}
                </ListGroup.Item>
                )) */}
                </ListGroup>
              </Container>
            </Offcanvas.Body>
            <Offcanvas.Header>
              <Button className="w-100" onClick={closeIt}>
                Continue
              </Button>
            </Offcanvas.Header>
          </Offcanvas>
        </>
      )}
    </>
  );
}
