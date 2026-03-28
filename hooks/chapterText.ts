import { useState, useEffect, useRef } from "react";
import { useRow, useStore } from "tinybase/ui-react";
import {
  CHAPTER_TEXT_TABLE,
  CHAPTER_VERSES_CELL,
  CHAPTER_BIBLE_ID_CELL,
  CHAPTER_CACHED_AT_CELL,
} from "@/constants/TinyBase";
import { getChapterId } from "@/constants/ApiBibleMapping";
import { fetchChapterVerses, DEFAULT_BIBLE_ID } from "@/utils/apiBible";

export type VerseText = {
  verse: number;
  text: string;
};

let SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getCacheKey(bookName: string, chapter: number, bibleId: string) {
  return `${bibleId}-${bookName}-${chapter}`;
}

function parseVerseNumber(verseId: string): number {
  let parts = verseId.split(".");
  return parseInt(parts[parts.length - 1], 10);
}

export function useChapterText(
  bookName: string,
  chapter: number,
  bibleId: string = DEFAULT_BIBLE_ID
): { verses: VerseText[]; isLoading: boolean; error: string | null } {
  let store = useStore();
  let cacheKey = getCacheKey(bookName, chapter, bibleId);
  let cachedRow = useRow(CHAPTER_TEXT_TABLE, cacheKey);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState<string | null>(null);
  let fetchedRef = useRef<string | null>(null);

  let cachedVerses = cachedRow?.[CHAPTER_VERSES_CELL] as string | undefined;
  let cachedAt = cachedRow?.[CHAPTER_CACHED_AT_CELL] as number | undefined;
  let isStale = !cachedAt || Date.now() - cachedAt > SEVEN_DAYS_MS;
  let hasCachedData = !!cachedVerses;

  useEffect(() => {
    // Reset when chapter changes
    if (fetchedRef.current !== cacheKey) {
      fetchedRef.current = null;
    }

    // Serve from cache if fresh
    if (hasCachedData && !isStale) {
      setIsLoading(false);
      setError(null);
      return;
    }

    // Already fetched this chapter in this mount
    if (fetchedRef.current === cacheKey) {
      return;
    }

    let cancelled = false;

    async function doFetch() {
      // If we have stale cached data, don't show loading
      if (!hasCachedData) {
        setIsLoading(true);
      }
      setError(null);

      try {
        let chapterId = getChapterId(bookName, chapter);
        let apiVerses = await fetchChapterVerses(chapterId, bibleId);

        let verses: VerseText[] = apiVerses.map((v) => ({
          verse: parseVerseNumber(v.id),
          text: v.content,
        }));

        if (!cancelled && store) {
          store.setRow(CHAPTER_TEXT_TABLE, cacheKey, {
            [CHAPTER_VERSES_CELL]: JSON.stringify(verses),
            [CHAPTER_BIBLE_ID_CELL]: bibleId,
            [CHAPTER_CACHED_AT_CELL]: Date.now(),
          });
          fetchedRef.current = cacheKey;
        }
      } catch (err) {
        if (!cancelled) {
          if (!hasCachedData) {
            setError(
              err instanceof Error ? err.message : "Failed to fetch verses"
            );
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    doFetch();

    return () => {
      cancelled = true;
    };
  }, [bookName, chapter, bibleId, cacheKey, store, hasCachedData, isStale]);

  let verses: VerseText[] = cachedVerses
    ? JSON.parse(cachedVerses)
    : [];

  return { verses, isLoading, error };
}
