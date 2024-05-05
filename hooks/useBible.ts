import { useQuery } from "@tanstack/react-query";

import { getBible } from "@/api/bible";
import { queryKey } from "./useBibles";

function getBibleQuery(id: string) {
  return {
    queryFn: () => getBible(id),
    queryKey: [...queryKey, id],
    staleTime: Infinity,
  };
}

function useBible(id: string) {
  return useQuery(getBibleQuery(id));
}

export { getBibleQuery, useBible };
