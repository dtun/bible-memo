import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { type BibleTranslation } from "@/types";

function BibleTranslationListItem({
  item: bible,
}: {
  item: BibleTranslation & {
    selected?: boolean;
    onPress: (id: string) => void;
  };
}) {
  return (
    <Pressable
      accessibilityLabel={bible.nameLocal}
      accessibilityRole="link"
      accessibilityState={{ selected: bible.selected }}
      hitSlop={24}
      onPress={() => bible.onPress(bible.id)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <View
        darkColor="transparent"
        lightColor="transparent"
        style={styles.listItem}
      >
        <Text style={styles.title}>{bible.abbreviationLocal}</Text>
        {bible.selected ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={styles.body}>{bible.nameLocal}</Text>
    </Pressable>
  );
}

export { BibleTranslationListItem };

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  body: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    marginHorizontal: 4,
  },
  check: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
    marginHorizontal: 8,
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
