import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { fetchMyCartFn } from "./api";

export function useCart() {
  const { user } = useAuth();

  const { data, isFetching, isError, error, isFetched } = useQuery({
    queryKey: ["cart", user],
    queryFn: () => {
      if (user !== null && user.token !== null) {
        return fetchMyCartFn(user.token);
      } else {
        return { data: null };
      }
    },
    retry: 1,
  });

  return { data, isFetching, isError, error, isFetched };
}
