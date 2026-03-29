import { render, screen, fireEvent, waitFor } from "@/test-utils";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { API_BIBLE_BASE_URL } from "@/utils/apiBible";
import BibleScreen from "../bible";

let mockParams = { book: "genesis", chapter: "1" };

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => mockParams,
  useNavigation: () => ({ setOptions: jest.fn() }),
  useRouter: () => ({ setParams: jest.fn() }),
  Link: ({ children }: any) => children,
}));

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
            content:
              "     [1] In the beginning God created the heaven and the earth.",
            verseCount: 1,
          },
          meta: { fums: "", fumsId: "", fumsJsInclude: "", fumsJs: "", fumsNoScript: "" },
        });
      }
    )
  );
}

describe("BibleScreen", () => {
  beforeEach(() => {
    jest.useRealTimers();
    setupMockApi();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it("shows verse text directly without a toggle", async () => {
    render(<BibleScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });

    // No grid/text toggle should exist
    expect(screen.queryByText("Grid")).toBeNull();
    expect(screen.queryByText("Text")).toBeNull();
  });

  it("shows progress stats", () => {
    render(<BibleScreen />);

    expect(screen.getByText(/verses.*read/)).toBeTruthy();
  });

  it("shows Mark All Read and Clear All buttons", () => {
    render(<BibleScreen />);

    expect(screen.getByText("Mark All Read")).toBeTruthy();
    expect(screen.getByText("Clear All")).toBeTruthy();
  });

  it("shows Previous and Next navigation", () => {
    render(<BibleScreen />);

    expect(screen.getByText("Previous")).toBeTruthy();
    expect(screen.getByText("Next")).toBeTruthy();
  });
});
