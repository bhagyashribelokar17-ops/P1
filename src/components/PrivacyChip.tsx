import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function PrivacyChip() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="shield-checkmark"
        size={18}
        color="#22C55E"
      />

      <Text style={styles.text}>
        Your biometric data is encrypted and securely processed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
  },

  text: {
    flex: 1,
    marginLeft: 10,
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },
});