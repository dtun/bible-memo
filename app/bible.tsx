import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import { startCase } from "@/utils/startCase";
import { bible } from "@/constants/Bible";
import { oTBookKeys, nTBookKeys } from "@/constants/Books";

let { width: screenWidth } = Dimensions.get("window");
const SQUARE_SIZE = 48;
const SQUARE_MARGIN = 4;
const COLUMNS = Math.floor((screenWidth - 32) / (SQUARE_SIZE + SQUARE_MARGIN));

export default function BibleScreen() {
  let { setParams } = useRouter();
  let { setOptions } = useNavigation();
  let { book, chapter } = useLocalSearchParams<{
    book: string;
    chapter: string;
  }>();

  let [readVerses, setReadVerses] = useState<Set<number>>(new Set());

  // Find the book data
  let bookKey = [
    ...Object.values(oTBookKeys),
    ...Object.values(nTBookKeys),
  ].find((key) => key === book?.toLowerCase());

  let bookData = bookKey ? (bible as any)[bookKey] : null;
  let chapterNumber = parseInt(chapter || "1");
  let verseCount = bookData?.verses[chapterNumber - 1] || 0;

  // Create verse data array for FlatList
  let verseData = Array.from({ length: verseCount }, (_, i) => ({ id: i + 1 }));

  useEffect(() => {
    let headerTitle = startCase(`${book} ${chapter}`);
    setOptions({ headerTitle });
  }, [book, chapter]);

  let toggleVerse = (verseNumber: number) => {
    setReadVerses((prev) => {
      let newSet = new Set(prev);
      if (newSet.has(verseNumber)) {
        newSet.delete(verseNumber);
      } else {
        newSet.add(verseNumber);
      }
      return newSet;
    });
  };

  let getVerseColor = (verseNumber: number) => {
    if (readVerses.has(verseNumber)) {
      return "#39d353"; // GitHub green
    }
    return "#ebedf0"; // GitHub gray
  };

  let renderVerseSquare = ({ item }: { item: { id: number } }) => (
    <Pressable
      accessibilityLabel={`${book} ${chapter}:${item.id}`}
      accessibilityRole="button"
      onPress={() => toggleVerse(item.id)}
      style={[styles.verseSquare, { backgroundColor: getVerseColor(item.id) }]}
    >
      <Text style={styles.verseNumber}>{item.id}</Text>
    </Pressable>
  );

  let readCount = readVerses.size;
  let progressPercentage =
    verseCount > 0 ? Math.round((readCount / verseCount) * 100) : 0;

  if (!bookData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found: {book}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            {verseCount} verses • {readCount} read ({progressPercentage}%)
          </Text>
        </View>

        <FlatList
          data={verseData}
          renderItem={renderVerseSquare}
          keyExtractor={(item) => item.id.toString()}
          numColumns={COLUMNS}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          ListFooterComponent={
            <View style={styles.listFooter}>
              <Pressable
                style={[styles.button, styles.tertiaryButton]}
                onPress={() =>
                  setParams({ chapter: (chapterNumber - 1).toString() })
                }
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Previous
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.tertiaryButton]}
                onPress={() =>
                  setParams({ chapter: (chapterNumber + 1).toString() })
                }
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Next
                </Text>
              </Pressable>
            </View>
          }
        />

        <View style={styles.legendContainer}>
          <Text style={styles.legendText}>Tap verses to mark as read</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendSquare, { backgroundColor: "#ebedf0" }]}
              />
              <Text style={styles.legendLabel}>Unread</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendSquare, { backgroundColor: "#39d353" }]}
              />
              <Text style={styles.legendLabel}>Read</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.button}
            onPress={() => {
              let allVerses = new Set(
                Array.from({ length: verseCount }, (_, i) => i + 1)
              );
              setReadVerses(allVerses);
            }}
          >
            <Text style={styles.buttonText}>Mark All Read</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setReadVerses(new Set())}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Clear All
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
    textAlign: "center",
    marginTop: 50,
  },
  legendContainer: {
    marginBottom: 24,
  },
  legendText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 12,
    color: "#666",
  },
  gridContainer: {
    alignSelf: "center",
    marginBottom: 24,
  },
  row: {
    justifyContent: "flex-start",
  },
  verseSquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    margin: SQUARE_MARGIN / 2,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5da",
  },
  verseNumber: {
    fontSize: 8,
    fontWeight: "600",
    color: "#24292e",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: SQUARE_SIZE / 2,
  },
  button: {
    backgroundColor: "#0366d6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5da",
  },
  tertiaryButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "#586069",
  },
  listFooter: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: SQUARE_SIZE / 2,
    justifyContent: "space-between",
  },
});
