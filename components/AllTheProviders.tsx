import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { type ReactNode } from "react";

import { useColorScheme } from "./useColorScheme";
import { ProviderStack } from "./ProviderStack";
import { TinyBaseProvider } from "./TinyBaseProvider";

function AllTheProviders({ children }: { children: ReactNode }) {
  let colorScheme = useColorScheme();
  let theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <ProviderStack
        providers={[
          [ThemeProvider, { value: theme }],
          [TinyBaseProvider, {}],
        ]}
      >
        {children}
      </ProviderStack>
    </SafeAreaProvider>
  );
}

export { AllTheProviders };
