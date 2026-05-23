import { useMemo } from "react";
import { Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Text, View, useColors } from "@/components/Themed";
import { SafeSpaceBottom } from "@/components/Space";
import { useReadingStats } from "@/hooks/verse";
import { bible } from "@/constants/Bible";
import { startCase } from "@/utils/startCase";

const TOTAL_VERSES = Object.values(bible).reduce(
  (sum, book) => sum + book.verses.reduce((a, b) => a + b, 0),
  0
);
const TOTAL_BOOKS = Object.keys(bible).length;

export default function MeScreen() {
  let colors = useColors();
  let { versesRead, booksStarted, lastRead } = useReadingStats();

  let progress =
    TOTAL_VERSES > 0 ? Math.round((versesRead / TOTAL_VERSES) * 100) : 0;

  let s = useMemo(
    () => ({
      content: { padding: 16, gap: 12 } as const,
      heading: {
        fontSize: 28,
        fontWeight: "700" as const,
        color: colors.text,
        marginBottom: 4,
      },
      card: {
        backgroundColor: colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 20,
      },
      label: {
        fontSize: 12,
        fontWeight: "600" as const,
        letterSpacing: 0.5,
        textTransform: "uppercase" as const,
        color: colors.textSecondary,
      },
      value: {
        fontSize: 32,
        fontWeight: "700" as const,
        color: colors.text,
        marginTop: 6,
      },
      caption: { fontSize: 13, color: colors.textTertiary, marginTop: 4 },
      resume: { fontSize: 20, fontWeight: "700" as const, color: colors.text },
      empty: { fontSize: 14, color: colors.textTertiary },
    }),
    [colors]
  );

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={s.content}
    >
      <Text style={s.heading}>Your Progress</Text>

      <View style={s.card}>
        <Text style={s.label}>Verses Read</Text>
        <Text style={s.value}>
          {versesRead.toLocaleString()} / {TOTAL_VERSES.toLocaleString()}
        </Text>
        <Text style={s.caption}>{progress}% of the Bible</Text>
      </View>

      <View style={s.card}>
        <Text style={s.label}>Books Started</Text>
        <Text style={s.value}>
          {booksStarted} / {TOTAL_BOOKS}
        </Text>
      </View>

      {lastRead ? (
        <Link
          href={{
            pathname: "/bible",
            params: {
              book: lastRead.book,
              chapter: String(lastRead.chapter),
            },
          }}
          asChild
        >
          <Pressable style={s.card}>
            <Text style={s.label}>Continue Reading</Text>
            <Text style={[s.resume, { marginTop: 6 }]}>
              {startCase(`${lastRead.book} ${lastRead.chapter}`)}
            </Text>
          </Pressable>
        </Link>
      ) : (
        <View style={s.card}>
          <Text style={s.label}>Continue Reading</Text>
          <Text style={[s.empty, { marginTop: 6 }]}>
            Start reading to track your progress.
          </Text>
        </View>
      )}

      <SafeSpaceBottom />
    </ScrollView>
  );
}
