// Static mapping from app's internal book names (constants/Books.ts) to API.Bible USFM IDs
export let bookNameToApiId: Record<string, string> = {
  // Old Testament
  genesis: "GEN",
  exodus: "EXO",
  leviticus: "LEV",
  numbers: "NUM",
  deuteronomy: "DEU",
  joshua: "JOS",
  judges: "JDG",
  ruth: "RUT",
  "1 samuel": "1SA",
  "2 samuel": "2SA",
  "1 kings": "1KI",
  "2 kings": "2KI",
  "1 chronicles": "1CH",
  "2 chronicles": "2CH",
  ezra: "EZR",
  nehemiah: "NEH",
  esther: "EST",
  job: "JOB",
  psalms: "PSA",
  proverbs: "PRO",
  ecclesiastes: "ECC",
  "song of songs": "SNG",
  isaiah: "ISA",
  jeremiah: "JER",
  lamentations: "LAM",
  ezekiel: "EZK",
  daniel: "DAN",
  hosea: "HOS",
  joel: "JOL",
  amos: "AMO",
  obadiah: "OBA",
  jonah: "JON",
  micah: "MIC",
  nahum: "NAM",
  habakkuk: "HAB",
  zephaniah: "ZEP",
  haggai: "HAG",
  zechariah: "ZEC",
  malachi: "MAL",
  // New Testament
  matthew: "MAT",
  mark: "MRK",
  luke: "LUK",
  john: "JHN",
  acts: "ACT",
  romans: "ROM",
  "1 corinthians": "1CO",
  "2 corinthians": "2CO",
  galatians: "GAL",
  ephesians: "EPH",
  philippians: "PHP",
  colossians: "COL",
  "1 thessalonians": "1TH",
  "2 thessalonians": "2TH",
  "timothy 1": "1TI",
  "timothy 2": "2TI",
  titus: "TIT",
  philemon: "PHM",
  hebrews: "HEB",
  james: "JAS",
  "1 peter": "1PE",
  "2 peter": "2PE",
  "john 1": "1JN",
  "john 2": "2JN",
  "john 3": "3JN",
  jude: "JUD",
  revelation: "REV",
};

// Reverse mapping: API.Bible ID → app book name
export let apiIdToBookName: Record<string, string> = Object.fromEntries(
  Object.entries(bookNameToApiId).map(([name, id]) => [id, name])
);

export function getChapterId(bookName: string, chapter: number): string {
  return `${bookNameToApiId[bookName]}.${chapter}`;
}

export function getVerseId(
  bookName: string,
  chapter: number,
  verse: number
): string {
  return `${bookNameToApiId[bookName]}.${chapter}.${verse}`;
}
