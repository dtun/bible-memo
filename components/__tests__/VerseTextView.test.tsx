import { render, screen, fireEvent, waitFor } from "@/test-utils";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { VerseTextView } from "../VerseTextView";
import { API_BIBLE_BASE_URL } from "@/utils/apiBible";

let mockVerses = [
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
    content: "And the earth was without form, and void.",
  },
];

function setupMockApi() {
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
}

describe("VerseTextView", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it("shows loading indicator initially", () => {
    setupMockApi();
    render(
      <VerseTextView bookName="genesis" chapter={1} onVersePress={() => {}} />
    );

    expect(screen.getByText("Loading verses...")).toBeTruthy();
  });

  it("renders verse text after loading", async () => {
    setupMockApi();
    render(
      <VerseTextView bookName="genesis" chapter={1} onVersePress={() => {}} />
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });

    expect(
      screen.getByText("And the earth was without form, and void.")
    ).toBeTruthy();
  });

  it("renders verse numbers", async () => {
    setupMockApi();
    render(
      <VerseTextView bookName="genesis" chapter={1} onVersePress={() => {}} />
    );

    await waitFor(() => {
      expect(screen.getByText("1")).toBeTruthy();
    });
    expect(screen.getByText("2")).toBeTruthy();
  });

  it("calls onVersePress when a verse is tapped", async () => {
    setupMockApi();
    let onVersePress = jest.fn();
    render(
      <VerseTextView
        bookName="genesis"
        chapter={1}
        onVersePress={onVersePress}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId("verse-row-1"));
    expect(onVersePress).toHaveBeenCalledWith(1);
  });

  it("shows error state with retry button on failure", async () => {
    server.use(
      http.get(
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId/verses`,
        () => {
          return new HttpResponse(null, { status: 500 });
        }
      )
    );

    render(
      <VerseTextView
        bookName="deuteronomy"
        chapter={1}
        onVersePress={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Retry")).toBeTruthy();
    });
  });
});
