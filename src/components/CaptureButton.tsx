import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface Props {
  loading?: boolean;
  onPress: () => void;
}

export default function CaptureButton({
  loading = false,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      disabled={loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Capture Face</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});