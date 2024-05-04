import { books } from "@/constants/Books";
import { formatScreenTitle } from "../bible";

test("formatScreenTitle", () => {
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
