import type { BibleTranslation } from "@/types";
import { filter, sortBy, flowRight } from "lodash";

type FilterCriteria = {
  key: keyof BibleTranslation | string;
  value: any;
};

type SortCriteria = keyof BibleTranslation | string;

function filterBibles(bibles: BibleTranslation[], criteria: FilterCriteria) {
  return filter(bibles, [criteria.key, criteria.value]);
}

function sortBibles(bibles: BibleTranslation[], criteria: SortCriteria) {
  return sortBy(bibles, criteria);
}

function filterAndSortBibles(
  bibles: BibleTranslation[],
  filterCriteria: FilterCriteria,
  sortCriteria: SortCriteria
) {
  return flowRight(
    (b: BibleTranslation[]) => sortBibles(b, sortCriteria),
    (b: BibleTranslation[]) => filterBibles(b, filterCriteria)
  )(bibles);
}

export { filterBibles, sortBibles, filterAndSortBibles };
