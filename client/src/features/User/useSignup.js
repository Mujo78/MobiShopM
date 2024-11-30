import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userSignup } from "./api";

export function useSignup() {
  const {
    mutate: signup,
    error,
    isError,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: userSignup,
    onSuccess: () => {
      toast.success("Verification email is sent. Please check your inbox.");
    },
  });

  return { signup, error, isError };
}
