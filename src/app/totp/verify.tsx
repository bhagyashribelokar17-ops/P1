import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
} from "react-native";

import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { executeAction } from "../../services/actionExecutor";
import { navigateTo } from "../../services/navigationService";

export default function TotpVerifyScreen() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp.trim()) {
      Alert.alert("Validation", "Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const { response, next } = await executeAction(
        "totpVerify",
        {
          otp,
        }
      );

      if (!response.success) {
        Alert.alert(
          "Verification Failed",
          response.message || "Invalid OTP."
        );
        return;
      }

      navigateTo(next);

    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Verify OTP
      </Text>

      <Text style={styles.subtitle}>
        Enter the 6-digit code from your Authenticator app.
      </Text>

      <AppInput
        label="OTP"
        placeholder="123456"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <AppButton
        title="Verify"
        loading={loading}
        onPress={handleVerify}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    fontSize: 16,
  },
});