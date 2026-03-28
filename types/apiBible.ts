export type ApiBibleVerse = {
  id: string;
  orgId: string;
  bookId: string;
  chapterId: string;
  bibleId: string;
  reference: string;
  content: string;
};

export type ApiBibleVersesResponse = {
  data: ApiBibleVerse[];
  meta: { fums: string; fumsId: string; fumsJsInclude: string; fumsJs: string; fumsNo498Script: string };
};
