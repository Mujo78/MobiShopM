import * as Yup from "yup";

export const registrationValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(3, "ERROR Min characters 3"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(3, "ERROR Min characters 3"),
  phone_number: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers!")
    .max(12, "Length error! (max 12)"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be valid!"),
  gender: Yup.string()
    .required("Gender is required!")
    .test("gender-valid", "Gender is not valid!", (value) => {
      if (value === "Male" || value === "Female" || value === "Other") {
        return true;
      }
      return false;
    }),
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!"),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .test("password-match", "Passwords must match!", function (value) {
      return value === this.parent.password;
    }),
});
