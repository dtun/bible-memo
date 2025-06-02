import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { type ReactNode } from "react";

import { useColorScheme } from "./useColorScheme";
import { ProviderStack } from "./ProviderStack";

function AllTheProviders({ children }: { children: ReactNode }) {
  let colorScheme = useColorScheme();
  let theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ProviderStack providers={[[ThemeProvider, { value: theme }]]}>
      {children}
    </ProviderStack>
  );
}

export { AllTheProviders };
