import { useMutation } from "@tanstack/react-query";
import { addToCartFn } from "./api";
import { toast } from "react-toastify";

export function useAddToCart() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ mobileId, quantity }) => {
      if (mobileId) {
        return await addToCartFn(mobileId, quantity);
      }
    },
    onSuccess: () => {
      toast.success("Product successfully added to cart!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { mutate, isPending };
}
