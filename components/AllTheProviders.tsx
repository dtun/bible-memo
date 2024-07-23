import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { useColorScheme } from "./useColorScheme";
import { ProviderStack } from "./ProviderStack";

export let client = new QueryClient();

function AllTheProviders({ children }: { children: ReactNode }) {
  let colorScheme = useColorScheme();
  let theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ProviderStack
      providers={[
        [ThemeProvider, { value: theme }],
        [QueryClientProvider, { client }],
      ]}
    >
      {children}
    </ProviderStack>
  );
}

export { AllTheProviders };
