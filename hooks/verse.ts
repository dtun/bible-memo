import { useRow, useRowIds, useStore, useTable } from "tinybase/ui-react";
import { useMemo, useCallback } from "react";
import {
  VERSE_READS_TABLE,
  BOOK_CELL,
  CHAPTER_CELL,
  VERSE_CELL,
  READ_STATUS_CELL,
  TIMESTAMP_CELL,
} from "@/constants/TinyBase";
import { createVerseId } from "@/utils/verse";

// Hook to check if a specific verse is read - more reactive approach
export function useIsVerseRead(book: string, chapter: number, verse: number) {
  let store = useStore();
  let verseId = createVerseId(book, chapter, verse);
  let row = useRow(VERSE_READS_TABLE, verseId);

  // Force re-computation when book/chapter changes
  return useMemo(() => {
    if (!store) return false;
    let currentRow = store.getRow(VERSE_READS_TABLE, verseId);
    return Boolean(currentRow?.[READ_STATUS_CELL]);
  }, [store, verseId, row, book, chapter]);
}

// Hook to toggle a verse's read status - simplified approach
export function useToggleVerse(book: string, chapter: number) {
  let store = useStore();

  return useCallback(
    (verse: number) => {
      if (!store) return;

      let verseId = createVerseId(book, chapter, verse);
      let currentRow = store.getRow(VERSE_READS_TABLE, verseId);
      let currentStatus = Boolean(currentRow?.[READ_STATUS_CELL]);

      store.setRow(VERSE_READS_TABLE, verseId, {
        [BOOK_CELL]: book,
        [CHAPTER_CELL]: chapter,
        [VERSE_CELL]: verse,
        [READ_STATUS_CELL]: !currentStatus,
        [TIMESTAMP_CELL]: Date.now(),
      });
    },
    [store, book, chapter]
  );
}

// Hook to get all read verses for a specific chapter - using table subscription
export function useChapterReadVerses(
  book: string,
  chapter: number
): Set<number> {
  // Subscribe to the entire table to catch all changes
  let table = useTable(VERSE_READS_TABLE);

  return useMemo(() => {
    let readVerses = new Set<number>();

    Object.entries(table).forEach(([rowId, row]) => {
      if (
        row &&
        row[BOOK_CELL] === book &&
        row[CHAPTER_CELL] === chapter &&
        row[READ_STATUS_CELL] === true
      ) {
        readVerses.add(row[VERSE_CELL] as number);
      }
    });

    return readVerses;
  }, [table, book, chapter]);
}

// Hook to get chapter progress statistics
export function useChapterProgress(
  book: string,
  chapter: number,
  totalVerses: number
) {
  let readVerses = useChapterReadVerses(book, chapter);

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
  totalVerses: number
) {
  let store = useStore();

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
      });
    }
  }, [store, book, chapter, totalVerses]);
}

// Hook to clear all read verses in a chapter
export function useClearChapterRead(book: string, chapter: number) {
  let store = useStore();
  let rowIds = useRowIds(VERSE_READS_TABLE);

  return useCallback(() => {
    if (!store) return;

    rowIds.forEach((rowId) => {
      let row = store.getRow(VERSE_READS_TABLE, rowId);
      if (row && row[BOOK_CELL] === book && row[CHAPTER_CELL] === chapter) {
        store.delRow(VERSE_READS_TABLE, rowId);
      }
    });
  }, [store, rowIds, book, chapter]);
}
