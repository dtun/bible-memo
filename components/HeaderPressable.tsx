import { forwardRef } from "react";
import { Pressable } from "react-native";

import { Text } from "@/components/Themed";

let HeaderPressable = forwardRef(function HeaderPressable(
  {
    onPress,
    title,
  }: {
    onPress?: () => void;
    title: string;
  },
  _ref
) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Text style={{ opacity: pressed ? 0.5 : 1 }}>{title}</Text>
      )}
    </Pressable>
  );
});

export { HeaderPressable };
