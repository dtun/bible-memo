import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { render, screen } from "../../test-utils";
import { SafeSpace } from "../SafeSpace";

it(`renders <SafeSpace.Bottom />`, () => {
  render(
    <SafeAreaProvider>
      <SafeSpace.Bottom />
    </SafeAreaProvider>
  );

  expect(screen).toMatchSnapshot();
});

it(`renders <SafeSpace.Top />`, () => {
  render(
    <SafeAreaProvider>
      <SafeSpace.Top />
    </SafeAreaProvider>
  );

  expect(screen).toMatchSnapshot();
});
