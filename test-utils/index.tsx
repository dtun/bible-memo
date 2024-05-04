import { render } from "@testing-library/react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

let queryClient = new QueryClient();

let AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

let customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

export * from "@testing-library/react-native";

export { customRender as render, AllTheProviders };
