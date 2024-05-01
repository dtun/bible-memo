import * as React from "react";

import { render, screen } from "../../test-utils";
import { Text, View } from "../Themed";

it(`renders <Text />`, () => {
  render(<Text>Snapshot test!</Text>);

  expect(screen).toMatchSnapshot();
});

it(`renders <View />`, () => {
  render(<View />);

  expect(screen).toMatchSnapshot();
});
