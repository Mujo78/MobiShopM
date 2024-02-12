import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { infoValidationSchema } from "../../validations/profile/infoValidation";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { editMyInformations, getMyInformations } from "../../features/User/api";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Info() {
  const [disabledField, setDisabledField] = useState(true);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(infoValidationSchema),
  });
  const { errors, isDirty } = formState;

  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: ["personInfo"],
    queryFn: () => getMyInformations(user?.token),
  });

  const {
    mutate,
    isSuccess: isEditSuccess,
    isError: isEditError,
    isPending: isEditPending,
  } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: (values) => {
      if (user) {
        const token = user.token;
        editMyInformations(token, values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["editProfile"]);
      toast.success("Profile updated!");
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      reset(data);
    }
  }, [data, reset, isSuccess]);

  const handleEditFields = () => {
    setDisabledField((n) => !n);
  };

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <Container className="mt-4">
      <Container className="d-flex justify-content-between flex-wrap flex-sm-nowrap">
        <h3>Personal info</h3>
        {isSuccess && (
          <Button
            variant="secondary"
            className=" mx-auto mx-sm-0"
            style={{ backgroundColor: "#b8b9ba", borderColor: "#b8b9ba" }}
            onClick={handleEditFields}
          >
            <BsPencil />
          </Button>
        )}
      </Container>
      <Container>
        {isPending || isEditPending ? (
          <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <Spinner />
          </div>
        ) : isSuccess || isEditSuccess ? (
          <Form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="d-flex flex-wrap row flex-sm-nowrap justify-content-around align--items-center">
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="first_name">First name</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="first_name"
                  type="text"
                  name="first_name"
                  {...register("first_name")}
                />
                <ErrorMessage textError={errors.first_name} />
              </Container>
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="last_name">Last name</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="last_name"
                  type="text"
                  name="last_name"
                  {...register("last_name")}
                />
                <ErrorMessage textError={errors.last_name} />
              </Container>
            </FormGroup>
            <Form.Group className="d-flex flex-wrap row flex-sm-nowrap justify-content-around align-items-center">
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="city"
                  type="text"
                  name="city"
                  {...register("city")}
                />
                <ErrorMessage textError={errors.city} />
              </Container>
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="address"
                  type="text"
                  name="address"
                  {...register("address")}
                />
                <ErrorMessage textError={errors.address} />
              </Container>
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="gender">Gender</Form.Label>
                <Form.Select
                  disabled={disabledField}
                  id="gender"
                  name="gender"
                  {...register("gender")}
                >
                  <option>- Choose one option -</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <ErrorMessage textError={errors.gender} />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex flex-wrap flex-sm-nowrap justify-content-around align-items-center row">
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="email"
                  type="email"
                  name="email"
                  {...register("email")}
                />
                <ErrorMessage textError={errors.email} />
              </Container>
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="phone_number">Phone number</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="phone_number"
                  type="text"
                  name="phone_number"
                  {...register("phone_number")}
                />
                <ErrorMessage textError={errors.phone_number} />
              </Container>
            </Form.Group>

            <div className="d-flex justify-content-end mt-2">
              <Button
                type="submit"
                disabled={disabledField || !isDirty}
                className="bg-custom border-0 px-3 py-2"
              >
                Save changes
              </Button>
            </div>
          </Form>
        ) : (
          (isError || isEditError) && (
            <p>
              There was an error while {isEditError ? "editing" : "getting"}{" "}
              your data, please try again latter!
            </p>
          )
        )}
      </Container>
    </Container>
  );
}
