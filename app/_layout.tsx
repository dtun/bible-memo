import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
export { ErrorBoundary } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";

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
                <Pressable>
                  {({ pressed }) => (
                    <Text style={{ opacity: pressed ? 0.5 : 1 }}>Me</Text>
                  )}
                </Pressable>
              </Link>
            ),
            headerLeft: () => (
              <Link href="/bible" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Text style={{ opacity: pressed ? 0.5 : 1 }}>Bible</Text>
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="me"
          options={{ presentation: "modal", headerTitle: "Me" }}
        />
        <Stack.Screen
          name="bible"
          options={{ presentation: "modal", headerTitle: "Bible" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
