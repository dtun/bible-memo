import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
export { ErrorBoundary } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useColorScheme } from "@/components/useColorScheme";
import { HeaderPressable } from "@/components/HeaderPressable";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerRight: () => (
              <Link href="/me" asChild>
                <HeaderPressable title="Me" />
              </Link>
            ),
            headerLeft: () => (
              <Link href="/bible" asChild>
                <HeaderPressable title="Bible" />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="me"
          options={{
            headerTitle: "Me",
            headerLeft: () => (
              <Link href="/" asChild>
                <HeaderPressable title="Back" />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="bible"
          options={{
            headerTitle: "Bible",
            headerLeft: () => (
              <Link href="/" asChild>
                <HeaderPressable title="Back" />
              </Link>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
