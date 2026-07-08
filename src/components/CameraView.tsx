import { CameraView } from "expo-camera";
import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";

const AppCamera = forwardRef<CameraView>((props, ref) => {
  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        facing="front"
        style={styles.camera}
      />
    </View>
  );
});

export default AppCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
  },

  camera: {
    flex: 1,
  },
});