import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "./api";

export function useBrands() {
  const { data, isFetching, isError, isSuccess, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    retry: 1,
  });

  return { data, isFetching, isError, isSuccess, error };
}
