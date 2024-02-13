import * as Yup from "yup";

export const addAdminSchemaValidator = Yup.object({
  first_name: Yup.string()
    .required("First name is required!")
    .min(3, "ERROR Min characters 3"),
  last_name: Yup.string()
    .required("Last name is required!")
    .min(3, "ERROR Min characters 3"),
  address: Yup.string().required("Address is required!"),
  city: Yup.string().required("City is required!"),
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
});
