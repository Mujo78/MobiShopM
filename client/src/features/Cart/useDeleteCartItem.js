import { useMutation } from "@tanstack/react-query";
import { deleteCartItemFn } from "./api";
import { toast } from "react-toastify";

export function useDeleteCartItem() {
  const { mutate } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: deleteCartItemFn,
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
