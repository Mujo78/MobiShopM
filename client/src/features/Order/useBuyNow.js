import { useMutation } from "@tanstack/react-query";
import { buyNowMobileFn } from "./api";
import { toast } from "react-toastify";

export function useBuyNow() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["buyNowMobile"],
    mutationFn: async ({ mobileId, data }) => {
      if (mobileId) {
        return await buyNowMobileFn(mobileId, data);
      }
    },
    onSuccess: () => {
      toast.success("Product successfully ordered.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { mutate, isPending };
}
