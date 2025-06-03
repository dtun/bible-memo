import { books } from "@/constants/Books";
import { startCase } from "../startCase";

describe("startCase", () => {
  it("should format the book name correctly", () => {
    expect(startCase("genesis")).toBe("Genesis");
  });

  it("should format the book name correctly for a book with a space", () => {
    expect(startCase("john 1")).toBe("John 1");
  });

  it("should format the book name correctly for a book with a space and a number", () => {
    expect(startCase("1 samuel")).toBe("1 Samuel");
  });

  test("formats book names", () => {
    let [ot, nt] = books;

    expect(Object.values(ot).map(startCase)).toMatchInlineSnapshot(`
  [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1 Samuel",
    "2 Samuel",
    "1 Kings",
    "2 Kings",
    "1 Chronicles",
    "2 Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song Of Songs",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
  ]
  `);

    expect(Object.values(nt).map(startCase)).toMatchInlineSnapshot(`
  [
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Thessalonians",
    "2 Thessalonians",
    "Timothy 1",
    "Timothy 2",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1 Peter",
    "2 Peter",
    "John 1",
    "John 2",
    "John 3",
    "Jude",
    "Revelation",
  ]
  `);
  });
});
