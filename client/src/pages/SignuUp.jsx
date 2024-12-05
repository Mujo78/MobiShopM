import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { registrationValidationSchema } from "../validations/auth/registrationValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignup } from "../features/User/useSignup";
import ErrorMessage from "../components/UI/ErrorMessage";
import { formatError, formatFieldError, isErrorForKey } from "../helpers/utils";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import CustomSpinner from "../components/UI/CustomSpinner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registrationValidationSchema),
  });
  const { errors } = formState;

  const { signup, error, isPending } = useSignup();

  const togglePasswordVisibility = () => {
    setShowPassword((n) => !n);
  };

  function onSubmit(values) {
    signup(values, { onSuccess: () => reset() });
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center pb-2">
      <h1 className="text-center">Sign Up Today!</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column justify-content-center gap-2 custom-responsive-width"
      >
        {isPending ? (
          <CustomSpinner />
        ) : (
          <>
            <Form.Group className="d-flex gap-3">
              <Container className="d-flex flex-column p-0 flex-grow-1">
                <Form.Label className="mb-1" htmlFor="first_name">
                  First Name *
                </Form.Label>
                <Form.Control
                  className={errors.first_name && " border-danger"}
                  type="text"
                  {...register("first_name")}
                  name="first_name"
                  required
                  autoComplete="true"
                  id="first_name"
                  autoFocus
                />
                <ErrorMessage
                  textError={
                    errors.first_name ?? formatFieldError(error, "first_name")
                  }
                />
              </Container>
              <Container className="d-flex flex-column p-0 flex-grow-1">
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
                />
                <ErrorMessage
                  textError={
                    errors.last_name ?? formatFieldError(error, "last_name")
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
                autoComplete="true"
                id="username"
                className={errors.username && " border-danger"}
                {...register("username")}
                name="username"
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
                autoComplete="true"
                className={errors.email && " border-danger"}
                id="email"
                name="email"
                {...register("email")}
                placeholder="name@example.com"
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
              />
              <ErrorMessage
                textError={
                  errors.confirmPassword ??
                  formatFieldError(error, "confirmPassword") ??
                  (error?.response?.status === 500 && formatError(error))
                }
              />
            </Form.Group>
          </>
        )}

        <Button
          variant="primary"
          id="signup_btn"
          className="bg-custom border-0 mt-2"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
