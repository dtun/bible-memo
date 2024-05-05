import * as React from "react";

import { render, screen } from "../../test-utils";
import { Space } from "../Space";

it(`renders <Space />`, () => {
  render(<Space height={24} />);

  expect(screen).toMatchSnapshot();
});
