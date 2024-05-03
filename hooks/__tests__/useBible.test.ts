import { renderHook, waitFor } from "@testing-library/react-native";
import { AllTheProviders } from "@/test-utils";
import { bibleTranslationBuilder } from "@/builders/bibleTranslation";
import { useBible } from "../useBible";

const bible = bibleTranslationBuilder();

describe("useBible", () => {
  it("renders", async () => {
    const { result } = renderHook(() => useBible(bible.id), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isFetched).toBe(true));

    expect(result.current.data).toBeTruthy();
  });
});
