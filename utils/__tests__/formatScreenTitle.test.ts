import { books } from "@/constants/Books";
import { formatScreenTitle } from "../formatScreenTitle";

test("formats strings", () => {
  expect(Object.values(books).map(formatScreenTitle)).toMatchInlineSnapshot(`
[
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
]
`);
});
