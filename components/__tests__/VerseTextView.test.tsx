import { render, screen, fireEvent, waitFor } from "@/test-utils";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { VerseTextView } from "../VerseTextView";
import { API_BIBLE_BASE_URL } from "@/utils/apiBible";

let mockChapterContent =
  "     [1] In the beginning God created the heaven and the earth.  [2] And the earth was without form, and void.";

function setupMockApi() {
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
            content: mockChapterContent,
            verseCount: 2,
          },
          meta: { fums: "", fumsId: "", fumsJsInclude: "", fumsJs: "", fumsNoScript: "" },
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

  it("shows loading indicator initially", async () => {
    setupMockApi();
    render(
      <VerseTextView
        bookName="genesis"
        chapter={1}
        onVersePress={() => {}}
      />
    );

    expect(screen.getByText("Loading verses...")).toBeTruthy();

    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });
  });

  it("renders verse text after loading", async () => {
    setupMockApi();
    render(
      <VerseTextView
        bookName="genesis"
        chapter={1}
        onVersePress={() => {}}
      />
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
      <VerseTextView
        bookName="genesis"
        chapter={1}
        onVersePress={() => {}}
      />
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
        `${API_BIBLE_BASE_URL}/bibles/:bibleId/chapters/:chapterId`,
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

  it("visually distinguishes read verses", async () => {
    setupMockApi();
    render(
      <VerseTextView
        bookName="genesis"
        chapter={1}
        onVersePress={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("verse-row-1")).toBeTruthy();
    });

    // Unread verses should have the unread indicator
    expect(screen.getByTestId("verse-indicator-1")).toBeTruthy();
    expect(screen.getByTestId("verse-indicator-2")).toBeTruthy();
  });
});
