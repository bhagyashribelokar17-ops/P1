import { StyleSheet, Text, View } from "react-native";

interface Props {
  mode?: "registration" | "verification" | "liveness";
}

export default function FaceGuide({
  mode = "liveness",
}: Props) {
  const instruction = {
    registration:
      "Center your face inside the frame to register.",
    verification:
      "Look directly at the camera for verification.",
    liveness:
      "Keep your face inside the frame and remain still.",
  }[mode];

  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Dark Overlay */}
      <View style={styles.topShade} />

      <View style={styles.middle}>
        <View style={styles.sideShade} />

        {/* Face Frame */}
        <View style={styles.faceFrame} />

        <View style={styles.sideShade} />
      </View>

      <View style={styles.bottomShade}>
        <Text style={styles.text}>
          {instruction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
  },

  topShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  middle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sideShade: {
    flex: 1,
    height: 300,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  faceFrame: {
    width: 230,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: "#2563EB",
    backgroundColor: "transparent",
  },

  bottomShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});