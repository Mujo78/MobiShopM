import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../../context/AuthContext";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { loginValidationSchema } from "../../validations/auth/loginValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../UI/ErrorMessage";

export default function LoginModal({ handleClose, show }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, status } = useAuth();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const { errors } = formState;

  function onSubmit(loginData) {
    login(loginData);
  }
  const togglePasswordVisibility = () => {
    setShowPassword((n) => !n);
  };

  useEffect(() => {
    if (status === "idle") {
      reset();
    }
  }, [status, reset]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                {...register("username")}
                type="text"
                className={errors.username && " border-danger"}
                id="username"
                name="username"
                autoFocus
              />
              <ErrorMessage textError={errors.username} />
            </Form.Group>

            <Form.Group className="mb-0">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Container className="input-group p-0">
                <Form.Control
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
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
              <ErrorMessage
                textError={errors.password ? errors.password : error && error}
              />
            </Form.Group>

            <Modal.Footer className="">
              <Button
                variant="secondary"
                className="border-0"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button className="bg-custom border-0" type="submit">
                Log In
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
