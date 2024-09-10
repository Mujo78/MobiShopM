import * as Yup from "yup";
import { genders } from "../utils";

export const registrationValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required!")
    .min(3, "First name must be at least 3 characters long."),
  last_name: Yup.string()
    .required("Last name is required!")
    .min(3, "Last name must be at least 3 characters long."),
  phone_number: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers!")
    .length(12, "Phone number must be 12 digits long."),
  address: Yup.string().required("Address is required!"),
  city: Yup.string().required("City is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Email must be valid!"),
  gender: Yup.string()
    .required("Gender is required!")
    .test("gender-valid", "Gender must be: Male, Female or Other!", (value) => {
      if (genders.includes(value)) {
        return true;
      }
      return false;
    }),
  username: Yup.string()
    .required("Username is required!")
    .min(6, "Username must be at least 6 characters long.")
    .max(32, "Username cannot exceed 32 characters."),
  password: Yup.string().required("Password is required!"),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .test("password-match", "Passwords must match!", function (value) {
      return value === this.parent.password;
    }),
});
