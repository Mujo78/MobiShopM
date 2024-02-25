import { useQuery } from "@tanstack/react-query";
import { getMobileByIdFn } from "./api";

export function useFetchMobile(mobileId) {
  const { data, isFetching, isError, isSuccess } = useQuery({
    retry: 2,
    queryKey: ["fetchMobile", mobileId],
    queryFn: () => {
      if (mobileId) {
        return getMobileByIdFn(mobileId);
      }
    },
  });

  return { data, isFetching, isError, isSuccess };
}
