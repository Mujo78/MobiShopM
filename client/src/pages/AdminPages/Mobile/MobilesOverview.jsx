import { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { getMobileByName } from "../../../features/Mobiles/api";
import Paginate from "../../../components/UI/Paginate";
import Container from "react-bootstrap/Container";
import Cards from "../../../components/Mobile/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";
import CustomSpinner from "../../../components/UI/CustomSpinner";
import CustomAlert from "../../../components/UI/Alert";

export default function MobilesOverview() {
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const { mobileId } = useParams();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");

  const {
    data: searchedMobiles,
    isFetching,
    isError,
    isPreviousData,
  } = useQuery({
    queryKey: ["searchedMobiles", searchQuery, page],
    queryFn: () => {
      const token = user.token;
      return getMobileByName(token, searchQuery, page);
    },
    keepPreviousData: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value !== "") {
      query.set("searchQuery", value);
      navigate(`${location}?${query.toString()}`);
    }
  };

  const onClickFn = (mobileId) => {
    navigate(`edit/${mobileId}`);
  };

  const handleNavigate = (page) => {
    query.set("page", page);
    navigate(`${location}?${query.toString()}`);
  };

  return (
    <>
      {mobileId ? (
        <Outlet />
      ) : (
        <Container className="d-flex flex-column p-0">
          <Form onSubmit={handleSubmit} className="row">
            <Form.Group className="d-flex position-relative col-12 col-lg-8 mx-auto">
              <Form.Control
                name="value"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                type="text"
                placeholder="Samsung Galaxy S23 Ultra"
                className="pe-5"
              />
              <Button
                type="submit"
                className="d-flex bg-transparent border-0 position-absolute end-0 me-3 top-0 bottom-0 justify-content-center align-items-center"
              >
                <BsSearch color="gray" />
              </Button>
            </Form.Group>
          </Form>
          {isFetching ? (
            <CustomSpinner />
          ) : searchQuery && searchedMobiles.data ? (
            <Container className="d-flex p-0 justify-content-center flex-wrap mb-1 mt-3">
              {searchedMobiles.data.length > 0 ? (
                <Container className="d-flex flex-column justify-content-center">
                  <Container className="d-flex flex-wrap justify-content-center gap-3">
                    {searchedMobiles.data.map((m) => (
                      <Cards
                        mob={m}
                        key={m.id}
                        onClickFn={() => onClickFn(m.id)}
                      />
                    ))}
                  </Container>
                  <Container className="d-flex justify-content-center mt-1 mb-5">
                    <Paginate
                      handleNavigate={handleNavigate}
                      currentPage={searchedMobiles.currentPage}
                      numOfPages={searchedMobiles.numOfPages}
                      isPreviousData={isPreviousData}
                    />
                  </Container>
                </Container>
              ) : (
                <CustomAlert variant="secondary">
                  There are no mobiles that matches that name!
                </CustomAlert>
              )}
            </Container>
          ) : (
            isError && (
              <CustomAlert variant="danger">
                Something went wrong, please try again later!
              </CustomAlert>
            )
          )}
        </Container>
      )}
    </>
  );
}
