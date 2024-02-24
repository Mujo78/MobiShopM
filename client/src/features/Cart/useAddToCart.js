import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { addToCartFn } from "./api";
import { toast } from "react-toastify";

export function useAddToCart() {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ mobileId, quantity }) => {
      if (mobileId) {
        const token = user.token;
        return await addToCartFn(token, mobileId, quantity);
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
