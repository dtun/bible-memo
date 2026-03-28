import { useState, useEffect, useRef, useCallback } from "react";
import { useRow, useStore } from "tinybase/ui-react";
import {
  CHAPTER_TEXT_TABLE,
  CHAPTER_VERSES_CELL,
  CHAPTER_BIBLE_ID_CELL,
  CHAPTER_CACHED_AT_CELL,
} from "@/constants/TinyBase";
import { getChapterId } from "@/constants/ApiBibleMapping";
import { fetchChapter, parseChapterContent, DEFAULT_BIBLE_ID } from "@/utils/apiBible";

export type VerseText = {
  verse: number;
  text: string;
};

let SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getCacheKey(bookName: string, chapter: number, bibleId: string) {
  return `${bibleId}-${bookName}-${chapter}`;
}

export function useChapterText(
  bookName: string,
  chapter: number,
  bibleId: string = DEFAULT_BIBLE_ID
): { verses: VerseText[]; isLoading: boolean; error: string | null } {
  let store = useStore();
  let cacheKey = getCacheKey(bookName, chapter, bibleId);
  let cachedRow = useRow(CHAPTER_TEXT_TABLE, cacheKey);
  let [fetchState, setFetchState] = useState<{
    status: "idle" | "loading" | "done" | "error";
    error: string | null;
    cacheKey: string;
  }>({ status: "idle", error: null, cacheKey });
  let fetchedRef = useRef<string | null>(null);

  let cachedVerses = cachedRow?.[CHAPTER_VERSES_CELL] as string | undefined;
  let cachedAt = cachedRow?.[CHAPTER_CACHED_AT_CELL] as number | undefined;
  let isStale = !cachedAt || Date.now() - cachedAt > SEVEN_DAYS_MS;
  let hasCachedData = !!cachedVerses;

  // Reset fetch state when cacheKey changes
  if (fetchState.cacheKey !== cacheKey) {
    setFetchState({ status: "idle", error: null, cacheKey });
  }

  useEffect(() => {
    if (fetchedRef.current !== cacheKey) {
      fetchedRef.current = null;
    }

    if (hasCachedData && !isStale) {
      return;
    }

    if (fetchedRef.current === cacheKey) {
      return;
    }

    let cancelled = false;

    async function doFetch() {
      if (!store) return;

      try {
        let chapterId = getChapterId(bookName, chapter);
        let chapterData = await fetchChapter(chapterId, bibleId);
        let verses: VerseText[] = parseChapterContent(chapterData.content);

        if (!cancelled) {
          store.setRow(CHAPTER_TEXT_TABLE, cacheKey, {
            [CHAPTER_VERSES_CELL]: JSON.stringify(verses),
            [CHAPTER_BIBLE_ID_CELL]: bibleId,
            [CHAPTER_CACHED_AT_CELL]: Date.now(),
          });
          fetchedRef.current = cacheKey;
          setFetchState({ status: "done", error: null, cacheKey });
        }
      } catch (err) {
        if (!cancelled) {
          setFetchState({
            status: "error",
            error:
              err instanceof Error ? err.message : "Failed to fetch verses",
            cacheKey,
          });
        }
      }
    }

    setFetchState({ status: "loading", error: null, cacheKey });
    doFetch();

    return () => {
      cancelled = true;
    };
  }, [bookName, chapter, bibleId, cacheKey, store, hasCachedData, isStale]);

  let verses: VerseText[] = cachedVerses ? JSON.parse(cachedVerses) : [];

  let isLoading =
    fetchState.cacheKey === cacheKey && fetchState.status === "loading";

  let error =
    fetchState.cacheKey === cacheKey &&
    fetchState.status === "error" &&
    !hasCachedData
      ? fetchState.error
      : null;

  return { verses, isLoading, error };
}
