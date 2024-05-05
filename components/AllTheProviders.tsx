import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useColorScheme } from "./useColorScheme";
import { ProviderStack } from "./ProviderStack";

export let queryClient = new QueryClient();

function AllTheProviders({ children }: { children: React.ReactNode }) {
  let colorScheme = useColorScheme();

  return (
    <ProviderStack
      providers={[
        [
          ThemeProvider,
          { value: colorScheme === "dark" ? DarkTheme : DefaultTheme },
        ],
        [QueryClientProvider, { client: queryClient }],
      ]}
    >
      {children}
    </ProviderStack>
  );
}

export { AllTheProviders };
