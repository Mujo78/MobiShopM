import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidationSchema } from "../../validations/profile/changePasswordValidation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../features/User/api";

export default function ChangePassword() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
  });
  const { errors } = formState;

  const { mutate, isError, error } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (passwords) => {
      const token = user.token;
      await changePassword(token, passwords);
    },
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
            <Form.Label htmlFor="password">Password</Form.Label>
            <Container className="input-group p-0">
              <Form.Control
                id="password"
                type={showOldPassword ? "text" : "password"}
                placeholder="Old password"
                {...register("password")}
                name="password"
              />
              <Button
                className="btn btn-outline-secondary"
                type="button"
                variant="light"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
            </Container>
            <ErrorMessage
              textError={
                errors.password
                  ? errors.password
                  : isError
                  ? error?.response.data
                  : ""
              }
            />
          </Container>
          <Container className="mb-1 p-0">
            <Form.Label htmlFor="newPassword">New Password</Form.Label>
            <Container className="input-group p-0">
              <Form.Control
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                {...register("newPassword")}
                name="newPassword"
              />
              <Button
                className="btn btn-outline-secondary"
                type="button"
                variant="light"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
            </Container>
            <ErrorMessage textError={errors.newPassword} />
          </Container>
          <Container className="mb-1 p-0">
            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
            <Form.Control
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="New password"
              name="confirmPassword"
            />
            <ErrorMessage
              textError={
                errors.confirmPassword
                  ? errors.confirmPassword
                  : isError
                  ? error?.response.data.message.startsWith("New Password") &&
                    error?.response.data
                  : ""
              }
            />
          </Container>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="submit" className="bg-custom border-0 px-4 py-2">
            Save changes
          </Button>
        </div>
      </Form>
    </Container>
  );
}
