const GENESIS = "genesis";
const EXODUS = "exodus";
const LEVITICUS = "leviticus";
const NUMBERS = "numbers";
const DEUTERONOMY = "deuteronomy";
const JOSHUA = "joshua";
const JUDGES = "judges";
const RUTH = "ruth";

let books = {
  GENESIS,
  EXODUS,
  LEVITICUS,
  NUMBERS,
  DEUTERONOMY,
  JOSHUA,
  JUDGES,
  RUTH,
} as const;

export { books };
