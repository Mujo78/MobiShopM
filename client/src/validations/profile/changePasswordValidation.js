import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object({
  password: Yup.string().required("Password is required!"),
  newPassword: Yup.string().required("New password is required!"),
  confirmPassword: Yup.string()
    .required("Confirm password is required!")
    .test("password-match", "Passwords must match!", function (value) {
      return value === this.parent.newPassword;
    }),
});
