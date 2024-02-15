import * as Yup from "yup";

export const addNewMobileSchema = Yup.object({
  mobile_name: Yup.string().required("Mobile name is required!"),
  ram: Yup.string().required("RAM is required!"),
  internal: Yup.string().required("Internal is required!"),
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
