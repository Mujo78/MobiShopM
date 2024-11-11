import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../components/UI/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { forgotPasswordValidationSchema } from "../validations/auth/forgotPasswordValidation";
import Button from "react-bootstrap/esm/Button";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });
  const { errors } = formState;

  const onSubmit = (emailData) => {
    console.log(emailData);
  };

  return (
    <Container className="d-flex flex-column justify-content-center gap-4 align-items-center">
      <h1 className="text-center">Forgot Your Password?</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-50">
        <Form.Group>
          <Form.Label htmlFor="email" className="mb-1.5">
            Email *
          </Form.Label>
          <Form.Control
            {...register("email")}
            type="text"
            className={errors.username && " border-danger"}
            id="email"
            required
            autoComplete="true"
            name="email"
            autoFocus
          />
          <ErrorMessage textError={errors.username} />
        </Form.Group>
        <Button
          className="bg-custom border-0"
          type="submit"
          id="forgotPassword_btn"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
