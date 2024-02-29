import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { buyNowMobileFn } from "./api";
import { toast } from "react-toastify";

export function useBuyNow(mobileId) {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ["buyNowMobile"],
    mutationFn: async (data) => {
      if (mobileId) {
        const token = user?.token;
        return await buyNowMobileFn(token, mobileId, data);
      }
    },
    onSuccess: () => {
      toast.success("Product successfully ordered.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong, please try again latter!");
    },
  });

  return { mutate, isPending };
}
