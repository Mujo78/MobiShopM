import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { userSignup } from "./api";

export function useSignup() {
  const { mutate: signup, error } = useMutation({
    mutationFn: userSignup,
    onSuccess: (user) => {
      toast.success("Account successfully created!");
    },
  });

  return { signup, error };
}
