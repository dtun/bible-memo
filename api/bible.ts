import type { BibleTranslation } from "@/types";

const BASE_URL = "https://api.scripture.api.bible/v1";

let sharedConfig = {
  headers: {
    "Content-Type": "application/json",
    "api-key": `${process.env.EXPO_PUBLIC_API_BIBLE_KEY}`,
  },
};

async function getBibles(): Promise<BibleTranslation[]> {
  let response = await fetch(`${BASE_URL}/bibles`, {
    ...sharedConfig,
    method: "GET",
  });
  let { data } = await response.json();

  return data;
}

async function getBible(id: string): Promise<BibleTranslation> {
  let response = await fetch(`${BASE_URL}/bibles/${id}`, {
    ...sharedConfig,
    method: "GET",
  });
  let { data } = await response.json();

  return data;
}

export { BASE_URL, getBibles, getBible };
