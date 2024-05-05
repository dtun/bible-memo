import { View } from "./Themed";

function Space({ height }: { height: number }) {
  return (
    <View darkColor="transparent" lightColor="transparent" style={{ height }} />
  );
}

export { Space };
