export type ApiBibleChapter = {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
  content: string;
  verseCount: number;
};

export type ApiBibleChapterResponse = {
  data: ApiBibleChapter;
  meta: { fums: string; fumsId: string; fumsJsInclude: string; fumsJs: string; fumsNoScript: string };
};
