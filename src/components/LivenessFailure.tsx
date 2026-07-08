import { StyleSheet, Text, View } from "react-native";
import AppButton from "./AppButton";

type Props = {
  onRetry: () => void;
};

export default function LivenessFailure({
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>
        STEP 2 OF 3 • TRY AGAIN
      </Text>

      <Text style={styles.title}>
        We lost your face
      </Text>

      <Text style={styles.subtitle}>
        Move to a well-lit spot and
        keep your face inside the frame.
      </Text>

      <View style={styles.warning}>
        <Text style={styles.icon}>!</Text>
      </View>

      <AppButton
        title="Restart Scan"
        onPress={onRetry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#17213B",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  step: {
    color: "#FBBF24",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 24,
  },

  warning: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FBBF24",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },

  icon: {
    color: "#111",
    fontSize: 34,
    fontWeight: "700",
  },
});