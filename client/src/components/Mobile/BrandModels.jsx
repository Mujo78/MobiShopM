import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";
import { BsSearch } from "react-icons/bs";
import { useQueryParams } from "../../hooks/useQueryParams";
import { fetchMobilesByBrand } from "../../features/Mobiles/api";
import Cards from "./Card";
import Paginate from "../UI/Paginate";
import { useWishlist } from "../../features/Wishlist/useGetWishlist";
import CustomSpinner from "../UI/CustomSpinner";
import CustomAlert from "../UI/Alert";

const BrandModels = () => {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { brandId } = useParams();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery") || "";

  const { data: wishlist } = useWishlist();
  const {
    data: mobileData,
    isLoading,
    isError,
    isPreviousData,
  } = useQuery({
    queryKey: ["brandMobiles", brandId, page, searchQuery],
    queryFn: () => fetchMobilesByBrand(brandId, page, searchQuery),
    keepPreviousData: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value !== "") {
      query.set("searchQuery", value);
      query.set("page", 1);
      navigate(`/models/${brandId}?${query.toString()}`);
    }
  };

  const handleNavigate = (page) => {
    queryClient.invalidateQueries("wishlist");
    query.set("page", page);
    navigate(`/models/${brandId}?${query.toString()}`);
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
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
                  placeholder="Samsung Galaxy S24"
                  className="pe-5"
                />
                <Button
                  type="submit"
                  className="d-flex bg-transparent border-0 position-absolute end-0 me-2 top-0 bottom-0 justify-content-center align-items-center"
                >
                  <BsSearch color="gray" />
                </Button>
              </Form.Group>
            </Form>

            {mobileData.data.length > 0 ? (
              <Container className="w-100 d-flex flex-column gap-3 h-100 p-0">
                <Container className="row">
                  <Container className="d-flex flex-row flex-wrap justify-content-center justify-content-lg-start gap-lg-3 gap-3">
                    {mobileData.data.map((m) => (
                      <Cards
                        mob={m}
                        key={m.id}
                        wishlist={wishlist}
                        disabled={false}
                      />
                    ))}
                  </Container>
                </Container>

                <Container className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <Paginate
                      numOfPages={mobileData.numOfPages}
                      currentPage={mobileData.currentPage}
                      isPreviousData={isPreviousData}
                      handleNavigate={handleNavigate}
                    />
                  </div>
                </Container>
              </Container>
            ) : (
              <CustomAlert variant="secondary">
                There are no product's for this model
              </CustomAlert>
            )}
          </Container>
        </Container>
      ) : (
        isError && (
          <CustomAlert variant="info">
            Our store is currently empty!
          </CustomAlert>
        )
      )}
    </>
  );
};

export default BrandModels;
