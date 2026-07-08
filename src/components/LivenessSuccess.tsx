import { StyleSheet, Text, View } from "react-native";
import AppButton from "./AppButton";

type Props = {
  onContinue: () => void;
};

export default function LivenessSuccess({
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>
        STEP 3 OF 3 • VERIFIED
      </Text>

      <Text style={styles.title}>
        You're confirmed
      </Text>

      <Text style={styles.subtitle}>
        Liveness check passed.
        {"\n"}
        This photo will be matched against your ID.
      </Text>

      <View style={styles.successIcon}>
        <Text style={styles.tick}>✓</Text>
      </View>

      <AppButton
        title="Continue"
        onPress={onContinue}
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
    color: "#38D39F",
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

  successIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },

  tick: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "700",
  },
});