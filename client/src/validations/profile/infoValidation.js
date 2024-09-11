import * as Yup from "yup";
import { genders } from "../utils";

export const infoValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required!")
    .min(3, "First name must be at least 3 characters long."),
  last_name: Yup.string()
    .required("Last name is required!")
    .min(3, "Last name must be at least 3 characters long."),
  address: Yup.string().required("Address is required!"),
  phone_number: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers!")
    .length(12, "Phone number must be 12 digits long."),
  gender: Yup.string()
    .required("Gender is required!")
    .test("gender-valid", "Gender must be: Male, Female or Other!", (value) => {
      if (genders.includes(value)) {
        return true;
      }
      return false;
    }),
  city: Yup.string().required("City is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Email must be valid!"),
});
