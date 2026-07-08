import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress: () => void;
}

export default function RetakeButton({
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>Retake</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    alignItems: "center",
  },

  text: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 16,
  },
});