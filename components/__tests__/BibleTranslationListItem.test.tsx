import * as React from "react";

import { render, screen, userEvent } from "@/test-utils";
import { bibleTranslationBuilder } from "@/builders/bibleTranslation";
import { BibleTranslationListItem } from "../BibleTranslationListItem";

let data = bibleTranslationBuilder();
let onPress = jest.fn();

it(`renders <BibleTranslationListItem />`, () => {
  render(<BibleTranslationListItem item={{ ...data, onPress }} />);

  expect(screen).toMatchSnapshot();
});

it(`renders selected state`, () => {
  render(
    <BibleTranslationListItem item={{ ...data, onPress, selected: true }} />
  );

  expect(screen.getByLabelText(data.nameLocal)).toHaveProperty(
    "props.accessibilityState",
    { selected: true }
  );

  screen.rerender(
    <BibleTranslationListItem item={{ ...data, onPress, selected: false }} />
  );

  expect(screen.getByLabelText(data.nameLocal)).toHaveProperty(
    "props.accessibilityState",
    { selected: false }
  );
});

it(`calls onPress with id`, async () => {
  render(<BibleTranslationListItem item={{ ...data, onPress }} />);

  await userEvent.press(screen.getByLabelText(data.nameLocal));

  expect(onPress).toHaveBeenCalledWith(data.id);
});
