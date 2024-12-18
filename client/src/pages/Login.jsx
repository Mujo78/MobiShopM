import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import {
  formatError,
  formatFieldError,
  isErrorField,
  isErrorForKey,
} from "../helpers/utils";
import ErrorMessage from "../components/UI/ErrorMessage";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../validations/auth/loginValidation";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomSpinner from "../components/UI/CustomSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, status } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const { errors } = formState;

  async function onSubmit(loginData) {
    await login(loginData);
  }
  const togglePasswordVisibility = () => {
    setShowPassword((n) => !n);
  };

  useEffect(() => {
    if (status === "idle") {
      navigate("/");
    }
  }, [navigate, status]);

  const isLoading = status === "pending";

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center gap-4">
      <h1 className="text-center">Log In To Your Account</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-2 custom-responsive-width"
      >
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>
            <Form.Group>
              <Form.Label htmlFor="username" className="mb-1.5">
                Username *
              </Form.Label>
              <Form.Control
                {...register("username")}
                type="text"
                className={errors.username && " border-danger"}
                id="username"
                required
                autoComplete="true"
                name="username"
                autoFocus
              />
              <ErrorMessage
                textError={
                  errors.username
                    ? errors.username
                    : !isErrorForKey(error, "password") &&
                      formatFieldError(error, "username")
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mb-1.5" htmlFor="password">
                Password *
              </Form.Label>
              <Container className="position-relative p-0">
                <Form.Control
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  id="password"
                  className={`${errors.password && " border-danger"} pe-5`}
                  placeholder="***********"
                />
                <button
                  className="bg-transparent position-absolute top-0 bottom-0 border-0"
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
                  formatFieldError(error, "password") ??
                  (!isErrorField(error) && formatError(error))
                }
              />
            </Form.Group>
          </>
        )}

        <Container className="d-flex flex-column gap-3 p-0">
          <Button
            disabled={isLoading}
            className="bg-custom border-0 mt-2"
            type="submit"
            id="login_btn"
          >
            Log In
          </Button>

          <Link to="/forgot-password" className="text-center mx-auto">
            Forgot Password?
          </Link>
        </Container>
      </Form>
    </Container>
  );
};

export default Login;
