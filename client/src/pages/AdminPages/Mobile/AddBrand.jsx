import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addNewBrandFn } from "../../../features/Admin/api";
import { toast } from "react-toastify";
import { formatError, formatFieldError } from "../../../helpers/utils";

export default function AddBrand() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["addBrand"],
    mutationFn: addNewBrandFn,
    onSuccess: () => {
      toast.success("Brand successfully added!");
      setName("");
      setErrorMessage();
    },
    onError: () => {
      setErrorMessage();
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage();

    if (name === "") {
      setErrorMessage("Name is required!");
      return;
    }
    mutate(name);
  }
  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
      <h3>Add new Brand</h3>
      <Form
        onSubmit={handleSubmit}
        className="d-flex justify-content-around align-items-center w-100 row"
      >
        <Form.Group className="col-12 col-xl-6">
          <Form.Label htmlFor="brand_name">Brand name</Form.Label>
          <Form.Control
            id="brand_name"
            type="text"
            autoComplete="brand name"
            placeholder="Samsung"
            name="name"
            value={name}
            onChange={handleChangeName}
          />
          <p
            className="text-danger mt-1"
            style={{ height: "1rem", fontSize: "0.8rem" }}
          >
            {errorMessage ??
              formatFieldError(error, "name")?.msg ??
              formatError(error)?.message}
          </p>
        </Form.Group>

        <Form.Group className="d-flex justify-content-end col-12">
          <Button
            className="bg-custom bg-custom-class border-0 col-12 col-lg-2"
            type="submit"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
