import { useQuery } from "@tanstack/react-query";
import { fetchMyCartFn } from "./api";
import { useAuth } from "../../context/AuthContext";

export function useCart() {
  const { user } = useAuth();
  const { data, isFetching, isError, error, isFetched } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      if (user.role === 2) {
        return fetchMyCartFn();
      }
    },
    retry: 1,
  });

  return { data, isFetching, isError, error, isFetched };
}
