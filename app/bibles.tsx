import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useBibles } from "@/hooks/useBibles";
import { SafeSpaceBottom } from "@/components/Space";
import { Space } from "@/components/Space";
import { filterAndSortBibles } from "@/utils/bible";
import { BibleTranslationListItem } from "@/components/BibleTranslationListItem";

export default function BiblesScreen() {
  let { id } = useLocalSearchParams<{ id: string }>();
  let { data: bibles, isFetching, refetch } = useBibles();
  let data = filterAndSortBibles(
    bibles ?? [],
    { key: "language.nameLocal", value: "English" },
    "abbreviationLocal"
  ).map((bible) =>
    Object.assign(bible, {
      onPress: (_id: string) => router.replace("/bible"),
      selected: bible.id === id,
    })
  );

  return (
    <>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        contentContainerStyle={
          (isFetching || !bibles?.length) && styles.container
        }
        data={data}
        ItemSeparatorComponent={() => (
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        )}
        ListFooterComponent={SafeSpaceBottom}
        ListHeaderComponent={<Space height={8} />}
        ListEmptyComponent={() => (
          <Text style={[styles.body, styles.listEmpty]}>
            {isFetching ? "Loading..." : "No bibles found."}
          </Text>
        )}
        onRefresh={refetch}
        refreshing={isFetching}
        renderItem={BibleTranslationListItem}
      />
    </>
  );
}

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
  separator: {
    marginVertical: 16,
    height: 1,
    width: "100%",
  },
});
