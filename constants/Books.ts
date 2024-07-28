// ot
const GENESIS = "genesis";
const EXODUS = "exodus";
const LEVITICUS = "leviticus";
const NUMBERS = "numbers";
const DEUTERONOMY = "deuteronomy";
const JOSHUA = "joshua";
const JUDGES = "judges";
const RUTH = "ruth";
const SAMUEL_1 = "1 samuel";
const SAMUEL_2 = "2 samuel";
const KINGS_1 = "1 kings";
const KINGS_2 = "2 kings";
const CHRONICLES_1 = "1 chronicles";
const CHRONICLES_2 = "2 chronicles";
const EZRA = "ezra";
const NEHEMIAH = "nehemiah";
const ESTHER = "esther";
const JOB = "job";
const PSALMS = "psalms";
const PROVERBS = "proverbs";
const ECCLESIASTES = "ecclesiastes";
const SONG_OF_SONGS = "song of songs";
const ISAIAH = "isaiah";
const JEREMIAH = "jeremiah";
const LAMENTATIONS = "lamentations";
const EZEKIEL = "ezekiel";
const DANIEL = "daniel";
const HOSEA = "hosea";
const JOEL = "joel";
const AMOS = "amos";
const OBADIAH = "obadiah";
const JONAH = "jonah";
const MICAH = "micah";
const NAHUM = "nahum";
const HABAKKUK = "habakkuk";
const ZEPHANIAH = "zephaniah";
const HAGGAI = "haggai";
const ZECHARIAH = "zechariah";
const MALACHI = "malachi";
// nt
const MATTHEW = "matthew";
const MARK = "mark";
const LUKE = "luke";
const JOHN = "john";
const ACTS = "acts";
const ROMANS = "romans";
const CORINTHIANS_1 = "1 corinthians";
const CORINTHIANS_2 = "2 corinthians";
const GALATIANS = "galatians";
const EPHESIANS = "ephesians";
const PHILIPPIANS = "philippians";
const COLOSSIANS = "colossians";
const THESSALONIANS_1 = "1 thessalonians";
const THESSALONIANS_2 = "2 thessalonians";
const TIMOTHY_1 = "timothy 1";
const TIMOTHY_2 = "timothy 2";
const TITUS = "titus";
const PHILEMON = "philemon";
const HEBREWS = "hebrews";
const JAMES = "james";
const PETER_1 = "1 peter";
const PETER_2 = "2 peter";
const JOHN_1 = "john 1";
const JOHN_2 = "john 2";
const JOHN_3 = "john 3";
const JUDE = "jude";
const REVELATION = "revelation";

let books = [
  {
    GENESIS,
    EXODUS,
    LEVITICUS,
    NUMBERS,
    DEUTERONOMY,
    JOSHUA,
    JUDGES,
    RUTH,
    SAMUEL_1,
    SAMUEL_2,
    KINGS_1,
    KINGS_2,
    CHRONICLES_1,
    CHRONICLES_2,
    EZRA,
    NEHEMIAH,
    ESTHER,
    JOB,
    PSALMS,
    PROVERBS,
    ECCLESIASTES,
    SONG_OF_SONGS,
    ISAIAH,
    JEREMIAH,
    LAMENTATIONS,
    EZEKIEL,
    DANIEL,
    HOSEA,
    JOEL,
    AMOS,
    OBADIAH,
    JONAH,
    MICAH,
    NAHUM,
    HABAKKUK,
    ZEPHANIAH,
    HAGGAI,
    ZECHARIAH,
    MALACHI,
  },
  {
    MATTHEW,
    MARK,
    LUKE,
    JOHN,
    ACTS,
    ROMANS,
    CORINTHIANS_1,
    CORINTHIANS_2,
    GALATIANS,
    EPHESIANS,
    PHILIPPIANS,
    COLOSSIANS,
    THESSALONIANS_1,
    THESSALONIANS_2,
    TIMOTHY_1,
    TIMOTHY_2,
    TITUS,
    PHILEMON,
    HEBREWS,
    JAMES,
    PETER_1,
    PETER_2,
    JOHN_1,
    JOHN_2,
    JOHN_3,
    JUDE,
    REVELATION,
  },
] as const;

let [oTBooks, nTBooks] = books;

let oTBookKeys = Object.entries(oTBooks).reduce((acc, [key, value]) => {
  acc[key as OTBooks] = value as OTBooks;
  return acc;
}, {} as Record<OTBooks, OTBooks>);

let nTBookKeys = Object.entries(nTBooks).reduce((acc, [key, value]) => {
  acc[key as NTBooks] = value as NTBooks;
  return acc;
}, {} as Record<NTBooks, NTBooks>);

type OTBooks = keyof typeof oTBooks;
type NTBooks = keyof typeof nTBooks;
type BibleBooks = OTBooks | NTBooks;
type OTBookName = (typeof oTBooks)[keyof typeof oTBooks];
type NTBookName = (typeof nTBooks)[keyof typeof nTBooks];
type OTBookKey = keyof typeof oTBookKeys;
type NTBookKey = keyof typeof nTBookKeys;
type BibleBook = {
  name: OTBookName | NTBookName;
  chapters: number;
  verses: number[];
};

export {
  BibleBook,
  BibleBooks,
  books,
  NTBookKey,
  NTBookName,
  NTBooks,
  nTBookKeys,
  nTBooks,
  OTBooks,
  OTBookKey,
  OTBookName,
  oTBookKeys,
  oTBooks,
};
