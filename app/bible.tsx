import { useEffect, useState, useMemo } from "react";
import { ScrollView, Pressable, Dimensions } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Text, View, useColors } from "@/components/Themed";
import { startCase } from "@/utils/startCase";
import { bible } from "@/constants/Bible";
import { oTBookKeys, nTBookKeys } from "@/constants/Books";
import {
  useChapterProgress,
  useToggleVerse,
  useMarkAllChapterRead,
  useClearChapterRead,
  useIsVerseRead,
} from "@/hooks/verse";
import { VerseTextView } from "@/components/VerseTextView";

let { width: screenWidth } = Dimensions.get("window");
const SQUARE_SIZE = 48;
const SQUARE_MARGIN = 4;

let VerseSquare = function VerseSquare({
  book,
  chapter,
  verse,
  toggleVerse,
}: {
  book: string;
  chapter: number;
  verse: number;
  toggleVerse: (verse: number) => void;
}) {
  let isRead = useIsVerseRead(book, chapter, verse);
  let colors = useColors();
  let backgroundColor = isRead ? colors.verseRead : colors.verseUnread;

  return (
    <Pressable
      accessibilityLabel={`${book} ${chapter}:${verse}`}
      accessibilityRole="button"
      onPress={() => toggleVerse(verse)}
      style={{
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        margin: SQUARE_MARGIN / 2,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor,
      }}
    >
      <Text
        style={{
          fontSize: 8,
          fontWeight: "600",
          color: isRead ? colors.buttonPrimaryText : colors.textSecondary,
        }}
      >
        {verse}
      </Text>
    </Pressable>
  );
};

export default function BibleScreen() {
  let { setParams } = useRouter();
  let { setOptions } = useNavigation();
  let { book, chapter } = useLocalSearchParams<{
    book: string;
    chapter: string;
  }>();
  let colors = useColors();

  let bookName = book || "";
  let chapterNumber = parseInt(chapter || "1");

  let bookKey = [
    ...Object.values(oTBookKeys),
    ...Object.values(nTBookKeys),
  ].find((key) => key === bookName.toLowerCase());

  let bookData = bookKey ? bible[bookKey as keyof typeof bible] : null;
  let verseCount = bookData?.verses[chapterNumber - 1] || 0;

  let { readCount, progressPercentage } = useChapterProgress(
    bookName,
    chapterNumber,
    verseCount
  );
  let toggleVerse = useToggleVerse(bookName, chapterNumber);
  let markAllRead = useMarkAllChapterRead(bookName, chapterNumber, verseCount);
  let clearAll = useClearChapterRead(bookName, chapterNumber);

  let [viewMode, setViewMode] = useState<"grid" | "text">("grid");

  let verseData = Array.from({ length: verseCount }, (_, i) => ({ id: i + 1 }));

  useEffect(() => {
    let headerTitle = startCase(`${book} ${chapter}`);
    setOptions({ headerTitle });
  }, [book, chapter]);

  let s = useMemo(
    () => ({
      container: { flex: 1, backgroundColor: colors.background } as const,
      contentContainer: { padding: 16 } as const,
      header: { marginBottom: 24, alignItems: "center" } as const,
      subtitle: { fontSize: 16, color: colors.textSecondary } as const,
      errorText: {
        fontSize: 18,
        color: colors.error,
        textAlign: "center" as const,
        marginTop: 50,
      },
      toggleContainer: {
        flexDirection: "row" as const,
        alignSelf: "center" as const,
        marginBottom: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden" as const,
      },
      toggleButton: { paddingHorizontal: 20, paddingVertical: 8 },
      toggleButtonActive: { backgroundColor: colors.toggleActive },
      toggleButtonText: {
        fontWeight: "600" as const,
        color: colors.toggleInactiveText,
      },
      toggleButtonTextActive: { color: colors.toggleActiveText },
      gridContainer: { alignSelf: "center" as const, marginBottom: 24 },
      grid: {
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
        justifyContent: "flex-start" as const,
      },
      listFooter: {
        flexDirection: "row" as const,
        gap: 12,
        marginHorizontal: SQUARE_SIZE / 2,
        justifyContent: "space-between" as const,
      },
      legendContainer: { marginBottom: 24 },
      legendText: {
        fontSize: 14,
        color: colors.textTertiary,
        marginBottom: 8,
        textAlign: "center" as const,
      },
      legend: {
        flexDirection: "row" as const,
        justifyContent: "center" as const,
        gap: 16,
      },
      legendItem: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: 4,
      },
      legendSquare: { width: 12, height: 12, borderRadius: 2 },
      actions: {
        flexDirection: "row" as const,
        gap: 12,
        marginHorizontal: SQUARE_SIZE / 2,
      },
      button: {
        backgroundColor: colors.buttonPrimary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        flex: 1,
      },
      buttonText: {
        color: colors.buttonPrimaryText,
        fontWeight: "600" as const,
        textAlign: "center" as const,
      },
      secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border,
      },
      secondaryButtonText: { color: colors.textSecondary },
      tertiaryButton: { backgroundColor: "transparent" },
      textViewContainer: { minHeight: 300, marginBottom: 24 },
    }),
    [colors]
  );

  if (!bookData || !bookName) {
    return (
      <View style={s.container}>
        <Text style={s.errorText}>Book not found: {book}</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.contentContainer}>
        <View style={s.header}>
          <Text style={s.subtitle}>
            {verseCount} verses • {readCount} read ({progressPercentage}%)
          </Text>
        </View>

        <View style={s.toggleContainer}>
          <Pressable
            style={[
              s.toggleButton,
              viewMode === "grid" && s.toggleButtonActive,
            ]}
            onPress={() => setViewMode("grid")}
          >
            <Text
              style={[
                s.toggleButtonText,
                viewMode === "grid" && s.toggleButtonTextActive,
              ]}
            >
              Grid
            </Text>
          </Pressable>
          <Pressable
            style={[
              s.toggleButton,
              viewMode === "text" && s.toggleButtonActive,
            ]}
            onPress={() => setViewMode("text")}
          >
            <Text
              style={[
                s.toggleButtonText,
                viewMode === "text" && s.toggleButtonTextActive,
              ]}
            >
              Text
            </Text>
          </Pressable>
        </View>

        {viewMode === "text" ? (
          <View style={s.textViewContainer}>
            <VerseTextView
              bookName={bookName}
              chapter={chapterNumber}
              onVersePress={toggleVerse}
            />
          </View>
        ) : (
          <>
            <View style={s.gridContainer}>
              <View style={s.grid}>
                {verseData.map((item) => (
                  <VerseSquare
                    key={`${bookName}-${chapterNumber}-${item.id}`}
                    book={bookName}
                    chapter={chapterNumber}
                    verse={item.id}
                    toggleVerse={toggleVerse}
                  />
                ))}
              </View>
            </View>

            <View style={s.listFooter}>
              <Pressable
                style={[s.button, s.tertiaryButton]}
                onPress={() =>
                  setParams({ chapter: (chapterNumber - 1).toString() })
                }
              >
                <Text style={[s.buttonText, s.secondaryButtonText]}>
                  Previous
                </Text>
              </Pressable>
              <Pressable
                style={[s.button, s.tertiaryButton]}
                onPress={() =>
                  setParams({ chapter: (chapterNumber + 1).toString() })
                }
              >
                <Text style={[s.buttonText, s.secondaryButtonText]}>Next</Text>
              </Pressable>
            </View>

            <View style={s.legendContainer}>
              <Text style={s.legendText}>Tap verses to mark as read</Text>
              <View style={s.legend}>
                <View style={s.legendItem}>
                  <View
                    style={[
                      s.legendSquare,
                      { backgroundColor: colors.verseUnread },
                    ]}
                  />
                  <Text style={{ fontSize: 12, color: colors.textTertiary }}>
                    Unread
                  </Text>
                </View>
                <View style={s.legendItem}>
                  <View
                    style={[
                      s.legendSquare,
                      { backgroundColor: colors.verseRead },
                    ]}
                  />
                  <Text style={{ fontSize: 12, color: colors.textTertiary }}>
                    Read
                  </Text>
                </View>
              </View>
            </View>

            <View style={s.actions}>
              <Pressable style={s.button} onPress={markAllRead}>
                <Text style={s.buttonText}>Mark All Read</Text>
              </Pressable>
              <Pressable
                style={[s.button, s.secondaryButton]}
                onPress={clearAll}
              >
                <Text style={[s.buttonText, s.secondaryButtonText]}>
                  Clear All
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
