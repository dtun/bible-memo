import { useMemo } from "react";
import { Pressable, SectionList, StyleSheet } from "react-native";
import { Link, type Href } from "expo-router";
import { Text, View, useColors } from "@/components/Themed";
import { Space } from "@/components/Space";

type Item = { title: string; description: string; href: Href };

let sections: { title: string; data: Item[] }[] = [
  {
    title: "Progress",
    data: [
      {
        title: "Badges",
        description: "Earn badges for your progress",
        href: "/me",
      },
      {
        title: "Weekly Activity",
        description: "Complete the weekly activity to earn badges",
        href: "/me",
      },
    ],
  },
  {
    title: "Study",
    data: [
      {
        title: "Read the Bible",
        description: "Track your reading progress",
        href: "/bible",
      },
      {
        title: "Old Testament",
        description: "Structure and order of the Hebrew Bible",
        href: { pathname: "/books", params: { testament: "ot" } },
      },
      {
        title: "New Testament",
        description: "Structure and order of the New Testament",
        href: { pathname: "/books", params: { testament: "nt" } },
      },
      {
        title: "All Verses",
        description: "Learn all the verses in the Bible",
        href: "/books",
      },
    ],
  },
];

export default function HomeScreen() {
  let colors = useColors();

  let s = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        list: { width: "100%", alignSelf: "center", paddingHorizontal: 8 },
        content: {
          backgroundColor: colors.backgroundSecondary,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 20,
          borderRadius: 10,
        },
        title: { fontSize: 16, fontWeight: "bold", color: colors.text },
        sectionTitle: {
          fontSize: 20,
          fontWeight: "bold",
          color: colors.text,
        },
        body: { fontSize: 16, color: colors.textSecondary },
      }),
    [colors]
  );

  return (
    <View style={s.container}>
      <SectionList
        ListHeaderComponent={<Space height={16} />}
        sections={sections}
        renderItem={({ item }) => (
          <Link href={item.href} asChild>
            <Pressable style={s.content}>
              <Text style={s.title}>{item.title}</Text>
              <Text style={s.body}>{item.description}</Text>
            </Pressable>
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={s.sectionTitle}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Space height={16} />}
        SectionSeparatorComponent={() => <Space height={24} />}
        keyExtractor={(item) => item.title}
        style={s.list}
        bounces={false}
      />
    </View>
  );
}
