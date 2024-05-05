import { renderHook, waitFor } from "@testing-library/react-native";

import { AllTheProviders } from "@/components/AllTheProviders";
import { useBibles } from "../useBibles";

describe("useBibles", () => {
  it("renders", async () => {
    let { result } = renderHook(() => useBibles(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => expect(result.current.isFetched).toBe(true));

    expect(result.current.data).toBeTruthy();
  });
});
