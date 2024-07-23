import { renderHook, waitFor } from "@/test-utils";
import { AllTheProviders } from "@/components/AllTheProviders";
import { bibleBooks } from "@/builders/bibleBook";
import { useBooks } from "../useBooks";

let [firstBook] = bibleBooks[50];

describe("useBooks", () => {
  it("renders", async () => {
    let { result } = renderHook(() => useBooks(firstBook.id), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isFetched).toBe(true));

    expect(result.current.data).toBeTruthy();
  });
});
