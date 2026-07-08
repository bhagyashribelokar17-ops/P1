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
import { clearTotpToken, getTotpToken, saveTokens } from "../../services/authStorage";
import { navigateTo } from "../../services/navigationService";

export default function TotpVerifyScreen() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
  if (!otp.trim()) {
    Alert.alert(
      "Validation",
      "Please enter the OTP."
    );
    return;
  }

  try {
    setLoading(true);

    const totpToken =
      await getTotpToken();

    if (!totpToken) {
      Alert.alert(
        "Session Expired",
        "Please login again."
      );
      return;
    }

    const { response, next } =
      await executeAction(
        "totpVerify",
        {
          totp_token: totpToken,
          totp_code: Number(otp),
        }
      );

    if (
      response?.access_token &&
      response?.refresh_token
    ) {
      await saveTokens(
        response.access_token,
        response.refresh_token
      );
    }

    await clearTotpToken();

    navigateTo(next);

  } catch (error: any) {
    Alert.alert(
      "Verification Failed",
      error?.response?.data?.message ??
        error?.message ??
        "Invalid OTP."
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
        Enter the code from Google Authenticator
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
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
});