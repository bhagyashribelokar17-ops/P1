import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../components/AppButton";
import CaptureCountdown from "../../components/CaptureCountdown";
import FaceScanner from "../../components/FaceScanner";
import FaceTopBar from "../../components/FaceTopBar";
import LivenessFailure from "../../components/LivenessFailure";
import LivenessSuccess from "../../components/LivenessSuccess";
import PrivacyChip from "../../components/PrivacyChip";

import { FACE_CONFIG } from "../../config/faceConfig";
import { executeAction } from "../../services/actionExecutor";
import { capturePhoto } from "../../services/cameraService";
import {
  navigateTo,
  type AppRoute,
} from "../../services/navigationService";

type FaceMode =
  | "registration"
  | "verification"
  | "liveness";

type ScanState =
  | "scanning"
  | "success"
  | "failure";

export default function FaceScreen() {
  const { mode } =
    useLocalSearchParams<{
      mode: FaceMode;
    }>();

  const currentMode =
    (mode ?? "liveness") as FaceMode;

  const [permission, requestPermission] =
    useCameraPermissions();

  const config =
    FACE_CONFIG[currentMode];

  const cameraRef =
    useRef<CameraView>(null);

  const [loading, setLoading] =
    useState(false);

  const [countdown, setCountdown] =
    useState(false);

  const [status, setStatus] =
    useState(
      "Align your face inside the frame"
    );

  const [scanState, setScanState] =
    useState<ScanState>("scanning");

  const [nextRoute, setNextRoute] =
    useState<AppRoute>();

  if (!permission) {
    return <View style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#081224",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Camera permission required
        </Text>

        <AppButton
          title="Grant Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const beginCapture = () => {
    if (loading) return;

    setStatus("Hold still...");
    setCountdown(true);
  };

  const captureFace = async () => {
    try {
      setLoading(true);
      setCountdown(false);

      setStatus("Capturing...");

      const image =
        await capturePhoto(cameraRef.current);

      setStatus("Analyzing...");

      let result: any = null;

      switch (currentMode) {
        case "registration":
          result =
            await executeAction(
              "faceRegistration",
              {
                image: image.base64,
              }
            );
          break;

        case "verification":
        case "liveness":
          result =
            await executeAction(
              "faceVerification",
              {
                image: image.base64,
              }
            );
          break;
      }

      if (!result) {
        throw new Error(
          "Face verification failed."
        );
      }

      const {
        response,
        next,
      } = result;

      console.log(response);

      if (
        response?.success === false
      ) {
        setScanState("failure");
        return;
      }

      setNextRoute(next as AppRoute);
      setScanState("success");
    } catch (error) {
      console.log(error);
      setScanState("failure");
    } finally {
      setLoading(false);
      setCountdown(false);
    }
  };

  if (scanState === "success") {
    return (
      <LivenessSuccess
        onContinue={() => {
          if (nextRoute) {
            navigateTo(nextRoute);
          }
        }}
      />
    );
  }

  if (scanState === "failure") {
    return (
      <LivenessFailure
        onRetry={() => {
          setScanState("scanning");
          setStatus(
            "Align your face inside the frame"
          );
        }}
      />
    );
  }

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

        <View
          style={styles.instructionContainer}
        >
          <Text
            style={styles.instructionTitle}
          >
            Position your face
          </Text>

          <Text
            style={styles.instructionText}
          >
            Place your face inside the oval and
            look directly at the camera.
          </Text>
        </View>

        <CaptureCountdown
          start={countdown}
          onComplete={captureFace}
        />

        <View
          style={styles.statusContainer}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  loading || countdown
                    ? "#22C55E"
                    : "#F59E0B",
              },
            ]}
          />

          <Text style={styles.status}>
            {loading
              ? "Verifying your identity..."
              : countdown
              ? "Capturing..."
              : status}
          </Text>
        </View>
      </View>

      <AppButton
        title={
          loading
            ? "Verifying..."
            : countdown
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

  instructionContainer: {
    position: "absolute",
    top: 24,
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 100,
  },

  instructionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  instructionText: {
    marginTop: 8,
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 12,
  },

  statusContainer: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,

    zIndex: 100,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  status: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});