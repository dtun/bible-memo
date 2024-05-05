import type { BibleTranslation } from "@/types";

function filterBibles(bibles: BibleTranslation[]) {
  return bibles.filter((b) => b.language.nameLocal === "English");
}

function sortBibles(bibles: BibleTranslation[]) {
  return bibles.sort((a, b) =>
    a.abbreviationLocal.localeCompare(b.abbreviationLocal)
  );
}

import { flowRight } from "lodash";

function filterAndSortBibles(bibles: BibleTranslation[]) {
  return flowRight(sortBibles, filterBibles)(bibles);
}

export { filterBibles, sortBibles, filterAndSortBibles };
