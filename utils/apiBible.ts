import type { ApiBibleChapter, ApiBibleChapterResponse } from "@/types/apiBible";

export let API_BIBLE_BASE_URL = "https://api.scripture.api.bible/v1";

// KJV bible ID on API.Bible
export let DEFAULT_BIBLE_ID = "de4e12af7f28f599-02";

export async function fetchChapter(
  chapterId: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<ApiBibleChapter> {
  let url = `${API_BIBLE_BASE_URL}/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-verse-numbers=true`;

  let response = await fetch(url, {
    headers: {
      "api-key": process.env.EXPO_PUBLIC_API_BIBLE_KEY ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(`API.Bible error: ${response.status}`);
  }

  let json: ApiBibleChapterResponse = await response.json();
  return json.data;
}

export function parseChapterContent(
  content: string
): { verse: number; text: string }[] {
  if (!content) return [];

  let parts = content.split(/\[(\d+)\]/);
  // parts alternates: [preamble, "1", text, "2", text, ...]
  let verses: { verse: number; text: string }[] = [];

  for (let i = 1; i < parts.length; i += 2) {
    let verseNum = parseInt(parts[i], 10);
    let text = (parts[i + 1] || "")
      .replace(/¶/g, "")
      .replace(/\n/g, " ")
      .trim();
    verses.push({ verse: verseNum, text });
  }

  return verses;
}
