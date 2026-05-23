import { Fragment, useEffect, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import { bible } from "@/constants/Bible";
import { nTBookKeys, oTBookKeys } from "@/constants/Books";
import { SafeSpaceBottom } from "@/components/Space";
import { startCase } from "@/utils/startCase";

export default function BooksScreen() {
  let { testament } = useLocalSearchParams<{ testament?: string }>();
  let { setOptions } = useNavigation();

  let books = useMemo(() => {
    let allKeys = Object.keys(bible);
    if (testament === "ot") {
      let ot = new Set<string>(Object.values(oTBookKeys));
      return allKeys.filter((key) => ot.has(key));
    }
    if (testament === "nt") {
      let nt = new Set<string>(Object.values(nTBookKeys));
      return allKeys.filter((key) => nt.has(key));
    }
    return allKeys;
  }, [testament]);

  useEffect(() => {
    let title =
      testament === "ot"
        ? "Old Testament"
        : testament === "nt"
          ? "New Testament"
          : "Books";
    setOptions({ headerTitle: title });
  }, [testament]);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <Link
            dismissTo
            href={{ pathname: "/bible", params: { book: item, chapter: "1" } }}
            style={styles.title}
          >
            {startCase(item)}
          </Link>
        )}
        style={styles.bookList}
        ListFooterComponent={() => (
          <Fragment>
            <Text style={styles.footerText}>{`${books.length} Books`}</Text>
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
