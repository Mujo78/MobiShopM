import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgotPasswordValidationSchema } from "../validations/auth/forgotPasswordValidation";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });
  const { errors } = formState;

  const onSubmit = (_emailData) => {
    reset();
  };

  return (
    <Container className="d-flex flex-column justify-content-center gap-4 align-items-center">
      <h1 className="text-center">Forgot Your Password?</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-50 d-flex flex-column gap-3"
      >
        <Form.Group>
          <Form.Label htmlFor="email" className="mb-1.5">
            Email *
          </Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            className={errors.username && " border-danger"}
            id="email"
            required
            autoComplete="true"
            name="email"
          />
          <ErrorMessage textError={errors.username} />
        </Form.Group>
        <Container className="w-50 d-flex flex-column gap-4">
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
