import {
  bookNameToApiId,
  apiIdToBookName,
  getChapterId,
  getVerseId,
} from "../ApiBibleMapping";
import { oTBooks, nTBooks } from "../Books";

describe("bookNameToApiId", () => {
  it("maps all 39 Old Testament books", () => {
    let otNames = Object.values(oTBooks);
    for (let name of otNames) {
      expect(bookNameToApiId[name]).toBeDefined();
      expect(typeof bookNameToApiId[name]).toBe("string");
      expect(bookNameToApiId[name].length).toBeGreaterThanOrEqual(2);
    }
  });

  it("maps all 27 New Testament books", () => {
    let ntNames = Object.values(nTBooks);
    for (let name of ntNames) {
      expect(bookNameToApiId[name]).toBeDefined();
      expect(typeof bookNameToApiId[name]).toBe("string");
      expect(bookNameToApiId[name].length).toBeGreaterThanOrEqual(2);
    }
  });

  it("maps exactly 66 books", () => {
    expect(Object.keys(bookNameToApiId)).toHaveLength(66);
  });

  it("maps specific known books correctly", () => {
    expect(bookNameToApiId["genesis"]).toBe("GEN");
    expect(bookNameToApiId["exodus"]).toBe("EXO");
    expect(bookNameToApiId["psalms"]).toBe("PSA");
    expect(bookNameToApiId["revelation"]).toBe("REV");
  });

  it("maps numbered OT books correctly", () => {
    expect(bookNameToApiId["1 samuel"]).toBe("1SA");
    expect(bookNameToApiId["2 samuel"]).toBe("2SA");
    expect(bookNameToApiId["1 kings"]).toBe("1KI");
    expect(bookNameToApiId["2 kings"]).toBe("2KI");
    expect(bookNameToApiId["1 chronicles"]).toBe("1CH");
    expect(bookNameToApiId["2 chronicles"]).toBe("2CH");
  });

  it("maps numbered NT books correctly (including suffix-style names)", () => {
    expect(bookNameToApiId["1 corinthians"]).toBe("1CO");
    expect(bookNameToApiId["2 corinthians"]).toBe("2CO");
    expect(bookNameToApiId["1 thessalonians"]).toBe("1TH");
    expect(bookNameToApiId["2 thessalonians"]).toBe("2TH");
    expect(bookNameToApiId["timothy 1"]).toBe("1TI");
    expect(bookNameToApiId["timothy 2"]).toBe("2TI");
    expect(bookNameToApiId["1 peter"]).toBe("1PE");
    expect(bookNameToApiId["2 peter"]).toBe("2PE");
    expect(bookNameToApiId["john 1"]).toBe("1JN");
    expect(bookNameToApiId["john 2"]).toBe("2JN");
    expect(bookNameToApiId["john 3"]).toBe("3JN");
  });
});

describe("apiIdToBookName", () => {
  it("round-trips all book names", () => {
    for (let [name, apiId] of Object.entries(bookNameToApiId)) {
      expect(apiIdToBookName[apiId]).toBe(name);
    }
  });

  it("maps exactly 66 API IDs", () => {
    expect(Object.keys(apiIdToBookName)).toHaveLength(66);
  });
});

describe("getChapterId", () => {
  it("builds chapter ID from book name and chapter number", () => {
    expect(getChapterId("genesis", 1)).toBe("GEN.1");
    expect(getChapterId("psalms", 119)).toBe("PSA.119");
    expect(getChapterId("revelation", 22)).toBe("REV.22");
  });

  it("handles numbered books", () => {
    expect(getChapterId("1 samuel", 3)).toBe("1SA.3");
    expect(getChapterId("timothy 1", 2)).toBe("1TI.2");
  });
});

describe("getVerseId", () => {
  it("builds verse ID from book name, chapter, and verse", () => {
    expect(getVerseId("genesis", 1, 1)).toBe("GEN.1.1");
    expect(getVerseId("john", 3, 16)).toBe("JHN.3.16");
    expect(getVerseId("revelation", 22, 21)).toBe("REV.22.21");
  });

  it("handles numbered books", () => {
    expect(getVerseId("1 samuel", 3, 10)).toBe("1SA.3.10");
    expect(getVerseId("timothy 1", 2, 5)).toBe("1TI.2.5");
  });
});
