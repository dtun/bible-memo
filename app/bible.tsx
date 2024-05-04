import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { Text, View } from "@/components/Themed";
import { formatScreenTitle } from "@/utils/bible";

export default function BibleScreen() {
  let { setOptions } = useNavigation();
  let { book, chapter } = useLocalSearchParams<{
    book: string;
    chapter: string;
  }>();

  useEffect(() => {
    setOptions({
      headerTitle: formatScreenTitle(`${book} ${chapter}`),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon...</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.body}>Read the Bible in multiple translations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
