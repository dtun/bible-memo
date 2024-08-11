import * as React from "react";
import { render } from "@/test-utils";
import { Text, View } from "@/components/Themed";

it(`renders <Text />`, () => {
  render(<Text>Snapshot test!</Text>);

  expect(screen).toMatchSnapshot();
});

it(`renders <View />`, () => {
  render(<View />);

  expect(screen).toMatchSnapshot();
});
