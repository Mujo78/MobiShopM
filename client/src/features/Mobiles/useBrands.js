import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "./api";

export function useBrands() {
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    retry: 2,
  });

  return { data, isFetching, isError, isSuccess };
}
