import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetchMyCartFn } from "./api";

export function useCart() {
  const { user } = useAuth();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const token = user.token;
      if (token) {
        return fetchMyCartFn(token);
      }
    },
  });

  return { data, isFetching, isError, error };
}
