import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationValidationSchema } from "../../validations/auth/registrationValidation";
import ErrorMessage from "../UI/ErrorMessage";
import { useSignup } from "../../features/User/useSignup";
import {
  formatError,
  formatFieldError,
  isErrorForKey,
} from "../../helpers/utils";

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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2"
          >
            <Form.Group className="d-flex">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label className="mb-1" htmlFor="first_name">
                  First Name *
                </Form.Label>
                <Form.Control
                  className={errors.first_name && " border-danger"}
                  type="text"
                  {...register("first_name")}
                  name="first_name"
                  required
                  id="first_name"
                  autoFocus
                />
                <ErrorMessage
                  textError={
                    errors.first_name ?? formatFieldError(error, "first_name")
                  }
                />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-100">
                <Form.Label className="mb-1" htmlFor="last_name">
                  Last name *
                </Form.Label>
                <Form.Control
                  className={errors.last_name && " border-danger"}
                  type="text"
                  id="last_name"
                  required
                  {...register("last_name")}
                  name="last_name"
                  autoFocus
                />
                <ErrorMessage
                  textError={
                    errors.last_name ?? formatFieldError(error, "last_name")
                  }
                />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label className="mb-1" htmlFor="phone_number">
                  Phone number *
                </Form.Label>
                <Form.Control
                  type="text"
                  className={errors.phone_number && " border-danger"}
                  {...register("phone_number")}
                  required
                  name="phone_number"
                  id="phone_number"
                  autoFocus
                />
                <ErrorMessage
                  textError={
                    errors.phone_number ??
                    formatFieldError(error, "phone_number") ??
                    formatFieldError(error, "phone number")
                  }
                />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-50">
                <Form.Label className="mb-1" htmlFor="gender">
                  Gender *
                </Form.Label>
                <Form.Select
                  className={errors.gender && " border-danger"}
                  {...register("gender")}
                  aria-label="Default select example"
                  id="gender"
                  required
                  name="gender"
                >
                  <option>Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <ErrorMessage
                  textError={errors.gender ?? formatFieldError(error, "gender")}
                />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex">
              <Container className="d-flex flex-column p-0 w-100">
                <Form.Label className="mb-1" htmlFor="city">
                  City *
                </Form.Label>
                <Form.Control
                  type="text"
                  className={errors.city && " border-danger"}
                  name="city"
                  id="city"
                  required
                  {...register("city")}
                  autoFocus
                />
                <ErrorMessage
                  textError={errors.city ?? formatFieldError(error, "city")}
                />
              </Container>
              <Container className="d-flex flex-column p-0 ms-2 w-100">
                <Form.Label htmlFor="address" className="mb-1">
                  Address *
                </Form.Label>
                <Form.Control
                  id="address"
                  type="text"
                  required
                  className={errors.address && " border-danger"}
                  name="address"
                  {...register("address")}
                  autoFocus
                />
                <ErrorMessage
                  textError={
                    errors.address ?? formatFieldError(error, "address")
                  }
                />
              </Container>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1" htmlFor="username">
                Username *
              </Form.Label>
              <Form.Control
                type="text"
                required
                id="username"
                className={errors.username && " border-danger"}
                {...register("username")}
                name="username"
                autoFocus
              />
              <ErrorMessage
                textError={
                  errors.username ?? formatFieldError(error, "username")
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1" htmlFor="email">
                Email *
              </Form.Label>
              <Form.Control
                type="email"
                required
                className={errors.email && " border-danger"}
                id="email"
                name="email"
                {...register("email")}
                placeholder="name@example.com"
                autoFocus
              />
              <ErrorMessage
                textError={errors.email ?? formatFieldError(error, "email")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1" htmlFor="password">
                Password *
              </Form.Label>
              <Container className="position-relative p-0">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  name="password"
                  id="password"
                  required
                  className={`${errors.password && " border-danger"} pe-5`}
                  placeholder="***********"
                  autoFocus
                />
                <button
                  className="position-absolute top-0 bottom-0 border-0 bg-transparent"
                  style={{ right: 10 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BsEyeSlash color="gray" />
                  ) : (
                    <BsEye color="gray" />
                  )}
                </button>
              </Container>
              <ErrorMessage
                textError={
                  errors.password ??
                  (!isErrorForKey(error, "passwords") &&
                    formatFieldError(error, "password"))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1" htmlFor="confirmPassword">
                Confirm Password *
              </Form.Label>
              <Form.Control
                {...register("confirmPassword")}
                type="password"
                className={errors.confirmPassword && " border-danger"}
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="***********"
                autoFocus
              />
              <ErrorMessage
                textError={
                  errors.confirmPassword ??
                  formatFieldError(error, "confirmPassword") ??
                  (error?.response?.status === 500 && formatError(error))
                }
              />
            </Form.Group>
            <Modal.Footer className="px-0">
              <Button
                variant="light"
                className="border me-auto"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                id="signup_btn"
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
