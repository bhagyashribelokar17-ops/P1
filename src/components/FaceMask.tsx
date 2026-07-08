import { StyleSheet, View } from "react-native";

const OVAL_WIDTH = 240;
const OVAL_HEIGHT = 330;

export default function FaceMask() {
  return (
    <View
      pointerEvents="none"
      style={styles.container}
    >
      <View style={styles.top} />

      <View style={styles.middle}>
        <View style={styles.side} />

        <View style={styles.cutout} />

        <View style={styles.side} />
      </View>

      <View style={styles.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  top: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  middle: {
    height: OVAL_HEIGHT,
    flexDirection: "row",
  },

  side: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  cutout: {
    width: OVAL_WIDTH,
    height: OVAL_HEIGHT,
    borderRadius: OVAL_HEIGHT / 2,
    backgroundColor: "transparent",
  },

  bottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
});