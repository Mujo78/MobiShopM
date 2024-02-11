import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commentValidationSchema } from "../validations/commentValidation";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../features/commentApi";
import { toast } from "react-toastify";

export default function Contact() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(commentValidationSchema),
  });
  const { errors } = formState;

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["comment"],
    mutationFn: (commentData) => postComment(commentData),
  });

  function onSubmit(values) {
    console.log(values);
    mutate(values);
    console.log(isError);
    if (!isError) {
      reset();
      toast.success("Comment successfully added!");
    }
  }

  return (
    <Container className="h-100 w-100 d-flex flex-column">
      <Container className="d-flex flex-column row align-items-center mt-5 gap-5">
        <h1 className="text-center">Contact Us</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="col-12 col-md-6">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className={errors.name && " border-danger"}
              id="name"
              disabled={isPending}
              placeholder="Joe Doe"
              {...register("name")}
              autoFocus
            />
            <ErrorMessage textError={errors.name} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="comment">Comment</Form.Label>
            <Form.Control
              as="textarea"
              id="comment"
              rows={4}
              className={errors.comment && " border-danger"}
              disabled={isPending}
              name="comment"
              {...register("comment")}
              autoFocus
            />
            <ErrorMessage
              textError={errors.comment ? errors.comment : isError && error}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end mb-4">
            <Button type="submit" className="bg-custom border-0 w-auto">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>

      <Footer />
    </Container>
  );
}
