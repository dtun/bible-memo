import { render } from "@testing-library/react-native";

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  return <>{children}</>;
};

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
