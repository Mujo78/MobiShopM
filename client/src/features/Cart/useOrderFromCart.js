import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { buyCartItemFn } from "../Order/api";

export function useOrderFromCart() {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["orderFromCart"],
    mutationFn: async ({ itemId, payment_info }) => {
      if (itemId) {
        const token = user?.token;
        return await buyCartItemFn(token, itemId, payment_info);
      }
    },
    onSuccess: () => {
      toast.success("Product successfully ordered!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again later!");
    },
  });

  return { mutate, isPending };
}
