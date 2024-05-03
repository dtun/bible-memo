import type { BibleTranslation } from "@/types";

export const baseUrl = "https://api.scripture.api.bible/v1";

const sharedConfig = {
  headers: {
    "Content-Type": "application/json",
    "api-key": `${process.env.EXPO_PUBLIC_API_BIBLE_KEY}`,
  },
};

async function getBibles(): Promise<BibleTranslation[]> {
  const response = await fetch(`${baseUrl}/bibles`, {
    ...sharedConfig,
    method: "GET",
  });
  const { data } = await response.json();

  return data;
}

async function getBible(id: string): Promise<BibleTranslation> {
  const response = await fetch(`${baseUrl}/bibles/${id}`, {
    ...sharedConfig,
    method: "GET",
  });
  const { data } = await response.json();

  return data;
}

export { getBibles, getBible };
