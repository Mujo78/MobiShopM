import { useQuery } from "@tanstack/react-query";
import { getMyWishlistFn } from "./api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export function useWishlist() {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => {
      if (user?.role === 2) {
        const token = user.token;
        return getMyWishlistFn(token);
      } else {
        return null;
      }
    },
    retry: 1,
    onError: (error) => {
      if (error) {
        console.log("object");
        toast.error(
          "There was an error while loading you wishlist, it will be fixed soon."
        );
      }
    },
  });

  return { data };
}
