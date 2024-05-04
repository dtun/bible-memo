import { http, HttpResponse } from "msw";

import { BASE_URL } from "@/api/bible";
import {
  bibleTranslations,
  bibleTranslationBuilder,
} from "@/builders/bibleTranslation";

let handlers = [
  http.get(`${BASE_URL}/bibles`, () => {
    return HttpResponse.json({ data: bibleTranslations });
  }),
  http.get(`${BASE_URL}/bibles/:id`, () => {
    return HttpResponse.json({ data: bibleTranslationBuilder });
  }),
];

export { handlers };
