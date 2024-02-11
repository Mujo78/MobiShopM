import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import useResponsive from "./useResponsive";
import Alert from "react-bootstrap/Alert";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";
import { BsSearch } from "react-icons/bs";
import { useQueryParams } from "../hooks/useQueryParams";
import { fetchMobilesByBrand } from "../features/Mobiles/api";
import Cards from "./Card";
import Spinner from "react-bootstrap/esm/Spinner";
import Pagination from "react-bootstrap/esm/Pagination";
import Paginate from "./Paginate";

const BrandModels = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { brandId } = useParams();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery") || "";

  const {
    data: mobileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brandMobiles", brandId, page, searchQuery],
    queryFn: () => fetchMobilesByBrand(brandId, page, searchQuery),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value !== "") {
      query.set("searchQuery", value);
      navigate(`/models/${brandId}?${query.toString()}`);
    }
  };

  console.log(mobileData);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Spinner />
        </div>
      ) : mobileData ? (
        <Container fluid className="d-flex w-100 p-0 flex-column">
          <Container fluid className="d-flex flex-column gap-4 mb-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-flex position-relative">
                <Form.Control
                  name="value"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  type="text"
                  placeholder="name@example.com"
                  className=" pe-5"
                />
                <Button
                  type="submit"
                  className="d-flex bg-transparent border-0 position-absolute end-0 me-2 top-0 bottom-0 justify-content-center align-items-center"
                >
                  <BsSearch style={{ color: "gray" }} />
                </Button>
              </Form.Group>
            </Form>

            {mobileData.data.length > 0 ? (
              <Container>
                {mobileData.data.map((m) => (
                  <Cards mob={m} key={m.id} />
                ))}
                <Paginate
                  numOfPages={mobileData.numOfPages}
                  currentPage={mobileData.currentPage}
                />
              </Container>
            ) : (
              <Alert className="text-center">
                There are no product's for this model
              </Alert>
            )}
          </Container>
          <Container className="d-flex p-0 mt-auto justify-content-center mt-3"></Container>
        </Container>
      ) : (
        isError && (
          <Alert className="text-center">Our store is currently empty!</Alert>
        )
      )}
    </>
  );
};

export default BrandModels;
