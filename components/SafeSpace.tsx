import { View } from "react-native";
import {
  withSafeAreaInsets,
  WithSafeAreaInsetsProps,
} from "react-native-safe-area-context";

function SafeBottom(props: WithSafeAreaInsetsProps) {
  return <View style={{ height: props.insets.bottom }} />;
}

function SafeTop(props: WithSafeAreaInsetsProps) {
  return <View style={{ height: props.insets.top }} />;
}

export let SafeSpace = {
  Top: withSafeAreaInsets(SafeTop),
  Bottom: withSafeAreaInsets(SafeBottom),
};
