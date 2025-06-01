import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import { formatScreenTitle } from "@/utils/formatScreenTitle";

export default function BibleScreen() {
  let { setOptions } = useNavigation();
  let { book, chapter } = useLocalSearchParams<{
    book: string;
    chapter: string;
  }>();

  useEffect(() => {
    let headerTitle = formatScreenTitle(`${book} ${chapter}`);

    setOptions({ headerTitle });
  }, [book, chapter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon...</Text>
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
});
