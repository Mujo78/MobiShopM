import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationValidationSchema } from "../validations/auth/registrationValidation";
import ErrorMessage from "./ErrorMessage";
import { useSignup } from "../features/User/useSignup";

export default function RegistrationModal({ handleClose, show }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registrationValidationSchema),
  });
  const { errors } = formState;

  const { signup, error } = useSignup();

  const togglePasswordVisibility = () => {
    setShowPassword((n) => !n);
  };

  function onSubmit(values) {
    signup(values, { onSuccess: () => reset() });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="d-flex mb-1">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label htmlFor="first_name">Name</Form.Label>
                <Form.Control
                  className={errors.first_name && " border-danger"}
                  type="text"
                  {...register("first_name")}
                  name="first_name"
                  id="first_name"
                  autoFocus
                />
                <ErrorMessage textError={errors.first_name} />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-100">
                <Form.Label htmlFor="last_name">Last name</Form.Label>
                <Form.Control
                  className={errors.last_name && " border-danger"}
                  type="text"
                  id="last_name"
                  {...register("last_name")}
                  name="last_name"
                  autoFocus
                />
                <ErrorMessage textError={errors.last_name} />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex mb-1">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label htmlFor="phone_number">Phone number</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.phone_number && " border-danger"}
                  {...register("phone_number")}
                  name="phone_number"
                  id="phone_number"
                  placeholder="+387** *** ***"
                  autoFocus
                />
                <ErrorMessage textError={errors.phone_number} />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-50">
                <Form.Label htmlFor="gender">Gender</Form.Label>
                <Form.Select
                  className={errors.gender && " border-danger"}
                  {...register("gender")}
                  aria-label="Default select example"
                  id="gender"
                  name="gender"
                >
                  <option>Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <ErrorMessage textError={errors.gender} />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex mb-1">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.city && " border-danger"}
                  name="city"
                  id="city"
                  {...register("city")}
                  autoFocus
                />
                <ErrorMessage textError={errors.city} />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-100">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control
                  id="address"
                  type="text"
                  className={errors.address && " border-danger"}
                  name="address"
                  {...register("address")}
                  autoFocus
                />
                <ErrorMessage textError={errors.address} />
              </Container>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                className={errors.username && " border-danger"}
                {...register("username")}
                name="username"
                autoFocus
              />
              <ErrorMessage textError={errors.username} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                className={errors.email && " border-danger"}
                id="email"
                name="email"
                {...register("email")}
                placeholder="name@example.com"
                autoFocus
              />
              <ErrorMessage textError={errors.email} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Container className="input-group p-0">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  name="password"
                  id="password"
                  className={errors.password && " border-danger"}
                  placeholder="***********"
                  autoFocus
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </Container>
              <ErrorMessage textError={errors.password} />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                {...register("confirmPassword")}
                type="password"
                className={errors.confirmPassword && " border-danger"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="***********"
                autoFocus
              />
              <ErrorMessage
                textError={
                  errors.confirmPassword
                    ? errors.confirmPassword
                    : error && error
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="border-0"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="bg-custom border-0"
                type="submit"
              >
                Sign Up
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
