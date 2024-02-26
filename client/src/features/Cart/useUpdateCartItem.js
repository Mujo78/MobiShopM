import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { updateCartItemFn } from "./api";
import { toast } from "react-toastify";

export function useUpdateCartItem() {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: async ({ itemId, quantity }) => {
      if (itemId) {
        const token = user.token;
        return await updateCartItemFn(token, itemId, quantity);
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
