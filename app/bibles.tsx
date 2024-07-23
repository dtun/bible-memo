import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  type ListRenderItemInfo,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Text, View } from "@/components/Themed";
import { useBibles } from "@/hooks/useBibles";
import { SafeSpaceBottom } from "@/components/Space";
import { Space } from "@/components/Space";
import { filterAndSortBibles } from "@/utils/bible";
import { type BibleTranslation } from "@/types";
import { getBibleQuery } from "@/hooks/useBible";
import { queryClient } from "./_layout";

export default function BiblesScreen() {
  let { id } = useLocalSearchParams<{ id: string }>();
  let { data: bibles, isFetching, refetch } = useBibles(filterAndSortBibles);

  return (
    <>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        contentContainerStyle={
          (isFetching || !bibles?.length) && styles.container
        }
        data={bibles?.map((bible) => ({ ...bible, selected: bible.id === id }))}
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
        renderItem={RenderBibleTranslation}
      />
    </>
  );
}

function RenderBibleTranslation({
  item: bible,
}: ListRenderItemInfo<BibleTranslation & { selected: boolean }>) {
  return (
    <Pressable
      accessibilityLabel={bible.nameLocal}
      accessibilityRole="link"
      accessibilityState={{ selected: bible.selected }}
      hitSlop={24}
      onPress={() => {
        router.back();
        router.navigate(`/bible/${bible.id}`);
      }}
      onPressIn={() => {
        queryClient.prefetchQuery(getBibleQuery(bible.id));
      }}
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
