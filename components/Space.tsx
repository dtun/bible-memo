import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "./Themed";

function Space({ height }: { height: number }) {
  return (
    <View darkColor="transparent" lightColor="transparent" style={{ height }} />
  );
}

function SafeSpaceBottom() {
  let { bottom: height } = useSafeAreaInsets();
  return <Space height={height} />;
}

function SafeSpaceTop() {
  let { top: height } = useSafeAreaInsets();
  return <Space height={height} />;
}

export { SafeSpaceBottom, SafeSpaceTop, Space };
