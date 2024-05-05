import { filterAndSortBibles } from "../bible";
import { bibleTranslationBuilder } from "@/builders/bibleTranslation";

let bibleA = bibleTranslationBuilder({
  overrides: {
    abbreviationLocal: "A",
    language: {
      name: "English",
      nameLocal: "English",
      script: "",
      scriptDirection: "LTR",
      id: "",
    },
  },
});
let bibleB = bibleTranslationBuilder({
  overrides: {
    abbreviationLocal: "B",
    language: {
      name: "English",
      nameLocal: "English",
      script: "",
      scriptDirection: "LTR",
      id: "",
    },
  },
});
let bibleC = bibleTranslationBuilder({ overrides: { abbreviationLocal: "C" } });
test("filterAndSortBibles", () => {
  expect(filterAndSortBibles([bibleC, bibleB, bibleA])).toMatchObject([
    bibleA,
    bibleB,
  ]);
});
