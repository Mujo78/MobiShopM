import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToWishListFn } from "./api";
import { useAuth } from "../../context/AuthContext";

export function useAddToWishlist() {
  const { user } = useAuth();
  const { mutate: addToWishlist } = useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: async (mobileId) => {
      const token = user.token;
      await addToWishListFn(token, mobileId);
    },
    onSuccess: () => {
      toast.success("Item successfully added to wishlist!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { addToWishlist };
}
