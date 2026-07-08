import { router } from "expo-router";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>
          Biometric Verification
        </Text>

        <Text style={styles.subtitle}>
          Verify your identity using Face Liveness Detection.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/face/[mode]",
              params: {
                mode: "liveness",
              },
            })
          }
        >
          <Text style={styles.buttonText}>
            Start Verification
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#2563EB",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});