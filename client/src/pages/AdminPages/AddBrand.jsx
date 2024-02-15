import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { addNewBrandFn } from "../../features/Admin/api";
import { toast } from "react-toastify";

export default function AddBrand() {
  const { user } = useAuth();
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { mutate, isError, error, isPending } = useMutation({
    mutationKey: ["addBrand"],
    mutationFn: async () => {
      const token = user.token;
      await addNewBrandFn(token, name);
    },
    onSuccess: () => {
      toast.success("Brand successfully added!");
      setName("");
      setErrorMessage("");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (!name) {
      setErrorMessage("Brand name is required!");
    } else {
      mutate();
    }
  }
  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  console.log(error);

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
            {errorMessage
              ? errorMessage
              : isError
              ? error?.response.data.errors[0].msg
              : ""}
          </p>
        </Form.Group>

        <Form.Group className="d-flex justify-content-end col-12">
          <Button
            className="bg-custom border-0 col-12 col-lg-2"
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
