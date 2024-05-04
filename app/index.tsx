import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming soon...</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.body}>Free resources for memorizing scripture</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
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
