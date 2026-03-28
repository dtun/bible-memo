import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useChapterText } from "@/hooks/chapterText";
import { useColors } from "@/components/Themed";

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
  let colors = useColors();

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
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
        style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
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
        <Pressable
          key={item.verse}
          testID={`verse-row-${item.verse}`}
          style={{ flexDirection: "row", paddingVertical: 4, paddingHorizontal: 16 }}
          onPress={() => onVersePress(item.verse)}
        >
          <Text
            style={{
              fontWeight: "700",
              color: colors.textTertiary,
              width: 30,
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {item.verse}
          </Text>
          <Text style={{ flex: 1, fontSize: 16, lineHeight: 24, color: colors.text }}>
            {item.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
