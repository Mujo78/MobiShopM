import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { verifyFn } from "./api";
import { formatError } from "../../helpers/utils";
import { useNavigate } from "react-router-dom";

export function useVerify() {
  const navigate = useNavigate();
  const {
    mutate: verify,
    isSuccess,
    isPending,
  } = useMutation({
    mutationKey: ["verify"],
    mutationFn: verifyFn,
    onError: (error) => {
      toast.error(formatError(error).message);
    },
    onSuccess: () => {
      toast.success("Email successfully verified.");
      navigate("/login");
    },
  });

  return { verify, isPending, isSuccess };
}
