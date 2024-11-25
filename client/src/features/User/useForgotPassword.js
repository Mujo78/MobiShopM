import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPasswordFn } from "./api";

export function useForgotPassword() {
  const {
    mutate: forgotPassword,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: forgotPasswordFn,
    onSuccess: () => {
      toast.success("Success! Please check your email inbox for details.");
    },
  });

  return { forgotPassword, error, isError, isPending };
}
