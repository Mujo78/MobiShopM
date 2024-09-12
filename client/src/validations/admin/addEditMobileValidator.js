import * as Yup from "yup";
import { ram, memory } from "../utils";

export const addEditMobileSchema = Yup.object({
  mobile_name: Yup.string().required("Name is required!"),
  ram: Yup.string()
    .required("RAM is required!")
    .notOneOf(ram, "Invalid RAM value provided."),
  internal: Yup.string()
    .required("Internal is required!")
    .notOneOf(memory, "Invalid Memory value provided."),
  processor: Yup.string().required("Processor is required!"),
  screen_size: Yup.string().required("Screen size is required!"),
  battery: Yup.string().required("Battery is required!"),
  photo: Yup.string().required("Photo is required!"),
  os: Yup.string().required("OS is required!"),
  quantity: Yup.string().required("Quantity is required!"),
  camera: Yup.string().required("Camera description is required!"),
  price: Yup.string().required("Price is required!"),
  brandId: Yup.string().required("Brand is required!"),
});
