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
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      if (!error.response.data.errors) {
        toast.error("Something went wrong, please try again later!");
      }
    },
  });

  return { signup, error, isError };
}
