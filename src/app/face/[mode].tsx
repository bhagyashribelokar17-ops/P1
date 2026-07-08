import { CameraView } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../components/AppButton";
import CaptureCountdown from "../../components/CaptureCountdown";
import FaceScanner from "../../components/FaceScanner";
import FaceTopBar from "../../components/FaceTopBar";
import PrivacyChip from "../../components/PrivacyChip";

import { FACE_CONFIG } from "../../config/faceConfig";
import { executeAction } from "../../services/actionExecutor";
import { capturePhoto } from "../../services/cameraService";
import { verifyLiveness } from "../../services/livenessService";
import { navigateTo } from "../../services/navigationService";

type FaceMode =
  | "registration"
  | "verification"
  | "liveness";

export default function FaceScreen() {
  const { mode } =
    useLocalSearchParams<{
      mode: FaceMode;
    }>();

  const currentMode =
    (mode ?? "liveness") as FaceMode;

  const config =
    FACE_CONFIG[currentMode];

  const cameraRef =
    useRef<CameraView>(null);

  const [loading, setLoading] =
    useState(false);

  const [
    startCountdown,
    setStartCountdown,
  ] = useState(false);

  const [status, setStatus] =
    useState(
      "Align your face inside the frame"
    );

  const beginCapture = () => {
    if (loading) return;

    setStatus("Hold still...");
    setStartCountdown(true);
  };

  const captureFace = async () => {
    try {
      setLoading(true);
      setStartCountdown(false);
      setStatus("Capturing...");

      const image =
        await capturePhoto(
          cameraRef.current
        );

      if (!image?.base64) {
        Alert.alert(
          "Error",
          "Unable to capture image."
        );
        return;
      }

      setStatus("Analyzing...");

      let response;
      let next;

      switch (currentMode) {
        case "registration":
          ({
            response,
            next,
          } = await executeAction(
            "faceRegistration",
            {
              image: image.base64,
            }
          ));
          break;

        case "verification":
          ({
            response,
            next,
          } = await executeAction(
            "faceVerification",
            {
              image: image.base64,
            }
          ));
          break;

        default:
          ({
            response,
            next,
          } = await verifyLiveness(
            image.base64
          ));
      }

      console.log(
        "Face API Response:",
        response
      );
            if (
        response?.success === false ||
        response?.is_live === false
      ) {
        setStatus(
          "Verification Failed"
        );

        Alert.alert(
          "Authentication Failed",
          response?.message ??
            "Please try again."
        );

        return;
      }

      setStatus(
        "Verification Successful"
      );

      setTimeout(() => {
        if (next) {
          navigateTo(next);
        }
      }, 1000);
    } catch (error: any) {
      console.log(error);

      setStatus(
        "Verification Failed"
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong."
      );
    } finally {
      setLoading(false);
      setStartCountdown(false);
    }
  };

  return (
    <View style={styles.container}>
      <FaceTopBar />

      <View style={styles.header}>
        <Text style={styles.step}>
          STEP 2 OF 3
        </Text>

        <Text style={styles.title}>
          {config.title}
        </Text>

        <Text style={styles.subtitle}>
          {config.instruction}
        </Text>
      </View>

      <PrivacyChip />

      <View style={styles.cameraCard}>
        <FaceScanner ref={cameraRef} />

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  loading || startCountdown
                    ? "#22C55E"
                    : "#F59E0B",
              },
            ]}
          />

          <Text style={styles.statusText}>
            {loading
              ? "Verifying..."
              : startCountdown
              ? "Capturing..."
              : status}
          </Text>
        </View>

        <CaptureCountdown
          start={startCountdown}
          onComplete={captureFace}
        />
      </View>

      <View style={styles.instructionCard}>
        <Text style={styles.instructionTitle}>
          Instructions
        </Text>

        <View style={styles.instructionRow}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.instruction}>
            Remove sunglasses or hats
          </Text>
        </View>

        <View style={styles.instructionRow}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.instruction}>
            Ensure good lighting
          </Text>
        </View>

        <View style={styles.instructionRow}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.instruction}>
            Keep your head steady
          </Text>
        </View>

        <View style={styles.instructionRow}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.instruction}>
            Look directly at the camera
          </Text>
        </View>
      </View>

      <AppButton
        title={
          loading
            ? "Verifying..."
            : startCountdown
            ? "Capturing..."
            : "Start Verification"
        }
        loading={loading}
        onPress={beginCapture}
      />
    </View>
  );
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081224",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  header: {
    marginTop: 12,
    marginBottom: 20,
  },

  step: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },

  cameraCard: {
    flex: 1,
    minHeight: 520,
    maxHeight: 560,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#111827",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
  },

  statusContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    zIndex: 100,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  instructionCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  instructionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  bullet: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10,
  },

  instruction: {
    flex: 1,
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },
});