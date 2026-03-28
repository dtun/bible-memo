import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import {
  fetchChapter,
  parseChapterContent,
  API_BIBLE_BASE_URL,
  DEFAULT_BIBLE_ID,
} from "../apiBible";

let mockChapterContent =
  "     [1] In the beginning God created the heaven and the earth.  [2] And the earth was without form, and void; and darkness was upon the face of the deep.";

let mockChapterResponse = {
  data: {
    id: "GEN.1",
    bibleId: "de4e12af7f28f599-02",
    bookId: "GEN",
    number: "1",
    reference: "Genesis 1",
    content: mockChapterContent,
    verseCount: 2,
  },
  meta: {
    fums: "",
    fumsId: "",
    fumsJsInclude: "",
    fumsJs: "",
    fumsNoScript: "",
  },
};

describe("fetchChapter", () => {
  it("fetches chapter content and returns the data object", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          return HttpResponse.json(mockChapterResponse);
        }
      )
    );

    let result = await fetchChapter("GEN.1");
    expect(result.id).toBe("GEN.1");
    expect(result.content).toContain("In the beginning");
    expect(result.verseCount).toBe(2);
  });

  it("sends the api-key header", async () => {
    let capturedHeaders: Headers | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        ({ request }) => {
          capturedHeaders = new Headers(request.headers);
          return HttpResponse.json(mockChapterResponse);
        }
      )
    );

    await fetchChapter("GEN.1");
    expect(capturedHeaders!.get("api-key")).toBeDefined();
  });

  it("uses the default bible ID when none is provided", async () => {
    let capturedBibleId: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        ({ params }) => {
          capturedBibleId = params.bibleId as string;
          return HttpResponse.json(mockChapterResponse);
        }
      )
    );

    await fetchChapter("GEN.1");
    expect(capturedBibleId).toBe(DEFAULT_BIBLE_ID);
  });

  it("allows overriding the bible ID", async () => {
    let capturedBibleId: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        ({ params }) => {
          capturedBibleId = params.bibleId as string;
          return HttpResponse.json(mockChapterResponse);
        }
      )
    );

    await fetchChapter("GEN.1", "custom-bible-id");
    expect(capturedBibleId).toBe("custom-bible-id");
  });

  it("throws on API error responses", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          return new HttpResponse(null, { status: 401 });
        }
      )
    );

    await expect(fetchChapter("GEN.1")).rejects.toThrow();
  });

  it("throws on network errors", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        () => {
          return HttpResponse.error();
        }
      )
    );

    await expect(fetchChapter("GEN.1")).rejects.toThrow();
  });

  it("requests text content type with verse numbers", async () => {
    let capturedUrl: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
        ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(mockChapterResponse);
        }
      )
    );

    await fetchChapter("GEN.1");
    expect(capturedUrl).toContain("content-type=text");
    expect(capturedUrl).toContain("include-verse-numbers=true");
  });
});

describe("parseChapterContent", () => {
  it("parses verse markers into individual verses", () => {
    let content =
      "     [1] In the beginning God created the heaven and the earth.  [2] And the earth was without form, and void.";
    let verses = parseChapterContent(content);

    expect(verses).toHaveLength(2);
    expect(verses[0]).toEqual({
      verse: 1,
      text: "In the beginning God created the heaven and the earth.",
    });
    expect(verses[1]).toEqual({
      verse: 2,
      text: "And the earth was without form, and void.",
    });
  });

  it("strips paragraph markers (¶)", () => {
    let content = "     [6] ¶ And God said, Let there be a firmament.";
    let verses = parseChapterContent(content);

    expect(verses[0].text).toBe(
      "And God said, Let there be a firmament."
    );
  });

  it("handles multiline content", () => {
    let content =
      "     [1] First verse.\n     [2] Second verse.\n     [3] Third verse.";
    let verses = parseChapterContent(content);

    expect(verses).toHaveLength(3);
    expect(verses[2]).toEqual({ verse: 3, text: "Third verse." });
  });

  it("returns empty array for empty content", () => {
    expect(parseChapterContent("")).toEqual([]);
  });
});
