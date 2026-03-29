import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useChapterText } from "@/hooks/chapterText";
import { useColors } from "@/components/Themed";
import { useIsVerseRead } from "@/hooks/verse";

interface VerseTextViewProps {
  bookName: string;
  chapter: number;
  onVersePress: (verse: number) => void;
}

function VerseRow({
  bookName,
  chapter,
  verse,
  text,
  onPress,
}: {
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  onPress: (verse: number) => void;
}) {
  let isRead = useIsVerseRead(bookName, chapter, verse);
  let colors = useColors();

  return (
    <Pressable
      testID={`verse-row-${verse}`}
      style={{
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 16,
        opacity: isRead ? 0.4 : 1,
      }}
      onPress={() => onPress(verse)}
    >
      <View
        testID={`verse-indicator-${verse}`}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: isRead ? colors.verseRead : "transparent",
          borderWidth: isRead ? 0 : 1,
          borderColor: colors.border,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          marginTop: 2,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: "700",
            color: isRead ? colors.buttonPrimaryText : colors.textTertiary,
          }}
        >
          {verse}
        </Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          lineHeight: 24,
          color: colors.text,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

export function VerseTextView({
  bookName,
  chapter,
  onVersePress,
}: VerseTextViewProps) {
  let { verses, isLoading, error } = useChapterText(bookName, chapter);
  let colors = useColors();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <ActivityIndicator size="small" color={colors.textSecondary} />
        <Text style={{ marginTop: 8, color: colors.textSecondary }}>
          Loading verses...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{ color: colors.error, marginBottom: 12, textAlign: "center" }}
        >
          {error}
        </Text>
        <Pressable
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.buttonPrimary,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: colors.buttonPrimaryText, fontWeight: "600" }}>
            Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      {verses.map((item) => (
        <VerseRow
          key={item.verse}
          bookName={bookName}
          chapter={chapter}
          verse={item.verse}
          text={item.text}
          onPress={onVersePress}
        />
      ))}
    </View>
  );
}
