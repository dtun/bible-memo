import type { ApiBibleVerse, ApiBibleVersesResponse } from "@/types/apiBible";

export let API_BIBLE_BASE_URL = "https://api.scripture.api.bible/v1";

// KJV bible ID on API.Bible
export let DEFAULT_BIBLE_ID = "de4e12af7f28f599-02";

export async function fetchChapterVerses(
  chapterId: string,
  bibleId: string = DEFAULT_BIBLE_ID
): Promise<ApiBibleVerse[]> {
  let url = `${API_BIBLE_BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/verses?content-type=text`;

  let response = await fetch(url, {
    headers: {
      "api-key": process.env.EXPO_PUBLIC_API_BIBLE_KEY ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(`API.Bible error: ${response.status}`);
  }

  let json: ApiBibleVersesResponse = await response.json();
  return json.data;
}
