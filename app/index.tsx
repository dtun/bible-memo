import { SectionList, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Space } from "@/components/Space";

let sections = [
  {
    title: "Progress",
    data: [
      {
        title: "Badges",
        description: "Earn badges for your progress",
      },
      {
        title: "Weekly Activity",
        description: "Complete the weekly activity to earn badges",
      },
    ],
  },
  {
    title: "Study",
    data: [
      {
        title: "Read the Bible",
        description: "Track your reading progress",
      },
      {
        title: "Old Testament",
        description: "Structure and order of the Hebrew Bible",
      },
      {
        title: "New Testament",
        description: "Structure and order of the New Testament",
      },
      {
        title: "All Verses",
        description: "Learn all the verses in the Bible",
      },
    ],
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={<Space height={16} />}
        sections={sections}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.description}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Space height={16} />}
        SectionSeparatorComponent={() => <Space height={24} />}
        keyExtractor={(item) => item.title}
        style={styles.list}
        contentContainerStyle={styles.container}
        bounces={false}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  container: { flex: 1 },
  list: { width: "100%", alignSelf: "center", paddingHorizontal: 8 },
  content: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
