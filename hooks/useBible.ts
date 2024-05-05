import { useQuery } from "@tanstack/react-query";

import { getBible } from "@/api/bible";
import { queryKey } from "./useBibles";

function useBible(id: string) {
  return useQuery({
    queryFn: () => getBible(id),
    queryKey: [...queryKey, id],
    staleTime: Infinity,
  });
}

export { useBible };
