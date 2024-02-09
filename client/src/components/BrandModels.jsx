import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import useResponsive from "./useResponsive";
import CustomAlert from "./Alert";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";
import { BsSearch } from "react-icons/bs";
import { useQueryParams } from "../hooks/useQueryParams";
import { fetchMobilesByBrand } from "../features/Mobiles/api";
import Cards from "./Card";
import Spinner from "react-bootstrap/esm/Spinner";

const BrandModels = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { brandId } = useParams();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");

  const {
    data: mobileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brandMobiles", brandId, page],
    queryFn: () => fetchMobilesByBrand(brandId, page),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value !== "") {
      navigate(`/models/${brandId}?page=${page}&searchQuery=${value}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Spinner />
        </div>
      ) : mobileData && mobileData.data.length > 0 ? (
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

            {mobileData.data.map((m) => (
              <Cards mob={m} key={m.id} />
            ))}
          </Container>
          <Container className="d-flex p-0 mt-auto justify-content-center mt-3"></Container>
        </Container>
      ) : isError ? (
        <CustomAlert>Our store is currently empty!</CustomAlert>
      ) : (
        <CustomAlert>There are no product's for this model</CustomAlert>
      )}
    </>
  );
};

export default BrandModels;
