import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteWishitemFn } from "./api";
import { useAuth } from "../../context/AuthContext";

export function useDeleteFromWishlist() {
  const { user } = useAuth();
  const { mutate: deleteWishitem } = useMutation({
    mutationKey: ["deleteFromWishlist"],
    mutationFn: async (mobileId) => {
      if (user?.role === 2) {
        return await deleteWishitemFn(mobileId);
      }
    },
    onError: () => {
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { deleteWishitem };
}
