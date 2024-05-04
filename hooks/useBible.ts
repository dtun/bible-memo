import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getBibles } from "@/api/bible";
import type { BibleTranslation } from "@/types";

import { queryKey } from "./useBibles";

function useBible(id: string, options?: UseQueryOptions<BibleTranslation[]>) {
  return useQuery({
    ...options,
    queryFn: getBibles,
    queryKey: [...queryKey, id],
    staleTime: Infinity,
  });
}

export { useBible };
