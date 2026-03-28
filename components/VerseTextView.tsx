import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useChapterText, VerseText } from "@/hooks/chapterText";

interface VerseTextViewProps {
  bookName: string;
  chapter: number;
  onVersePress: (verse: number) => void;
}

export function VerseTextView({
  bookName,
  chapter,
  onVersePress,
}: VerseTextViewProps) {
  let { verses, isLoading, error } = useChapterText(bookName, chapter);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" />
        <Text style={styles.loadingText}>Loading verses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={verses}
      keyExtractor={(item) => String(item.verse)}
      renderItem={({ item }) => (
        <Pressable
          testID={`verse-row-${item.verse}`}
          style={styles.verseRow}
          onPress={() => onVersePress(item.verse)}
        >
          <Text style={styles.verseNumber}>{item.verse}</Text>
          <Text style={styles.verseText}>{item.text}</Text>
        </Pressable>
      )}
    />
  );
}

let styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorText: {
    color: "#d32f2f",
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#1a73e8",
    borderRadius: 4,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  verseRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  verseNumber: {
    fontWeight: "700",
    color: "#1a73e8",
    width: 30,
    fontSize: 12,
    marginTop: 2,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
