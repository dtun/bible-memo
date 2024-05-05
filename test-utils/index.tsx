import { render } from "@testing-library/react-native";
import { AllTheProviders } from "@/components/AllTheProviders";

let customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

export * from "@testing-library/react-native";

export { customRender as render };
