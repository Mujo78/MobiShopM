import { useForm } from "react-hook-form";
import MobileForm from "../../../components/Mobile/MobileForm";
import { addEditMobileSchema } from "../../../validations/admin/addEditMobileValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFetchMobile } from "../../../features/Mobiles/useFetchMobile";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { deleteMobileFn, editMobileFn } from "../../../features/Mobiles/api";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Modal from "react-bootstrap/esm/Modal";
import CustomAlert from "../../../components/UI/Alert";
import { formatError } from "../../../helpers/utils";

export default function EditMobile() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { mobileId } = useParams();

  const { register, reset, handleSubmit, formState, watch, getValues } =
    useForm({
      resolver: yupResolver(addEditMobileSchema),
    });
  const { errors, isDirty } = formState;

  const {
    data: mobile,
    isFetching,
    error: fetchError,
    isError,
    isSuccess,
  } = useFetchMobile(mobileId);

  useEffect(() => {
    if (mobile && isSuccess) {
      reset(mobile);
    }
  }, [isSuccess, mobile, reset]);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["editMobile"],
    mutationFn: async (values) => {
      return await editMobileFn(mobileId, values);
    },
    onSuccess: () => {
      toast.success("Successfully edited mobile!");
      handleNavigateBack();
    },
  });

  const { mutate: deleteMobile, isPending: isLoading } = useMutation({
    mutationKey: ["deleteMobile"],
    mutationFn: deleteMobileFn,
    onSuccess: () => {
      toast.success("Successfully deleted mobile!");
      handleNavigateBack();
    },
    onError: () => {
      setShow(false);
      toast.error(
        "Something went wrong while deleting mobile data, please try again later!"
      );
    },
  });

  const onSubmit = (values) => {
    if (mobileId) {
      mutate(values);
    }
  };

  const handleDeleteModalShow = () => {
    setShow(true);
  };

  const handleDeleteMobile = () => {
    if (mobileId) {
      deleteMobile(mobileId);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {isSuccess ? (
        <MobileForm
          isPending={isPending || isFetching || isLoading}
          register={register}
          error={error}
          errors={errors}
          isError={isError}
          handleSubmit={handleSubmit}
          onSubmitFn={onSubmit}
          watch={watch}
          isDirty={isDirty}
        >
          <div className="d-flex flex-column-reverse flex-sm-row mb-4 mb-sm-2">
            <Button variant="danger" onClick={handleDeleteModalShow}>
              Delete Mobile
            </Button>
            <h3 className="text-center mx-auto">Edit Mobile</h3>
            <CloseButton
              className="d-none d-sm-block"
              onClick={handleNavigateBack}
            />
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete: {getValues("mobile_name")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              <strong> {getValues("mobile_name")}</strong> ?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="light"
                className="me-auto border"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteMobile}>
                Delete Mobile
              </Button>
            </Modal.Footer>
          </Modal>
        </MobileForm>
      ) : (
        isError && (
          <CustomAlert variant="danger" fromTop={2}>
            {formatError(fetchError) ??
              "Something went wrong, please try again later!"}
          </CustomAlert>
        )
      )}
    </>
  );
}
