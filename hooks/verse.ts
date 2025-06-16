import { useRow, useRowIds, useStore, useTable } from "tinybase/ui-react";
import { useMemo, useCallback } from "react";
import {
  VERSE_READS_TABLE,
  BOOK_CELL,
  CHAPTER_CELL,
  VERSE_CELL,
  READ_STATUS_CELL,
  TIMESTAMP_CELL,
  PLAN_ID_CELL,
} from "@/constants/TinyBase";
import { createVerseId } from "@/utils/verse";

// Hook to check if a specific verse is read - more reactive approach
export function useIsVerseRead(
  book: string,
  chapter: number,
  verse: number,
  planId?: number
) {
  let store = useStore();
  let verseId = createVerseId(book, chapter, verse);
  let row = useRow(VERSE_READS_TABLE, verseId);
  let currentYear = new Date().getFullYear();
  let targetPlanId = planId ?? currentYear;

  // Force re-computation when book/chapter changes
  return useMemo(() => {
    if (!store) return false;
    let currentRow = store.getRow(VERSE_READS_TABLE, verseId);
    return Boolean(
      currentRow?.[READ_STATUS_CELL] &&
        currentRow?.[PLAN_ID_CELL] === targetPlanId
    );
  }, [store, verseId, row, book, chapter, targetPlanId]);
}

// Hook to toggle a verse's read status - simplified approach
export function useToggleVerse(book: string, chapter: number, planId?: number) {
  let store = useStore();
  let currentYear = new Date().getFullYear();
  let targetPlanId = planId ?? currentYear;

  return useCallback(
    (verse: number) => {
      if (!store) return;

      let verseId = createVerseId(book, chapter, verse);
      let currentRow = store.getRow(VERSE_READS_TABLE, verseId);
      let currentStatus = Boolean(
        currentRow?.[READ_STATUS_CELL] &&
          currentRow?.[PLAN_ID_CELL] === targetPlanId
      );

      store.setRow(VERSE_READS_TABLE, verseId, {
        [BOOK_CELL]: book,
        [CHAPTER_CELL]: chapter,
        [VERSE_CELL]: verse,
        [READ_STATUS_CELL]: !currentStatus,
        [TIMESTAMP_CELL]: Date.now(),
        [PLAN_ID_CELL]: targetPlanId,
      });
    },
    [store, book, chapter, targetPlanId]
  );
}

// Hook to get all read verses for a specific chapter - using table subscription
export function useChapterReadVerses(
  book: string,
  chapter: number,
  planId?: number
): Set<number> {
  // Subscribe to the entire table to catch all changes
  let table = useTable(VERSE_READS_TABLE);
  let currentYear = new Date().getFullYear();
  let targetPlanId = planId ?? currentYear;

  return useMemo(() => {
    let readVerses = new Set<number>();

    Object.entries(table).forEach(([rowId, row]) => {
      if (
        row &&
        row[BOOK_CELL] === book &&
        row[CHAPTER_CELL] === chapter &&
        row[READ_STATUS_CELL] === true &&
        row[PLAN_ID_CELL] === targetPlanId &&
        typeof row[VERSE_CELL] === "number"
      ) {
        readVerses.add(row[VERSE_CELL]);
      }
    });

    return readVerses;
  }, [table, book, chapter, targetPlanId]);
}

// Hook to get chapter progress statistics
export function useChapterProgress(
  book: string,
  chapter: number,
  totalVerses: number,
  planId?: number
) {
  let readVerses = useChapterReadVerses(book, chapter, planId);

  return useMemo(() => {
    let readCount = readVerses.size;
    let progressPercentage =
      totalVerses > 0 ? Math.round((readCount / totalVerses) * 100) : 0;

    return {
      readVerses,
      readCount,
      totalVerses,
      progressPercentage,
    };
  }, [readVerses, totalVerses]);
}

// Hook to mark all verses in a chapter as read
export function useMarkAllChapterRead(
  book: string,
  chapter: number,
  totalVerses: number,
  planId?: number
) {
  let store = useStore();
  let currentYear = new Date().getFullYear();
  let targetPlanId = planId ?? currentYear;

  return useCallback(() => {
    if (!store) return;

    for (let verse = 1; verse <= totalVerses; verse++) {
      let verseId = createVerseId(book, chapter, verse);
      store.setRow(VERSE_READS_TABLE, verseId, {
        [BOOK_CELL]: book,
        [CHAPTER_CELL]: chapter,
        [VERSE_CELL]: verse,
        [READ_STATUS_CELL]: true,
        [TIMESTAMP_CELL]: Date.now(),
        [PLAN_ID_CELL]: targetPlanId,
      });
    }
  }, [store, book, chapter, totalVerses, targetPlanId]);
}

// Hook to clear all read verses in a chapter
export function useClearChapterRead(
  book: string,
  chapter: number,
  planId?: number
) {
  let store = useStore();
  let rowIds = useRowIds(VERSE_READS_TABLE);
  let currentYear = new Date().getFullYear();
  let targetPlanId = planId ?? currentYear;

  return useCallback(() => {
    if (!store) return;

    rowIds.forEach((rowId) => {
      let row = store.getRow(VERSE_READS_TABLE, rowId);
      if (
        row &&
        row[BOOK_CELL] === book &&
        row[CHAPTER_CELL] === chapter &&
        row[PLAN_ID_CELL] === targetPlanId
      ) {
        store.delRow(VERSE_READS_TABLE, rowId);
      }
    });
  }, [store, rowIds, book, chapter, targetPlanId]);
}
