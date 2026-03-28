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

describe("BibleScreen", () => {
  beforeEach(() => {
    jest.useRealTimers();
    setupMockApi();
  });

  afterEach(() => {
    jest.useFakeTimers();
  });

  it("defaults to grid view mode", () => {
    render(<BibleScreen />);

    expect(screen.getByText("Grid")).toBeTruthy();
    expect(screen.getByText("Text")).toBeTruthy();
    // Grid content should be visible (verse squares)
    expect(screen.getByText("Tap verses to mark as read")).toBeTruthy();
  });

  it("switches to text view when Text toggle is pressed", async () => {
    render(<BibleScreen />);

    fireEvent.press(screen.getByText("Text"));

    await waitFor(() => {
      expect(screen.getByText("Loading verses...")).toBeTruthy();
    });
  });

  it("shows verse text in text mode after loading", async () => {
    render(<BibleScreen />);

    fireEvent.press(screen.getByText("Text"));

    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });
  });

  it("switches back to grid view when Grid toggle is pressed", async () => {
    render(<BibleScreen />);

    // Switch to text
    fireEvent.press(screen.getByText("Text"));
    await waitFor(() => {
      expect(
        screen.getByText(
          "In the beginning God created the heaven and the earth."
        )
      ).toBeTruthy();
    });

    // Switch back to grid
    fireEvent.press(screen.getByText("Grid"));
    expect(screen.getByText("Tap verses to mark as read")).toBeTruthy();
  });
});
