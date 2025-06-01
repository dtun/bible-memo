import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
export { ErrorBoundary } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient } from "@tanstack/react-query";
import { oTBookKeys } from "@/constants/Books";
import { HeaderPressable } from "@/components/HeaderPressable";
import { AllTheProviders } from "@/components/AllTheProviders";

export let unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [loaded, error] = useFonts({
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

export let queryClient = new QueryClient();

function RootLayoutNav() {
  let { back } = useRouter();

  return (
    <AllTheProviders>
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
                <HeaderPressable title="Read" />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="me"
          options={{
            headerTitle: "Me",
            headerLeft: () => <HeaderPressable title="Back" onPress={back} />,
          }}
        />
        <Stack.Screen
          initialParams={{ book: oTBookKeys.GENESIS, chapter: 1, id: "" }}
          name="bible"
          options={{
            headerTitle: "Bible",
            headerLeft: () => (
              <Link href="/" asChild>
                <HeaderPressable title="Back" />
              </Link>
            ),
            headerRight: () => (
              <Link href="/books" asChild>
                <HeaderPressable title="Books" />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="books"
          options={{
            headerTitle: "Books",
          }}
        />
      </Stack>
    </AllTheProviders>
  );
}
