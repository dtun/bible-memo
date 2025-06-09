type BibleTranslation = {
  id: string;
  dblId: string;
  relatedDbl: string | null;
  name: string;
  nameLocal: string;
  abbreviation: string;
  abbreviationLocal: string;
  description: string;
  descriptionLocal: string;
  language: {
    id: string;
    name: string;
    nameLocal: string;
    script: string;
    scriptDirection: "LTR" | "RTL";
  };
  countries: Array<{
    id: string;
    name: string;
    nameLocal: string;
  }>;
  type: "text" | "audio" | "video"; // Assuming types can be one of these based on your example
  updatedAt: string;
  audioBibles: any[]; // Need specification to provide a better type
};

type BibleBook = {
  abbreviation: string;
  bibleId: string;
  id: string;
  name: string;
  nameLong: string;
};

// Verse reading tracking types
export interface VerseReadRecord {
  book: string;
  chapter: number;
  verse: number;
  readStatus: boolean;
  timestamp: number;
}

export interface ChapterProgress {
  readVerses: Set<number>;
  readCount: number;
  totalVerses: number;
  progressPercentage: number;
}

export { BibleTranslation, BibleBook };
