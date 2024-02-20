import { useForm } from "react-hook-form";
import MobileForm from "../../../components/MobileForm";
import { useAuth } from "../../../context/AuthContext";
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
import Alert from "react-bootstrap/esm/Alert";

export default function EditMobile() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mobileId } = useParams();

  const { register, reset, handleSubmit, formState, watch, getValues } =
    useForm({
      resolver: yupResolver(addEditMobileSchema),
    });
  const { errors } = formState;

  const {
    data: mobile,
    isFetching,
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
      if (mobileId) {
        const token = user.token;
        await editMobileFn(token, mobileId, values);
      }
    },
    onSuccess: () => {
      toast.success("Successfully edited mobile!");
      handleNavigateBack();
    },
    onError: () => {
      toast.error(
        "Something went wrong while updating mobile data, please try again later!"
      );
    },
  });

  const { mutate: deleteMobile, isPending: isLoading } = useMutation({
    mutationKey: ["deleteMobile"],
    mutationFn: async () => {
      if (mobileId) {
        const token = user.token;
        await deleteMobileFn(token, mobileId);
      }
    },
    onSuccess: () => {
      toast.success("Successfully deleted mobile!");
      handleNavigateBack();
    },
    onError: () => {
      toast.error(
        "Something went wrong while deleting mobile data, please try again later!"
      );
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  const handleDeleteModalShow = () => {
    setShow(true);
  };

  const handleDeleteMobile = () => {
    deleteMobile(mobileId);
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
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteMobile}>
                Delete Mobile
              </Button>
            </Modal.Footer>
          </Modal>
        </MobileForm>
      ) : (
        <Alert variant="danger" className="w-75 mx-auto text-center mt-2">
          Something went wrong, please try again later!
        </Alert>
      )}
    </>
  );
}
