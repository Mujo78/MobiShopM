import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgotPasswordValidationSchema } from "../validations/auth/forgotPasswordValidation";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../features/User/useForgotPassword";
import CustomSpinner from "../components/UI/CustomSpinner";
import { formatError } from "../helpers/utils";

const ForgotPassword = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });
  const { errors } = formState;

  const { forgotPassword, isError, isPending, error } = useForgotPassword();

  const onSubmit = (emailData) => {
    forgotPassword(emailData, { onSuccess: reset() });
  };

  return (
    <Container className="d-flex flex-column justify-content-center gap-4 align-items-center">
      <h1 className="text-center">Forgot Your Password?</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="custom-responsive-width d-flex flex-column gap-3"
      >
        {isPending ? (
          <CustomSpinner />
        ) : (
          <Form.Group>
            <Form.Label htmlFor="email" className="mb-1.5">
              Email *
            </Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              className={errors.email && " border-danger"}
              id="email"
              required
              autoComplete="true"
              name="email"
            />
            <ErrorMessage
              textError={
                errors.email ? errors.email : isError && formatError(error)
              }
            />
          </Form.Group>
        )}
        <Container className="w-auto d-flex flex-column gap-4">
          <Button
            className="bg-custom border-0"
            type="submit"
            id="forgotPassword_btn"
          >
            Submit
          </Button>
          <Link to="/login" className="text-center">
            Back to LogIn Page
          </Link>
        </Container>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
