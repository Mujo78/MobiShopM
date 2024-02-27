import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { deleteCartItemFn } from "./api";
import { toast } from "react-toastify";

export function useDeleteCartItem() {
  const { user } = useAuth();
  const { mutate } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: async (itemId) => {
      const token = user?.token;
      if (token && itemId) {
        await deleteCartItemFn(token, itemId);
      }
    },
    onSuccess: () => {
      toast.success("Item successfully deleted!");
    },
    onError: () => {
      toast.error(
        "There was a problem while deleting your item, please try again later!"
      );
    },
  });

  return { mutate };
}
