import { useQuery } from "@tanstack/react-query";
import { getMobileByIdFn } from "./api";

export function useFetchMobile(mobileId) {
  const { data, isFetching, isError, isSuccess, error } = useQuery({
    retry: 1,
    queryKey: ["fetchMobile", mobileId],
    queryFn: () => {
      if (mobileId) {
        return getMobileByIdFn(mobileId);
      }
    },
  });

  return { data, isFetching, isError, isSuccess, error };
}
