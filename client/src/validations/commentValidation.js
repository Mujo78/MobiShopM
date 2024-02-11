import * as Yup from "yup";

export const commentValidationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  comment: Yup.string().required("Comment is required!"),
});
