import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Footer from "../components/UI/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentValidationSchema } from "../validations/commentValidation";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../features/commentApi";
import { toast } from "react-toastify";
import { formatFieldError, isErrorField } from "../helpers/utils";

export default function Contact() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(commentValidationSchema),
  });
  const { errors } = formState;

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["comment"],
    mutationFn: postComment,
    onSuccess: () => {
      toast.success("Comment successfully added!");
      reset();
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <Container className="h-100 w-100 d-flex flex-column">
      <Container className="d-flex flex-column align-items-center gap-2 my-3">
        <h1 className="text-center">Contact Us</h1>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="col-12 col-md-6 d-flex flex-column gap-2"
        >
          <Form.Group>
            <Form.Label className="mb-1" htmlFor="name">
              Name *
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              className={errors.name && "border-danger"}
              id="name"
              autoComplete="true"
              required
              disabled={isPending}
              placeholder="Joe Doe"
              {...register("name")}
              autoFocus
            />
            <ErrorMessage
              textError={errors.name ?? formatFieldError(error, "name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-1" htmlFor="email_comment">
              Email *
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoComplete="true"
              className={errors.email && "border-danger"}
              required
              id="email_comment"
              disabled={isPending}
              placeholder="email@example.com"
              {...register("email")}
              autoFocus
            />
            <ErrorMessage
              textError={errors.email ?? formatFieldError(error, "email")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-1" htmlFor="comment">
              Comment *
            </Form.Label>
            <Form.Control
              as="textarea"
              id="comment"
              rows={4}
              required
              className={errors.comment && "border-danger"}
              disabled={isPending}
              name="comment"
              {...register("comment")}
              autoFocus
            />
            <ErrorMessage
              textError={
                errors.comment ??
                formatFieldError(error, "comment") ??
                (!isErrorField(error) && error)
              }
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end mb-4">
            <Button
              id="comment_btn"
              type="submit"
              className="bg-custom bg-custom-class border-0 w-auto"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>

      <Footer />
    </Container>
  );
}
