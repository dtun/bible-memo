import {
  BibleBook,
  NTBookKey,
  nTBookKeys,
  nTBooks,
  OTBookKey,
  oTBookKeys,
  oTBooks,
} from "./Books";

// TODO: rm Partial when bible is complete
let bible: Partial<Record<OTBookKey | NTBookKey, BibleBook>> = {
  [oTBookKeys.GENESIS]: {
    name: oTBooks.GENESIS,
    chapters: 50,
    verses: [
      31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33,
      38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43,
      36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26,
    ],
  },
  [oTBookKeys.EXODUS]: {
    name: oTBooks.EXODUS,
    chapters: 40,
    verses: [
      22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27,
      25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38,
      29, 31, 43, 38,
    ],
  },
  [oTBookKeys.LEVITICUS]: {
    name: oTBooks.LEVITICUS,
    chapters: 27,
    verses: [
      19, 27, 26, 35, 27, 19, 31, 38, 20, 41, 37, 37, 21, 21, 26, 20, 37, 20,
      30,
    ],
  },
  [oTBookKeys.NUMBERS]: {
    name: oTBooks.NUMBERS,
    chapters: 36,
    verses: [
      54, 34, 28, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 32, 44, 31,
      19, 32, 29, 31, 34, 21, 30,
    ],
  },
  [oTBookKeys.DEUTERONOMY]: {
    name: oTBooks.DEUTERONOMY,
    chapters: 34,
    verses: [
      18, 26, 22, 31, 31, 15, 38, 33, 21, 40, 47, 37, 21, 28, 37, 16, 33, 24,
      41, 30, 24, 34, 17,
    ],
  },
  [oTBookKeys.JOSHUA]: {
    name: oTBooks.JOSHUA,
    chapters: 24,
    verses: [
      22, 13, 26, 21, 27, 30, 21, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12,
    ],
  },
  [oTBookKeys.JUDGES]: {
    name: oTBooks.JUDGES,
    chapters: 21,
    verses: [
      36, 23, 18, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 46,
    ],
  },
  [oTBookKeys.RUTH]: {
    name: oTBooks.RUTH,
    chapters: 4,
    verses: [22, 26, 6, 30],
  },
  [oTBookKeys.SAMUEL_1]: {
    name: oTBooks.SAMUEL_1,
    chapters: 31,
    verses: [
      28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 8, 63, 24, 32, 18, 18,
      22, 13, 19, 14, 25, 24, 20, 24, 21, 28, 36, 33, 16, 33, 24,
    ],
  },
  [oTBookKeys.SAMUEL_2]: {
    name: oTBooks.SAMUEL_2,
    chapters: 24,
    verses: [
      31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6,
      17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9,
    ],
  },
  [oTBookKeys.KINGS_1]: {
    name: oTBooks.KINGS_1,
    chapters: 22,
    verses: [
      19, 29, 36, 21, 5, 20, 32, 33, 36, 22, 26, 20, 18, 12, 29, 23, 25, 22, 21,
      21,
    ],
  },
  [oTBookKeys.KINGS_2]: {
    name: oTBooks.KINGS_2,
    chapters: 25,
    verses: [
      22, 25, 19, 14, 19, 28, 33, 37, 27, 33, 34, 18, 38, 39, 36, 23, 29, 23,
      25, 22, 21, 21, 21, 27, 23, 15, 18, 14, 30, 25, 40, 22, 33, 37, 20, 41,
      30, 36, 23, 18,
    ],
  },
  [oTBookKeys.CHRONICLES_1]: {
    name: oTBooks.CHRONICLES_1,
    chapters: 29,
    verses: [
      50, 15, 23, 23, 19, 11, 11, 18, 10, 13, 30, 5, 28, 7, 35, 36, 5, 24, 20,
      28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 19, 13, 14, 6, 17, 7, 18,
      52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 43, 13,
    ],
  },
  [oTBookKeys.CHRONICLES_2]: {
    name: oTBooks.CHRONICLES_2,
    chapters: 36,
    verses: [
      54, 25, 26, 37, 38, 31, 12, 46, 20, 58, 13, 16, 8, 19, 13, 14, 6, 18, 18,
      31, 60, 13, 37, 56, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23,
      41, 30, 35, 27, 39, 21, 43, 38, 33,
    ],
  },
  [nTBookKeys.MATTHEW]: {
    name: nTBooks.MATTHEW,
    chapters: 28,
    verses: [
      22, 22, 31, 19, 18, 14, 24, 21, 32, 33, 24, 24, 20, 24, 22, 22, 29, 32,
      33, 38, 38, 24, 20, 30, 40, 37, 46, 22, 51, 39, 25,
    ],
  },
  [nTBookKeys.MARK]: {
    name: nTBooks.MARK,
    chapters: 16,
    verses: [45, 28, 34, 28, 20, 40, 21, 31, 38, 36, 20, 47, 8, 59, 57, 33],
  },
  [nTBookKeys.LUKE]: {
    name: nTBooks.LUKE,
    chapters: 24,
    verses: [
      46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22,
      21, 20, 23, 30, 25, 22, 19, 19, 26, 69, 29, 20, 30,
    ],
  },
  [nTBookKeys.JOHN]: {
    name: nTBooks.JOHN,
    chapters: 21,
    verses: [
      51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40,
      58, 24, 67, 34, 35, 46, 22,
    ],
  },
} as const;

export { bible };
