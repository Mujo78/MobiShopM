import * as Yup from "yup";
import { regPattern } from "../utils";

export const resetPasswordValidationSchema = Yup.object({
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
