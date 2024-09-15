import * as Yup from "yup";
import { genders, regPattern } from "../utils";

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
    .min(9, "Phone number must be at least 9 digits long.")
    .max(12, "Phone number cannot exceed 12 digits."),
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
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long.")
    .matches(regPattern, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    }),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .test("password-match", "Passwords must match!", function (value) {
      return value === this.parent.password;
    }),
});
