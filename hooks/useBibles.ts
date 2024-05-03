import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getBibles } from "@/api/bible";
import type { BibleTranslation } from "@/types";

const queryKey = ["bibles"];

function useBibles(options?: UseQueryOptions<BibleTranslation[]>) {
  return useQuery({
    ...options,
    queryFn: getBibles,
    queryKey,
    staleTime: Infinity,
  });
}

export { useBibles, queryKey };
