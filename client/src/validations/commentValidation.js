import * as Yup from "yup";

export const commentValidationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Email must be valid"),
  comment: Yup.string().required("Comment is required!"),
});
