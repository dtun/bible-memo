import type { BibleTranslation } from "@/types";

import { filter } from "lodash";

function filterBibles(bibles: BibleTranslation[]) {
  return filter(bibles, ["language.nameLocal", "English"]);
}

import { sortBy } from "lodash";

function sortBibles(bibles: BibleTranslation[]) {
  return sortBy(bibles, "abbreviationLocal");
}

import { flowRight } from "lodash";

function filterAndSortBibles(bibles: BibleTranslation[]) {
  return flowRight(sortBibles, filterBibles)(bibles);
}

export { filterBibles, sortBibles, filterAndSortBibles };
