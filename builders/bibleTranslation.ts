import { build, perBuild, oneOf } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";
import { BibleTranslation } from "@/types";

export let bibleTranslationBuilder = build<BibleTranslation>({
  fields: {
    id: perBuild(faker.string.uuid),
    dblId: perBuild(faker.string.uuid),
    relatedDbl: null,
    name: perBuild(faker.lorem.word),
    nameLocal: perBuild(faker.lorem.word),
    abbreviation: perBuild(faker.lorem.word),
    abbreviationLocal: perBuild(faker.lorem.word),
    description: perBuild(faker.lorem.sentence),
    descriptionLocal: perBuild(faker.lorem.sentence),
    language: {
      id: perBuild(faker.string.uuid),
      name: perBuild(faker.lorem.word),
      nameLocal: perBuild(faker.lorem.word),
      script: perBuild(faker.lorem.word),
      scriptDirection: oneOf("LTR", "RTL"),
    },
    countries: [
      {
        id: perBuild(faker.string.uuid),
        name: perBuild(faker.lorem.word),
        nameLocal: perBuild(faker.lorem.word),
      },
    ],
    type: oneOf("text", "audio", "video"),
    updatedAt: perBuild(() => faker.date.recent().toString()),
    audioBibles: [],
  },
});

export let bibleTranslations = {
  50: [...new Array(50)].map(bibleTranslationBuilder),
};
