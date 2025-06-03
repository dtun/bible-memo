import { SafeAreaProvider } from "react-native-safe-area-context";

import { render, screen } from "@/test-utils";
import { SafeSpaceBottom, SafeSpaceTop, Space } from "@/components/Space";

it(`renders <Space />`, () => {
  render(<Space height={24} />);

  expect(screen).toMatchSnapshot();
});

it(`renders <SafeSpaceBottom />`, () => {
  render(
    <SafeAreaProvider>
      <SafeSpaceBottom />
    </SafeAreaProvider>
  );

  expect(screen).toMatchSnapshot();
});

it(`renders <SafeSpaceTop />`, () => {
  render(
    <SafeAreaProvider>
      <SafeSpaceTop />
    </SafeAreaProvider>
  );

  expect(screen).toMatchSnapshot();
});
