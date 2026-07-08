import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AppButton from "../../components/AppButton";
import { executeAction } from "../../services/actionExecutor";
import { navigateTo } from "../../services/navigationService";

export default function TotpSetupScreen() {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");

  const handleSetup = async () => {
    try {
      setLoading(true);

      const { response, next } = await executeAction(
        "totpSetup",
        {}
      );

      if (!response.success) {
        Alert.alert(
          "TOTP Setup",
          response.message || "Unable to setup TOTP."
        );
        return;
      }

      if (response.data?.qrCode) {
        setQrCode(response.data.qrCode);
      }

      if (next) {
        navigateTo(next);
      }
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
        Two-Factor Authentication
      </Text>

      <Text style={styles.subtitle}>
        Scan the QR code using Google Authenticator or Microsoft Authenticator.
      </Text>

      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : qrCode ? (
          <Image
            source={{ uri: qrCode }}
            style={styles.qrImage}
          />
        ) : (
          <Text>No QR Code Generated</Text>
        )}
      </View>

      <AppButton
        title="Generate QR Code"
        loading={loading}
        onPress={handleSetup}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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

  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    minHeight: 250,
  },

  qrImage: {
    width: 220,
    height: 220,
  },
});