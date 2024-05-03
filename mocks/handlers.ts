import { http, HttpResponse } from "msw";

import { baseUrl } from "@/api/bible";
import {
  bibleTranslations,
  bibleTranslationBuilder,
} from "@/builders/bibleTranslation";

export const handlers = [
  http.get(`${baseUrl}/bibles`, () => {
    return HttpResponse.json({ data: bibleTranslations });
  }),
  http.get(`${baseUrl}/bibles/:id`, () => {
    return HttpResponse.json({ data: bibleTranslationBuilder });
  }),
];
