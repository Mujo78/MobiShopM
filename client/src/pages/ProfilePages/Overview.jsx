import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { infoValidationSchema } from "../../validations/profile/infoValidation";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editMyInformations, getMyInformations } from "../../features/User/api";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";
import IconButton from "../../components/UI/IconButton";
import CustomSpinner from "../../components/UI/CustomSpinner";
import CustomAlert from "../../components/UI/Alert";
import {
  formatError,
  formatFieldError,
  isErrorForKey,
} from "../../helpers/utils";

export default function Info() {
  const [disabledField, setDisabledField] = useState(true);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(infoValidationSchema),
  });
  const { errors, isDirty } = formState;

  const {
    data,
    isError,
    isSuccess,
    error: getError,
    isPending,
  } = useQuery({
    queryKey: ["personInfo"],
    queryFn: getMyInformations,
    retry: 1,
  });

  const {
    mutate,
    error,
    isSuccess: isEditSuccess,
    isPending: isEditPending,
  } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: editMyInformations,
    onSuccess: () => {
      queryClient.invalidateQueries("editProfile");
      setDisabledField(true);
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
          <IconButton onClick={handleEditFields}>
            <BsPencil color="gray" />
          </IconButton>
        )}
      </Container>
      <Container>
        {isPending || isEditPending ? (
          <CustomSpinner />
        ) : isSuccess || isEditSuccess ? (
          <Form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="d-flex flex-wrap row flex-sm-nowrap justify-content-around align--items-center">
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="first_name">First name *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="first_name"
                  required
                  autoComplete="true"
                  type="text"
                  name="first_name"
                  {...register("first_name")}
                />
                <ErrorMessage
                  textError={
                    errors.first_name ?? formatFieldError(error, "first_name")
                  }
                />
              </Container>
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="last_name">Last name *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="last_name"
                  type="text"
                  required
                  name="last_name"
                  {...register("last_name")}
                />
                <ErrorMessage
                  textError={
                    errors.last_name ?? formatFieldError(error, "last_name")
                  }
                />
              </Container>
            </FormGroup>
            <Form.Group className="d-flex flex-wrap row flex-sm-nowrap justify-content-around align-items-center">
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="city">City *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="city"
                  type="text"
                  required
                  name="city"
                  {...register("city")}
                />
                <ErrorMessage
                  textError={errors.city ?? formatFieldError(error, "city")}
                />
              </Container>
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="address">Address *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="address"
                  required
                  autoComplete="true"
                  type="text"
                  name="address"
                  {...register("address")}
                />
                <ErrorMessage
                  textError={
                    errors.address ?? formatFieldError(error, "address")
                  }
                />
              </Container>
              <Container className="col-12 col-sm-4">
                <Form.Label htmlFor="gender">Gender *</Form.Label>
                <Form.Select
                  disabled={disabledField}
                  id="gender"
                  required
                  name="gender"
                  {...register("gender")}
                >
                  <option>- Choose one option -</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <ErrorMessage
                  textError={errors.gender ?? formatFieldError(error, "gender")}
                />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex flex-wrap flex-sm-nowrap justify-content-around align-items-center row">
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="email">Email *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="email"
                  type="email"
                  autoComplete="true"
                  required
                  name="email"
                  {...register("email")}
                />
                <ErrorMessage
                  textError={
                    errors.email ??
                    formatFieldError(error, "email") ??
                    (!isErrorForKey(error, "phone number") &&
                      formatError(error))
                  }
                />
              </Container>
              <Container className="col-12 col-sm-6">
                <Form.Label htmlFor="phone_number">Phone number *</Form.Label>
                <Form.Control
                  disabled={disabledField}
                  id="phone_number"
                  required
                  type="text"
                  name="phone_number"
                  {...register("phone_number")}
                />
                <ErrorMessage
                  textError={
                    errors.phone_number ??
                    formatFieldError(error, "phone_number") ??
                    formatFieldError(error, "phone number")
                  }
                />
              </Container>
            </Form.Group>

            <div className="d-flex justify-content-end mt-2">
              <Button
                type="submit"
                disabled={disabledField || !isDirty}
                className="bg-custom bg-custom-class border-0 px-3 py-2"
              >
                Save changes
              </Button>
            </div>
          </Form>
        ) : (
          isError && (
            <CustomAlert variant="danger">
              {formatError(getError)?.message ??
                "Something went wrong! Please try again later."}
            </CustomAlert>
          )
        )}
      </Container>
    </Container>
  );
}
