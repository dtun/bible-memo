import { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { useBible } from "@/hooks/useBible";
import { Text, View } from "@/components/Themed";
import { formatScreenTitle } from "@/utils/formatScreenTitle";
import { HeaderPressable } from "@/components/HeaderPressable";

export default function BibleScreen() {
  let { push } = useRouter();
  let { setOptions } = useNavigation();
  let { book, chapter, id } = useLocalSearchParams<{
    book: string;
    chapter: string;
    id: string;
  }>();
  let { data: bible, isFetching } = useBible(id!);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderPressable
          title={bible?.abbreviationLocal ?? ""}
          onPress={() =>
            push({
              pathname: "/bibles",
              params: { id: bible?.id ?? id },
            })
          }
        />
      ),
      headerTitle: formatScreenTitle(`${book} ${chapter}`),
    });
  }, [bible, book, chapter, id]);

  if (isFetching)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon...</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.body}>{bible?.name}</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: "80%",
  },
});
