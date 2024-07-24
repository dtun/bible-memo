import * as React from "react";

import { render, screen, userEvent } from "@/test-utils";
import { bibleTranslationBuilder } from "@/builders/bibleTranslation";
import { BibleTranslationListItem } from "../BibleTranslationListItem";

let bible = bibleTranslationBuilder();
let onPress = jest.fn();

it(`renders <BibleTranslationListItem />`, () => {
  render(<BibleTranslationListItem item={{ ...bible, onPress }} />);

  expect(screen.getByText(bible.abbreviationLocal)).toBeTruthy();
  expect(screen.getByText(bible.nameLocal)).toBeTruthy();
});

it(`renders selected state`, () => {
  render(
    <BibleTranslationListItem item={{ ...bible, onPress, selected: true }} />
  );

  expect(screen.getByLabelText(bible.nameLocal)).toHaveProperty(
    "props.accessibilityState",
    { selected: true }
  );
  expect(screen.getByText("✓")).toBeTruthy();

  screen.rerender(
    <BibleTranslationListItem item={{ ...bible, onPress, selected: false }} />
  );

  expect(screen.getByLabelText(bible.nameLocal)).toHaveProperty(
    "props.accessibilityState",
    { selected: false }
  );
  expect(() => screen.getByText("✓")).toThrow();
});

it(`calls onPress with id`, async () => {
  render(<BibleTranslationListItem item={{ ...bible, onPress }} />);

  await userEvent.press(screen.getByLabelText(bible.nameLocal));

  expect(onPress).toHaveBeenCalledWith(bible.id);
});
