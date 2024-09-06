import { useQuery } from "@tanstack/react-query";
import { fetchMyCartFn } from "./api";

export function useCart() {
  const { data, isFetching, isError, error, isFetched } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchMyCartFn,
    retry: 1,
  });

  return { data, isFetching, isError, error, isFetched };
}
