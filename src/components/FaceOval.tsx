import { StyleSheet, View } from "react-native";

export default function FaceOval() {
  return (
    <View style={styles.container}>
      <View style={styles.outerGlow} />

      <View style={styles.oval} />

      <View style={styles.scanLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  outerGlow: {
    position: "absolute",
    width: 255,
    height: 330,
    borderRadius: 170,
    backgroundColor: "rgba(34,197,94,0.15)",
  },

  oval: {
    width: 240,
    height: 315,
    borderRadius: 160,
    borderWidth: 4,
    borderColor: "#22C55E",
  },

  scanLine: {
    position: "absolute",
    width: 220,
    height: 3,
    backgroundColor: "#22C55E",
    top: 150,
    borderRadius: 3,
  },
});