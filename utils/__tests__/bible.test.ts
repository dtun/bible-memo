import { BibleTranslation } from "@/types";
import { filterAndSortBibles, sortBibles, filterBibles } from "../bible";
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
    id: "3",
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
    id: "2",
  },
});
let bibleC = bibleTranslationBuilder({
  overrides: {
    abbreviationLocal: "C",
    language: {
      name: "Spanish",
      nameLocal: "Español",
      script: "",
      scriptDirection: "LTR",
      id: "",
    },
    id: "1",
  },
});

describe("Bible Functions", () => {
  let bibles: BibleTranslation[] = [bibleA, bibleB, bibleC];

  describe("filterBibles", () => {
    it("should filter Bibles by language", () => {
      let filtered = filterBibles(bibles, {
        key: "language.nameLocal",
        value: "English",
      });

      expect(filtered).toHaveLength(2);
      expect(
        filtered.every((bible) => bible.language.nameLocal === "English")
      ).toBe(true);
    });

    it("should return empty array if no Bibles match the filter", () => {
      let filtered = filterBibles(bibles, {
        key: "language.nameLocal",
        value: "French",
      });

      expect(filtered).toHaveLength(0);
    });
  });

  describe("sortBibles", () => {
    it("should sort Bibles by abbreviationLocal", () => {
      let sorted = sortBibles(bibles, "abbreviationLocal");

      expect(sorted.map((bible) => bible.abbreviationLocal)).toEqual([
        "A",
        "B",
        "C",
      ]);
    });

    it("should sort Bibles by id", () => {
      let sorted = sortBibles(bibles, "id");

      expect(sorted.map((bible) => bible.id)).toEqual(["1", "2", "3"]);
    });
  });

  describe("filterAndSortBibles", () => {
    it("should filter by English language and sort by abbreviationLocal", () => {
      let result = filterAndSortBibles(
        bibles,
        { key: "language.nameLocal", value: "English" },
        "abbreviationLocal"
      );

      expect(result).toHaveLength(2);
      expect(result.map((bible) => bible.abbreviationLocal)).toEqual([
        "A",
        "B",
      ]);
    });

    it("should return empty array if no Bibles match the filter", () => {
      let result = filterAndSortBibles(
        bibles,
        { key: "language.nameLocal", value: "French" },
        "abbreviationLocal"
      );

      expect(result).toHaveLength(0);
    });
  });
});
