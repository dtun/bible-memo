import { renderHook, waitFor } from "@testing-library/react-native";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { useChapterText } from "../chapterText";
import { API_BIBLE_BASE_URL } from "@/utils/apiBible";
import { AllTheProviders } from "@/components/AllTheProviders";

let mockChapterContent =
  "     [1] In the beginning God created the heaven and the earth.  [2] And the earth was without form, and void.";

function setupMockApi(content = mockChapterContent) {
  server.use(
    http.get(
      `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
      () => {
        return HttpResponse.json({
          data: {
            id: "GEN.1",
            bibleId: "de4e12af7f28f599-02",
            bookId: "GEN",
            number: "1",
            reference: "Genesis 1",
            content,
            verseCount: 2,
          },
          meta: { fums: "", fumsId: "", fumsJsInclude: "", fumsJs: "", fumsNoScript: "" },
        });
      }
    )
  );
}

describe("useChapterText", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it("starts in loading state", async () => {
    setupMockApi();
    let { result, unmount } = renderHook(
      () => useChapterText("genesis", 1),
      { wrapper: AllTheProviders }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.verses).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for async fetch to complete before unmount to avoid act() warning
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    unmount();
  });

  it("fetches and returns parsed verses", async () => {
    setupMockApi();
    let { result } = renderHook(() => useChapterText("genesis", 1), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.verses).toHaveLength(2);
    expect(result.current.verses[0]).toEqual({
      verse: 1,
      text: "In the beginning God created the heaven and the earth.",
    });
    expect(result.current.verses[1]).toEqual({
      verse: 2,
      text: "And the earth was without form, and void.",
    });
    expect(result.current.error).toBeNull();
  });

  it("returns error state on network failure", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          return HttpResponse.error();
        }
      )
    );

    let { result } = renderHook(() => useChapterText("exodus", 1), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.verses).toEqual([]);
  });

  it("returns error state on API error", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          return new HttpResponse(null, { status: 500 });
        }
      )
    );

    let { result } = renderHook(() => useChapterText("leviticus", 1), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.verses).toEqual([]);
  });

  it("caches fetched verses in TinyBase and serves from cache", async () => {
    let fetchCount = 0;
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          fetchCount++;
          return HttpResponse.json({
            data: {
              id: "NUM.1",
              bibleId: "de4e12af7f28f599-02",
              bookId: "NUM",
              number: "1",
              reference: "Numbers 1",
              content: mockChapterContent,
              verseCount: 2,
            },
            meta: { fums: "", fumsId: "", fumsJsInclude: "", fumsJs: "", fumsNoScript: "" },
          });
        }
      )
    );

    // First render — fetches from API
    let { result, rerender } = renderHook(
      () => useChapterText("numbers", 1),
      { wrapper: AllTheProviders }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(fetchCount).toBe(1);
    expect(result.current.verses).toHaveLength(2);

    // Re-render — should use cache, not fetch again
    rerender({});

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(fetchCount).toBe(1);
    expect(result.current.verses).toHaveLength(2);
  });
});
