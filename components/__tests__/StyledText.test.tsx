import { render, screen } from "@/test-utils";
import { MonoText } from "@/components/StyledText";

it(`renders <MonoText />`, () => {
  render(<MonoText>Snapshot test!</MonoText>);

  expect(screen).toMatchSnapshot();
});

it(`renders <MonoText /> in light`, () => {
  render(<MonoText lightColor="#eee">Snapshot test!</MonoText>);

  expect(screen).toMatchSnapshot();
});

it(`renders <MonoText /> in dark`, () => {
  render(<MonoText darkColor="#000">Snapshot test!</MonoText>);

  expect(screen).toMatchSnapshot();
});
