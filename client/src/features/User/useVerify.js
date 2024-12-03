import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { verifyFn } from "./api";
import { formatError } from "../../helpers/utils";

export function useVerify() {
  const { mutate: verify, isPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: verifyFn,
    onError: (error) => {
      console.log(error);
      toast.error(formatError(error).message);
    },
    onSuccess: () => {
      toast.success("Email successfully verified.");
    },
  });

  return { verify, isPending };
}
