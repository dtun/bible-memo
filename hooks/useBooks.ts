import { useQuery } from "@tanstack/react-query";

import { getBooks } from "@/api/bible";
import { queryKey } from "./useBibles";

function useBooks(id: string) {
  return useQuery({
    queryFn: () => getBooks(id),
    queryKey: [...queryKey, id, "books"],
    staleTime: Infinity,
  });
}

export { useBooks, queryKey };
