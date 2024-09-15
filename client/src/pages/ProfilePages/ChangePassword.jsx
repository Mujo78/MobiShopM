import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidationSchema } from "../../validations/profile/changePasswordValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../features/User/api";
import {
  formatError,
  formatFieldError,
  isErrorForKey,
} from "../../helpers/utils";

export default function ChangePassword() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
  });
  const { errors } = formState;

  const { mutate, error } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password successfully changed!");
      reset();
    },
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((n) => !n);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((m) => !m);
  };

  const changePasswordFn = (values) => {
    mutate(values);
  };

  return (
    <Container className="mt-3">
      <h3>Password change</h3>
      <Form className="mb-5" onSubmit={handleSubmit(changePasswordFn)}>
        <Form.Group>
          <Container className="mb-1 p-0">
            <Form.Label htmlFor="password">Password *</Form.Label>
            <Container className="position-relative p-0">
              <Form.Control
                id="password"
                className="pe-5"
                required
                type={showOldPassword ? "text" : "password"}
                placeholder="Old password"
                {...register("password")}
                name="password"
              />
              <button
                className="bg-transparent position-absolute top-0 bottom-0 border-0"
                style={{ right: 10 }}
                type="button"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? (
                  <BsEyeSlash color="gray" />
                ) : (
                  <BsEye color="gray" />
                )}
              </button>
            </Container>
            <ErrorMessage
              textError={
                errors.password ??
                (!isErrorForKey(error, "new password") &&
                  formatFieldError(error, "password"))
              }
            />
          </Container>
          <Container className="mb-1 p-0">
            <Form.Label htmlFor="newPassword">New Password *</Form.Label>
            <Container className=" position-relative p-0">
              <Form.Control
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                className="pe-5"
                required
                {...register("newPassword")}
                name="newPassword"
              />
              <button
                className="bg-transparent position-absolute top-0 bottom-0 border-0"
                style={{ right: 10 }}
                type="button"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <BsEyeSlash color="gray" />
                ) : (
                  <BsEye color="gray" />
                )}
              </button>
            </Container>
            <ErrorMessage
              textError={
                errors.newPassword ?? formatFieldError(error, "newPassword")
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
              required
              {...register("confirmPassword")}
              placeholder="New password"
              name="confirmPassword"
            />
            <ErrorMessage
              textError={
                errors.confirmPassword ??
                formatFieldError(error, "confirmPassword") ??
                (!isErrorForKey(error, "old password") && formatError(error))
              }
            />
          </Container>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            className="bg-custom bg-custom-class border-0 px-4 py-2"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </Container>
  );
}
