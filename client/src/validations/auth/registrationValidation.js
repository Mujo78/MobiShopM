import * as Yup from "yup";
import { regPattern } from "../utils";

export const registrationValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required!")
    .min(3, "First name must be at least 3 characters long."),
  last_name: Yup.string()
    .required("Last name is required!")
    .min(3, "Last name must be at least 3 characters long."),
  email: Yup.string()
    .required("Email is required!")
    .email("Email must be valid!"),
  username: Yup.string()
    .required("Username is required!")
    .min(6, "Username must be at least 6 characters long.")
    .max(32, "Username cannot exceed 32 characters."),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long.")
    .matches(regPattern, {
      message:
        "Password must contain one uppercase letter, one lowercase letter, one digit, and one special character.",
    }),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .test("password-match", "Passwords must match!", function (value) {
      return value === this.parent.password;
    }),
});
