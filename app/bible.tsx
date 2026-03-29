import { useEffect, useMemo } from "react";
import { ScrollView, Pressable } from "react-native";
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
} from "@/hooks/verse";
import { VerseTextView } from "@/components/VerseTextView";
import { SafeSpaceBottom } from "@/components/Space";

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

  useEffect(() => {
    let title = startCase(`${book} ${chapter}`);
    setOptions({
      headerTitle: () => (
        <View style={{ alignItems: "center", backgroundColor: "transparent" }}>
          <Text style={{ fontSize: 17, fontWeight: "600", color: colors.text }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textTertiary }}>
            {verseCount} Verses • {readCount} Read
          </Text>
        </View>
      ),
    });
  }, [book, chapter, verseCount, readCount, colors]);

  let s = useMemo(
    () => ({
      container: { flex: 1, backgroundColor: colors.background } as const,
      contentContainer: { padding: 16 } as const,
      subtitle: { fontSize: 13, color: colors.textTertiary } as const,
      errorText: {
        fontSize: 18,
        color: colors.error,
        textAlign: "center" as const,
        marginTop: 50,
      },
      nav: {
        flexDirection: "row" as const,
        justifyContent: "space-between" as const,
        alignItems: "center" as const,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.background,
      },
      navButton: { paddingVertical: 4 },
      navText: {
        color: colors.textSecondary,
        fontWeight: "600" as const,
      },
      actions: {
        flexDirection: "row" as const,
        gap: 12,
        marginTop: 24,
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
      <View style={s.nav}>
        <Pressable
          style={s.navButton}
          onPress={() =>
            setParams({ chapter: (chapterNumber - 1).toString() })
          }
        >
          <Text style={s.navText}>Previous</Text>
        </Pressable>
        <Pressable
          style={s.navButton}
          onPress={() =>
            setParams({ chapter: (chapterNumber + 1).toString() })
          }
        >
          <Text style={s.navText}>Next</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={s.contentContainer}>
        <VerseTextView
          bookName={bookName}
          chapter={chapterNumber}
          onVersePress={toggleVerse}
        />

        <View style={s.actions}>
          <Pressable style={s.button} onPress={markAllRead}>
            <Text style={s.buttonText}>Mark All Read</Text>
          </Pressable>
          <Pressable style={[s.button, s.secondaryButton]} onPress={clearAll}>
            <Text style={[s.buttonText, s.secondaryButtonText]}>
              Clear All
            </Text>
          </Pressable>
        </View>
        <SafeSpaceBottom />
      </ScrollView>
    </View>
  );
}
