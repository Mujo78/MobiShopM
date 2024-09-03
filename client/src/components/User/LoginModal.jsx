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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-2"
          >
            <Form.Group>
              <Form.Label htmlFor="username" className="mb-1.5">
                Username *
              </Form.Label>
              <Form.Control
                {...register("username")}
                type="text"
                required
                className={errors.username && " border-danger"}
                id="username"
                name="username"
                autoFocus
              />
              <ErrorMessage textError={errors.username} />
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
                  id="password"
                  required
                  className={`${errors.password && " border-danger"} pe-5`}
                  placeholder="***********"
                  autoFocus
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
                textError={errors.password ? errors.password : error && error}
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
                className="bg-custom border-0"
                type="submit"
                id="login_btn"
              >
                Log In
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
