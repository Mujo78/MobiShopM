import { useMutation } from "@tanstack/react-query";
import { updateCartItemFn } from "./api";
import { toast } from "react-toastify";

export function useUpdateCartItem() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: async ({ itemId, quantity }) => {
      if (itemId) {
        return await updateCartItemFn(itemId, quantity);
      }
    },
    onSuccess: () => {
      toast.success("Item successfully updated!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { mutate, isPending };
}
