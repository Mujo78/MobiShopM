import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "./api";

export function useBrands() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  return { data, isFetching, isError };
}
