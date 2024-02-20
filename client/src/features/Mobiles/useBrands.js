import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "./api";

export function useBrands() {
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  return { data, isFetching, isError, isSuccess };
}
