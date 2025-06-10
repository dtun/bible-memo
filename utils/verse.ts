// Helper function to generate consistent verse IDs
export function createVerseId(book: string, chapter: number, verse: number) {
  return `${book}-${chapter}-${verse}`;
}

// Helper function to parse verse ID back to components
export function parseVerseId(verseId: string) {
  let parts = verseId.split("-");
  if (parts.length < 3) return null;

  let verse = parseInt(parts.pop()!, 10);
  let chapter = parseInt(parts.pop()!, 10);
  let book = parts.join("-"); // In case book name contains hyphens

  return { book, chapter, verse };
}
