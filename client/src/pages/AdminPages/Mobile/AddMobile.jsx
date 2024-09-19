import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditMobileSchema } from "../../../validations/admin/addEditMobileValidator";
import { useMutation } from "@tanstack/react-query";
import { addNewMobileFn } from "../../../features/Admin/api";
import { toast } from "react-toastify";
import MobileForm from "../../../components/Mobile/MobileForm";

export default function AddMobile() {
  const { register, reset, handleSubmit, formState, watch } = useForm({
    resolver: yupResolver(addEditMobileSchema),
  });
  const { errors, isDirty } = formState;

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["addMobile"],
    mutationFn: addNewMobileFn,
    onSuccess: () => {
      toast.success("Successfully added new mobile!");
      reset();
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <MobileForm
      isPending={isPending}
      register={register}
      error={error}
      errors={errors}
      isError={isError}
      handleSubmit={handleSubmit}
      onSubmitFn={onSubmit}
      watch={watch}
      isDirty={isDirty}
    >
      <h3 className="text-center mb-4">Add new Mobile</h3>
    </MobileForm>
  );
}
