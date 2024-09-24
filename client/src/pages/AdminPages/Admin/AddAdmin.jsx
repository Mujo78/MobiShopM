import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAdminSchemaValidator } from "../../../validations/admin/addNewAdminValidator";
import ErrorMessage from "../../../components/UI/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { addNewAdminFn } from "../../../features/Admin/api";
import { toast } from "react-toastify";
import { formatError, formatFieldError } from "../../../helpers/utils";
import { genders } from "../../../validations/utils";

export default function AddAdmin() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(addAdminSchemaValidator),
  });
  const { errors } = formState;

  const { mutate, error } = useMutation({
    mutationKey: ["addAdmin"],
    mutationFn: addNewAdminFn,
    onSuccess: () => {
      toast.success("New Admin successfully added!");
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
            <Form.Label htmlFor="first_name">First name *</Form.Label>
            <Form.Control
              id="first_name"
              type="text"
              autoComplete="true"
              autoFocus
              {...register("first_name")}
              name="first_name"
            />
            <ErrorMessage
              textError={
                errors.first_name ?? formatFieldError(error, "first_name")
              }
            />
          </Container>
          <Container>
            <Form.Label htmlFor="last_name">Last name *</Form.Label>
            <Form.Control
              id="last_name"
              type="text"
              {...register("last_name")}
              name="last_name"
            />
            <ErrorMessage
              textError={
                errors.last_name ?? formatFieldError(error, "last_name")
              }
            />
          </Container>
        </Form.Group>

        <Form.Group className="d-flex col-12 col-lg-8 justify-content-around flex-wrap flex-lg-nowrap mt-2">
          <Container>
            <Form.Label htmlFor="address">Address *</Form.Label>
            <Form.Control
              id="address"
              type="text"
              autoComplete="true"
              {...register("address")}
              name="address"
            />
            <ErrorMessage
              textError={errors.address ?? formatFieldError(error, "address")}
            />
          </Container>
          <Container>
            <Form.Label htmlFor="city">City *</Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              {...register("city")}
            />
            <ErrorMessage
              textError={errors.city ?? formatFieldError(error, "city")}
            />
          </Container>
        </Form.Group>

        <Form.Group className="d-flex col-12 col-lg-8 justify-content-around flex-wrap flex-lg-nowrap mt-2">
          <Container className="col-12 col-lg-8">
            <Form.Label htmlFor="phone_number">Phone number *</Form.Label>
            <Form.Control
              id="phone_number"
              type="text"
              name="phone_number"
              {...register("phone_number")}
            />
            <ErrorMessage
              textError={
                errors.phone_number ??
                formatFieldError(error, "phone_number") ??
                formatFieldError(error, "phone number") ??
                formatError(error)
              }
            />
          </Container>
          <Container className="col-12 col-lg-4">
            <Form.Label htmlFor="gender">Gender *</Form.Label>
            <Form.Select
              id="gender"
              aria-label="Default select example"
              {...register("gender")}
              name="gender"
            >
              <option>- Choose one option -</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </Form.Select>
            <ErrorMessage
              textError={errors.gender ?? formatFieldError(error, "gender")}
            />
          </Container>
        </Form.Group>

        <Container className="d-flex justify-content-center justify-content-sm-start col-12 mt-2 mb-5">
          <Container className="col-12 col-lg-8 col-xl-8 d-flex justify-content-sm-end justify-content-center">
            <Button
              type="submit"
              className="bg-custom bg-custom-class border-0 col-12 col-lg-5 col-xl-3 me-1 mb-4"
            >
              Save changes
            </Button>
          </Container>
        </Container>
      </Form>
    </Container>
  );
}
