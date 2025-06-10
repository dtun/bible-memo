import { createVerseId, parseVerseId } from "../verse";

describe("parseVerseId", () => {
  it("parses a verse id", () => {
    expect(parseVerseId("John-1-1")).toEqual({
      book: "John",
      chapter: 1,
      verse: 1,
    });
    expect(parseVerseId("John-1-2")).toEqual({
      book: "John",
      chapter: 1,
      verse: 2,
    });
    expect(parseVerseId("John-2-1")).toEqual({
      book: "John",
      chapter: 2,
      verse: 1,
    });
  });
});

describe("createVerseId", () => {
  it("creates a verse id", () => {
    expect(createVerseId("John", 1, 1)).toBe("John-1-1");
    expect(createVerseId("John", 1, 2)).toBe("John-1-2");
    expect(createVerseId("John", 2, 1)).toBe("John-2-1");
  });
});
