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
  const [usernameError, setUsernameError] = useState("");

  const { mutate, isError, error } = useMutation({
    mutationKey: ["usernameChange"],
    mutationFn: changeMyUsername,
    onSuccess: () => {
      toast.success("Successfully updated username!");
      setUsernameError("");
      changeMyUsernameFn(username);
    },
    onError: (error) => {
      if (!error.response.data.errors) {
        toast.error(
          "There was an error while updating your account, please try again later!"
        );
      }
    },
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      setUsernameError("Username is required!");
      return;
    }

    if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters long.");
      return;
    }

    if (username.length > 32) {
      setUsernameError("Username cannot exceed 32 characters.");
      return;
    }
    mutate(username);
  };

  return (
    <Container className="mt-4">
      <h3>Edit profile</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username *</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
          />

          <p
            className="text-danger mt-1"
            style={{ height: "1rem", fontSize: "0.8rem" }}
          >
            {usernameError
              ? usernameError
              : isError
              ? error?.response?.data?.errors &&
                error?.response?.data?.errors[0]?.msg
              : ""}
          </p>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            disabled={user.username === username}
            className="px-4 py-2 bg-custom bg-custom-class border-0"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </Container>
  );
}
