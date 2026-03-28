import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import {
  fetchChapterVerses,
  API_BIBLE_BASE_URL,
  DEFAULT_BIBLE_ID,
} from "../apiBible";
import type { ApiBibleVerse } from "@/types/apiBible";

let mockVerses: ApiBibleVerse[] = [
  {
    id: "GEN.1.1",
    orgId: "GEN.1.1",
    bookId: "GEN",
    chapterId: "GEN.1",
    bibleId: "de4e12af7f28f599-02",
    reference: "Genesis 1:1",
    content: "In the beginning God created the heaven and the earth.",
  },
  {
    id: "GEN.1.2",
    orgId: "GEN.1.2",
    bookId: "GEN",
    chapterId: "GEN.1",
    bibleId: "de4e12af7f28f599-02",
    reference: "Genesis 1:2",
    content:
      "And the earth was without form, and void; and darkness was upon the face of the deep.",
  },
];

describe("fetchChapterVerses", () => {
  it("fetches verses for a chapter and returns the data array", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        () => {
          return HttpResponse.json({
            data: mockVerses,
            meta: {
              fums: "",
              fumsId: "",
              fumsJsInclude: "",
              fumsJs: "",
              fumsNo498Script: "",
            },
          });
        }
      )
    );

    let result = await fetchChapterVerses("GEN.1");
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("GEN.1.1");
    expect(result[0].content).toBe(
      "In the beginning God created the heaven and the earth."
    );
    expect(result[1].id).toBe("GEN.1.2");
  });

  it("sends the api-key header", async () => {
    let capturedHeaders: Headers | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        ({ request }) => {
          capturedHeaders = new Headers(request.headers);
          return HttpResponse.json({ data: [], meta: {} });
        }
      )
    );

    await fetchChapterVerses("GEN.1");
    expect(capturedHeaders!.get("api-key")).toBeDefined();
  });

  it("uses the default bible ID when none is provided", async () => {
    let capturedBibleId: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        ({ params }) => {
          capturedBibleId = params.bibleId as string;
          return HttpResponse.json({ data: [], meta: {} });
        }
      )
    );

    await fetchChapterVerses("GEN.1");
    expect(capturedBibleId).toBe(DEFAULT_BIBLE_ID);
  });

  it("allows overriding the bible ID", async () => {
    let capturedBibleId: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        ({ params }) => {
          capturedBibleId = params.bibleId as string;
          return HttpResponse.json({ data: [], meta: {} });
        }
      )
    );

    await fetchChapterVerses("GEN.1", "custom-bible-id");
    expect(capturedBibleId).toBe("custom-bible-id");
  });

  it("throws on API error responses", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        () => {
          return new HttpResponse(null, { status: 401 });
        }
      )
    );

    await expect(fetchChapterVerses("GEN.1")).rejects.toThrow();
  });

  it("throws on network errors", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        () => {
          return HttpResponse.error();
        }
      )
    );

    await expect(fetchChapterVerses("GEN.1")).rejects.toThrow();
  });

  it("requests text content type", async () => {
    let capturedUrl: string | null = null;

    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json({ data: [], meta: {} });
        }
      )
    );

    await fetchChapterVerses("GEN.1");
    expect(capturedUrl).toContain("content-type=text");
  });
});
