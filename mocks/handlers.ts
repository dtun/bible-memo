import { http, HttpResponse } from "msw";

import { BASE_URL } from "@/api/bible";
import {
  bibleTranslations,
  bibleTranslationBuilder,
} from "@/builders/bibleTranslation";
import { bibleBooks } from "@/builders/bibleBook";

let handlers = [
  http.get(`${BASE_URL}/bibles`, () => {
    return HttpResponse.json({ data: bibleTranslations[50] });
  }),
  http.get(`${BASE_URL}/bibles/:id`, () => {
    return HttpResponse.json({ data: bibleTranslationBuilder() });
  }),
  http.get(`${BASE_URL}/bibles/:id/books`, () => {
    return HttpResponse.json({ data: bibleBooks[50] });
  }),
];

export { handlers };
