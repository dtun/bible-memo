import { Fragment } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Text, View } from "@/components/Themed";
import { bible } from "@/constants/Bible";
import { SafeSpaceBottom } from "@/components/Space";
import { formatBookName } from "@/utils/formatBookName";

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(bible)}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/bible", params: { book: item, chapter: "1" } }}
            style={styles.title}
          >
            {formatBookName(item)}
          </Link>
        )}
        style={styles.bookList}
        ListFooterComponent={() => (
          <Fragment>
            <Text style={styles.footerText}>
              {`${Object.keys(bible).length} Books`}
            </Text>
            <SafeSpaceBottom />
          </Fragment>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bookList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  separator: {
    height: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  footerText: {
    textAlign: "center",
    paddingVertical: 4,
    fontSize: 14,
    color: "gray",
  },
});
