import { useQuery } from "@tanstack/react-query";
import { jsonApi } from "../api/axios";

function useApiQuery(key, url) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await jsonApi.get(url);
      return data;
    },
  });
}

export default useApiQuery;
