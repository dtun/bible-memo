import { renderHook, waitFor } from "@testing-library/react-native";

import { bibleTranslationBuilder } from "@/builders/bibleTranslation";
import { AllTheProviders } from "@/components/AllTheProviders";
import { useBible } from "../useBible";

let bible = bibleTranslationBuilder();

describe("useBible", () => {
  it("renders", async () => {
    let { result } = renderHook(() => useBible(bible.id), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isFetched).toBe(true));

    expect(result.current.data).toBeTruthy();
  });
});
