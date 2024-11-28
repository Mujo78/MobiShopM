import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resetPasswordFn } from "./api";
import { formatError } from "../../helpers/utils";

export function useResetPassword() {
  const {
    mutate: resetPassword,
    error,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordFn,
    onSuccess: () => {
      toast.success("Successfully changed password!");
    },
    onError: (error) => {
      toast.error(formatError(error));
    },
  });

  return { resetPassword, error, isError, isPending, isSuccess };
}
