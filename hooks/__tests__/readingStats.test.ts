import { renderHook } from "@testing-library/react-native";
import * as tinybase from "tinybase";
import {
  BOOK_CELL,
  CHAPTER_CELL,
  PLAN_ID_CELL,
  READ_STATUS_CELL,
  TIMESTAMP_CELL,
  VERSE_CELL,
  VERSE_READS_TABLE,
} from "@/constants/TinyBase";
import { useReadingStats } from "@/hooks/verse";

let resetMockData = (tinybase as unknown as { __resetMockData: () => void })
  .__resetMockData;
let store = tinybase.createStore();
let planId = new Date().getFullYear();

function seed(
  id: string,
  book: string,
  chapter: number,
  verse: number,
  opts: { read?: boolean; timestamp?: number; planId?: number } = {}
) {
  store.setRow(VERSE_READS_TABLE, id, {
    [BOOK_CELL]: book,
    [CHAPTER_CELL]: chapter,
    [VERSE_CELL]: verse,
    [READ_STATUS_CELL]: opts.read ?? true,
    [TIMESTAMP_CELL]: opts.timestamp ?? 0,
    [PLAN_ID_CELL]: opts.planId ?? planId,
  });
}

describe("useReadingStats", () => {
  beforeEach(() => resetMockData());

  it("returns zeros when nothing has been read", () => {
    let { result } = renderHook(() => useReadingStats());

    expect(result.current.versesRead).toBe(0);
    expect(result.current.booksStarted).toBe(0);
    expect(result.current.lastRead).toBeNull();
  });

  it("counts read verses and distinct books for the current plan", () => {
    seed("genesis-1-1", "genesis", 1, 1);
    seed("genesis-1-2", "genesis", 1, 2);
    seed("john-3-16", "john", 3, 16);

    let { result } = renderHook(() => useReadingStats());

    expect(result.current.versesRead).toBe(3);
    expect(result.current.booksStarted).toBe(2);
  });

  it("ignores unread verses and verses from other plans", () => {
    seed("genesis-1-1", "genesis", 1, 1, { read: false });
    seed("genesis-1-2", "genesis", 1, 2, { planId: planId - 1 });
    seed("genesis-1-3", "genesis", 1, 3);

    let { result } = renderHook(() => useReadingStats());

    expect(result.current.versesRead).toBe(1);
    expect(result.current.booksStarted).toBe(1);
  });

  it("reports the most recently read verse", () => {
    seed("genesis-1-1", "genesis", 1, 1, { timestamp: 100 });
    seed("john-3-16", "john", 3, 16, { timestamp: 500 });
    seed("psalms-23-1", "psalms", 23, 1, { timestamp: 300 });

    let { result } = renderHook(() => useReadingStats());

    expect(result.current.lastRead).toMatchObject({
      book: "john",
      chapter: 3,
      verse: 16,
    });
  });
});
