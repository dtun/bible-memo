import { useQuery } from "@tanstack/react-query";

import { getBibles } from "@/api/bible";
import type { BibleTranslation } from "@/types";

let queryKey = ["bibles"];

function useBibles<TResult>(select?: (data: BibleTranslation[]) => TResult) {
  return useQuery({
    queryFn: getBibles,
    queryKey,
    select,
    staleTime: Infinity,
  });
}

export { useBibles, queryKey };
