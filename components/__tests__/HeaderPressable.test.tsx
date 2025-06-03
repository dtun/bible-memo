import { render, screen, userEvent } from "@/test-utils";
import { HeaderPressable } from "@/components/HeaderPressable";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe(`<HeaderPressable />`, () => {
  it(`renders`, () => {
    render(<HeaderPressable title="Snapshot test!" />);

    expect(screen).toMatchSnapshot();
  });

  it(`calls onPress`, async () => {
    let onPressSpy = jest.fn();

    render(<HeaderPressable title="Press test!" onPress={onPressSpy} />);

    await userEvent.press(screen.getByText("Press test!"));

    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });
});
