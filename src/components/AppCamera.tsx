import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import {
  forwardRef,
  useEffect,
} from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AppCamera = forwardRef<CameraView>((_, ref) => {
  const [permission, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (!permission) return;

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Camera permission is required.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>
            Grant Permission
          </Text>
        </TouchableOpacity>

        {Platform.OS === "web" && (
          <Text style={styles.webText}>
            If nothing happens, allow camera access
            from your browser address bar.
          </Text>
        )}
      </View>
    );
  }

  return (
    <CameraView
      ref={ref}
      style={styles.camera}
      facing="front"
    />
  );
});

export default AppCamera;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },

  message: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  webText: {
    marginTop: 20,
    color: "#aaa",
    textAlign: "center",
  },
});