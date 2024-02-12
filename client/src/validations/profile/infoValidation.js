import * as Yup from "yup";

export const infoValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required!"),
  last_name: Yup.string().required("Last name is required!"),
  address: Yup.string().required("Address is required!"),
  phone_number: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers!")
    .max(12, "Length error! (max 12)"),
  gender: Yup.string()
    .required("Gender is required!")
    .test("gender-valid", "Gender is not valid!", (value) => {
      if (value === "Male" || value === "Female" || value === "Other") {
        return true;
      }
      return false;
    }),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid!"),
});
