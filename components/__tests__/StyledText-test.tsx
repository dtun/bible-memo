import * as React from "react";

import { render, screen } from "../../test-utils";
import { MonoText } from "../StyledText";

it(`renders correctly`, () => {
  render(<MonoText>Snapshot test!</MonoText>);

  expect(screen).toMatchSnapshot();
});
