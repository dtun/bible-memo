import { formatBookName } from "../formatBookName";

describe("formatBookName", () => {
  it("should format the book name correctly", () => {
    expect(formatBookName("genesis")).toBe("Genesis");
  });

  it("should format the book name correctly for a book with a space", () => {
    expect(formatBookName("john 1")).toBe("John 1");
  });

  it("should format the book name correctly for a book with a space and a number", () => {
    expect(formatBookName("1 samuel")).toBe("1 Samuel");
  });
});
