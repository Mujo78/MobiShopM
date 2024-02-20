import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAdminSchemaValidator } from "../../../validations/admin/addNewAdminValidator";
import ErrorMessage from "../../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { addNewAdminFn } from "../../../features/Admin/api";
import { toast } from "react-toastify";

export default function AddAdmin() {
  const { user } = useAuth();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(addAdminSchemaValidator),
  });
  const { errors } = formState;

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addAdmin"],
    mutationFn: async (adminData) => {
      const token = user.token;
      await addNewAdminFn(token, adminData);
    },
    onSuccess: () => {
      toast.success("Admin successfully added!");
      reset();
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-2">
      <h3>Add new Admin</h3>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column row align-items-center flex-wrap justify-content-around w-100"
      >
        <Form.Group className="d-flex col-12 col-lg-8 justify-content-around flex-wrap flex-lg-nowrap mt-2">
          <Container>
            <Form.Label htmlFor="first_name">First name</Form.Label>
            <Form.Control
              id="first_name"
              type="text"
              autoFocus
              {...register("first_name")}
              name="first_name"
            />
            <ErrorMessage textError={errors.first_name} />
          </Container>
          <Container>
            <Form.Label htmlFor="last_name">Last name</Form.Label>
            <Form.Control
              id="last_name"
              type="text"
              autoFocus
              {...register("last_name")}
              name="last_name"
            />
            <ErrorMessage textError={errors.last_name} />
          </Container>
        </Form.Group>

        <Form.Group className="d-flex col-12 col-lg-8 justify-content-around flex-wrap flex-lg-nowrap mt-2">
          <Container>
            <Form.Label htmlFor="address">Address</Form.Label>
            <Form.Control
              id="address"
              type="text"
              autoFocus
              {...register("address")}
              name="address"
            />
            <ErrorMessage textError={errors.address} />
          </Container>
          <Container>
            <Form.Label htmlFor="city">City</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              name="city"
              id="city"
              {...register("city")}
            />
            <ErrorMessage textError={errors.city} />
          </Container>
        </Form.Group>

        <Form.Group className="d-flex col-12 col-lg-8 justify-content-around flex-wrap flex-lg-nowrap mt-2">
          <Container className="col-12 col-lg-8">
            <Form.Label htmlFor="phone_number">Phone number</Form.Label>
            <Form.Control
              id="phone_number"
              type="text"
              autoFocus
              name="phone_number"
              {...register("phone_number")}
            />
            <ErrorMessage
              textError={
                errors.phone_number
                  ? errors.phone_number
                  : isError
                  ? error?.response.data
                  : ""
              }
            />
          </Container>
          <Container className="col-12 col-lg-4">
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <Form.Select
              id="gender"
              aria-label="Default select example"
              {...register("gender")}
              name="gender"
            >
              <option>- Choose one option -</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
            <ErrorMessage textError={errors.gender} />
          </Container>
        </Form.Group>

        <Container className="d-flex justify-content-center justify-content-sm-start col-12 mt-2 mb-5">
          <Container className="col-12 col-lg-8 col-xl-8 d-flex justify-content-sm-end justify-content-center">
            <Button
              type="submit"
              className="bg-custom border-0 col-12 col-lg-5 col-xl-3 me-1 mb-4"
            >
              Save changes
            </Button>
          </Container>
        </Container>
      </Form>
    </Container>
  );
}
