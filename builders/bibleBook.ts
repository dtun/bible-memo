import { build, perBuild } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";
import { BibleBook } from "@/types";

export let bibleBookBuilder = build<BibleBook>({
  fields: {
    id: perBuild(faker.string.uuid),
    name: perBuild(faker.lorem.word),
    nameLong: perBuild(faker.lorem.word),
    abbreviation: perBuild(faker.lorem.word),
    bibleId: perBuild(faker.string.uuid),
  },
});

export let bibleBooks = {
  50: [...new Array(50)].map(bibleBookBuilder),
};
