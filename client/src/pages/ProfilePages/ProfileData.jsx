import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { changeMyUsername } from "../../features/User/api";

export default function ProfileData() {
  const { user, changeMyUsernameFn } = useAuth();
  const [username, setUsername] = useState(user.username);

  const { mutate, isError, error } = useMutation({
    mutationKey: ["usernameChange"],
    mutationFn: async (username) => {
      const token = user.token;
      await changeMyUsername(token, username);
    },
    onSuccess: () => {
      toast.success("Successfully updated username!");
      changeMyUsernameFn(username);
    },
  });

  const handleChange = (event) => {
    const { value } = event.target;

    setUsername(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(username);
  };

  return (
    <Container className="mt-4">
      <h3>Edit profile</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          />

          <span className="text-danger">
            {username === ""
              ? "Username is required!"
              : isError
              ? error.response.data.errors[0].msg
              : ""}
          </span>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            disabled={user.username === username}
            className="px-4 py-2 bg-custom border-0"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </Container>
  );
}
