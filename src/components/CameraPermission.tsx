import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onGrant: () => void;
}

export default function CameraPermission({
  onGrant,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Camera permission is required
      </Text>

      <Pressable
        style={styles.button}
        onPress={onGrant}
      >
        <Text style={styles.buttonText}>
          Grant Permission
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});