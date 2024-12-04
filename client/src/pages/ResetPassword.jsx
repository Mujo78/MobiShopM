import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import CustomSpinner from "../components/UI/CustomSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidationSchema } from "../validations/auth/resetPasswordValidation";
import { formatFieldError, isErrorForKey } from "../helpers/utils";
import { useResetPassword } from "../features/User/useResetPassword";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const { token } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const { error, isPending, resetPassword, isSuccess } = useResetPassword();

  const onSubmit = (data) => {
    if (token) {
      resetPassword({ token, data }, { onSuccess: reset() });
    }
  };

  const togglePasswordVisibility = () => {
    setShow((n) => !n);
  };

  return (
    <Container className="d-flex flex-column justify-content-center gap-4 align-items-center">
      <h1 className="text-center">Reset Your Password?</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="custom-responsive-width d-flex flex-column gap-3"
      >
        {isPending ? (
          <CustomSpinner />
        ) : (
          <Form.Group className="d-flex flex-column gap-2">
            <Container className="mb-1 p-0">
              <Form.Label htmlFor="password">Password *</Form.Label>
              <Container className="position-relative p-0">
                <Form.Control
                  id="password"
                  className="pe-5"
                  required
                  type={show ? "text" : "password"}
                  placeholder="New Password"
                  {...register("password")}
                  name="password"
                />
                <button
                  className="bg-transparent position-absolute top-0 bottom-0 border-0"
                  style={{ right: 10 }}
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {show ? <BsEyeSlash color="gray" /> : <BsEye color="gray" />}
                </button>
              </Container>
              <ErrorMessage
                textError={
                  errors.password ??
                  (!isErrorForKey(error, "confirmPassword") &&
                    formatFieldError(error, "password"))
                }
              />
            </Container>
            <Container className="mb-1 p-0">
              <Form.Label htmlFor="confirmPassword">
                Confirm Password *
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="pe-5"
                required
                {...register("confirmPassword")}
                name="confirmPassword"
              />
              <ErrorMessage
                textError={
                  errors.confirmPassword ??
                  formatFieldError(error, "confirmPassword")
                }
              />
            </Container>
          </Form.Group>
        )}
        <Container className="w-50 d-flex flex-column gap-4">
          <Button
            className="bg-custom border-0"
            type="submit"
            id="forgotPassword_btn"
          >
            Submit
          </Button>
          {isSuccess && (
            <Link to="/login" className="text-center">
              Back to LogIn Page
            </Link>
          )}
        </Container>
      </Form>
    </Container>
  );
};

export default ResetPassword;
