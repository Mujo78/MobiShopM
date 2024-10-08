import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import { BsImage } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useBrands } from "../../features/Mobiles/useBrands";
import ErrorMessage from "../UI/ErrorMessage";
import CustomSpinner from "../UI/CustomSpinner";
import CustomAlert from "../UI/Alert";
import {
  formatError,
  formatFieldError,
  isErrorForKey,
} from "../../helpers/utils";
import { memory, ram } from "../../validations/utils";

const MobileForm = ({
  isPending,
  register,
  errors,
  isDirty,
  error,
  handleSubmit,
  onSubmitFn,
  watch,
  children,
}) => {
  const [photoLink, setPhotoLink] = useState("");
  let photo = watch("photo");

  const {
    data: brands,
    error: brandError,
    isFetching,
    isSuccess,
    isError: isBrandError,
  } = useBrands();

  useEffect(() => {
    if (photo) {
      setPhotoLink(photo);
    }
  }, [photo]);

  const onSubmit = (values) => {
    onSubmitFn(values);
    setPhotoLink("");
  };

  const isLoading = isFetching || isPending;

  return (
    <Container className="d-flex flex-column row p-0 align-items-center justify-content-center mt-2 w-100 mb-3">
      {children}
      {isLoading ? (
        <CustomSpinner />
      ) : isSuccess ? (
        <Container className="d-flex col-12 col-xl-11 p-0 flex-column justify-content-center align-items-center flex-xl-row gap-2 mx-auto">
          <Container className="col-12 col-lg-11 col-xl-4 p-0">
            {photoLink ? (
              <Image
                src={photoLink}
                className="mw-100 h-auto"
                onError={() => setPhotoLink("")}
              />
            ) : (
              <Container
                className="border rounded d-flex flex-column align-items-center justify-content-center p-5"
                style={{ maxHeight: "20rem" }}
              >
                <BsImage />
                <p>Image preview</p>
              </Container>
            )}
          </Container>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column col-12 col-xl-8 row align-items-center"
          >
            <Form.Group className="d-flex col-12 col-xl-10 flex-wrap flex-lg-nowrap p-0 align-items-center justify-content-around">
              <Container className="col-12 col-lg-7 col-xl-8 p-0">
                <Form.Label htmlFor="mobile_name">Name *</Form.Label>
                <Form.Control
                  id="mobile_name"
                  type="text"
                  required
                  autoComplete="true"
                  autoFocus
                  name="mobile_name"
                  {...register("mobile_name")}
                />
                <ErrorMessage
                  textError={
                    errors.mobile_name ??
                    formatFieldError(error, "mobile_name") ??
                    formatFieldError(error, "mobile")
                  }
                />
              </Container>
              <Container className="col-12 col-lg-4 col-xl-3 p-0">
                <Form.Label htmlFor="brandId">Brand *</Form.Label>
                <Form.Select
                  id="brandId"
                  aria-label="Default select example"
                  name="brandId"
                  required
                  autoComplete="brand"
                  {...register("brandId")}
                >
                  <option value="" defaultChecked>
                    - Choose -
                  </option>
                  {brands.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  textError={
                    errors.brandId ?? formatFieldError(error, "brandId")
                  }
                />
              </Container>
            </Form.Group>

            <Form.Group className="d-flex col-12 col-xl-10 flex-wrap flex-lg-nowrap p-0 justify-content-between">
              <Container className="col-12 col-lg-5 p-0">
                <Form.Label htmlFor="ram">RAM *</Form.Label>
                <Form.Select
                  autoComplete="ram"
                  id="ram"
                  required
                  aria-label="Default select example"
                  name="ram"
                  {...register("ram")}
                >
                  <option value="" defaultChecked>
                    - Choose -
                  </option>
                  {ram.map((ram) => (
                    <option key={ram} value={ram}>
                      {ram}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  textError={errors.ram ?? formatFieldError(error, "ram")}
                />
              </Container>
              <Container className="col-12 col-lg-6 p-0">
                <Form.Label htmlFor="internal">Memory *</Form.Label>
                <Form.Select
                  autoComplete="internal"
                  id="internal"
                  required
                  aria-label="Default select example"
                  name="internal"
                  {...register("internal")}
                >
                  <option value="" defaultChecked>
                    - Choose -
                  </option>
                  {memory.map((memory) => (
                    <option key={memory} value={memory}>
                      {memory}
                    </option>
                  ))}
                </Form.Select>
                <ErrorMessage
                  textError={
                    errors.internal ?? formatFieldError(error, "internal")
                  }
                />
              </Container>
            </Form.Group>

            <Form.Group className="d-flex p-0 col-12 col-xl-10">
              <Container className="col-12 p-0 px-xl-3 px-xxl-4 px-lg-3">
                <Form.Label htmlFor="camera">Camera *</Form.Label>
                <Form.Control
                  id="camera"
                  autoComplete="camera"
                  type="text"
                  required
                  name="camera"
                  {...register("camera")}
                />
                <ErrorMessage
                  textError={errors.camera ?? formatFieldError(error, "camera")}
                />
              </Container>
            </Form.Group>

            <Form.Group className="d-flex col-12 col-xl-10 flex-wrap flex-lg-nowrap p-0 align-items-center justify-content-around">
              <Container className="col-12 col-lg-7 col-xl-8 p-0">
                <Form.Label htmlFor="processor">Processor *</Form.Label>
                <Form.Control
                  autoComplete="processor"
                  id="processor"
                  type="text"
                  required
                  name="processor"
                  {...register("processor")}
                />
                <ErrorMessage
                  textError={
                    errors.processor ?? formatFieldError(error, "processor")
                  }
                />
              </Container>
              <Container className="col-12 col-lg-4 col-xl-3 p-0">
                <Form.Label htmlFor="screen_size">Screen size *</Form.Label>
                <Form.Control
                  id="screen_size"
                  type="number"
                  max={10}
                  min={1}
                  step={0.1}
                  required
                  autoComplete="screen_size"
                  placeholder="6.8"
                  name="screen_size"
                  {...register("screen_size")}
                />
                <ErrorMessage
                  textError={
                    errors.screen_size ?? formatFieldError(error, "screen_size")
                  }
                />
              </Container>
            </Form.Group>

            <Form.Group className="d-flex col-12 col-xl-10 flex-wrap flex-lg-nowrap p-0 justify-content-between">
              <Container className="col-12 col-lg-6 p-0">
                <Form.Label htmlFor="battery">Baterry (mAh) *</Form.Label>
                <Form.Control
                  id="battery"
                  type="number"
                  autoComplete="battery"
                  min={1000}
                  max={5000}
                  step={100}
                  required
                  placeholder="5000"
                  name="battery"
                  {...register("battery")}
                />
                <ErrorMessage
                  textError={
                    errors.battery ?? formatFieldError(error, "battery")
                  }
                />
              </Container>
              <Container className="col-12 col-lg-5 p-0">
                <Form.Label htmlFor="os">OS *</Form.Label>
                <Form.Control
                  id="os"
                  autoComplete="os"
                  type="text"
                  required
                  placeholder="Android 13"
                  name="os"
                  {...register("os")}
                />
                <ErrorMessage
                  textError={errors.os ?? formatFieldError(error, "os")}
                />
              </Container>
            </Form.Group>

            <Form.Group className="d-flex col-12 col-xl-10 flex-wrap flex-lg-nowrap p-0 justify-content-between">
              <Container className="col-12 col-lg-6 p-0">
                <Form.Label htmlFor="quantity">Quantity *</Form.Label>
                <Form.Control
                  id="quantity"
                  autoComplete="quantity"
                  type="number"
                  required
                  name="quantity"
                  {...register("quantity")}
                />
                <ErrorMessage
                  textError={
                    errors.quantity ?? formatFieldError(error, "quantity")
                  }
                />
              </Container>
              <Container className="col-12 col-lg-5 p-0">
                <Form.Label htmlFor="price">Price *</Form.Label>
                <Form.Control
                  id="price"
                  autoComplete="price"
                  min={1}
                  type="number"
                  required
                  placeholder="3000"
                  name="price"
                  {...register("price")}
                />
                <ErrorMessage
                  textError={errors.price ?? formatFieldError(error, "price")}
                />
              </Container>
            </Form.Group>
            <Form.Group className="d-flex p-0 col-12 col-xl-10">
              <Container className="col-12 p-0 px-xl-3 px-xxl-4 px-lg-3">
                <Form.Label htmlFor="photo">Photo link *</Form.Label>
                <Form.Control
                  id="photo"
                  autoComplete="photo"
                  type="text"
                  name="photo"
                  {...register("photo")}
                />
                <ErrorMessage
                  textError={
                    errors.photo ??
                    formatFieldError(error, "photo") ??
                    (!isErrorForKey(error, "mobile") && formatError(error))
                  }
                />
              </Container>
            </Form.Group>

            <Container className="col-12 col-xl-10 mt-2 p-0 mb-4 mb-md-0">
              <Container className="col-12 px-xl-3 px-xxl-4 px-lg-3 d-flex justify-content-sm-end p-0 mb-4 mb-md-0">
                <Button
                  disabled={isDirty}
                  type="submit"
                  className="bg-custom bg-custom-class border-0 col-12 col-xl-3 mb-4 mb-md-0"
                >
                  Save changes
                </Button>
              </Container>
            </Container>
          </Form>
        </Container>
      ) : (
        isBrandError &&
        !isLoading && (
          <CustomAlert variant="danger">
            {formatError(brandError) ??
              "Something went wrong, please try again later!"}
          </CustomAlert>
        )
      )}
    </Container>
  );
};

export default MobileForm;
