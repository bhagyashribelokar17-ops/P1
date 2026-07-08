import { CameraView } from "expo-camera";
import {
    forwardRef,
    useEffect,
    useRef,
} from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    View,
} from "react-native";

import FaceMask from "./FaceMask";

const FaceScanner = forwardRef<CameraView>((_, ref) => {
  const scanAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        facing="front"
        style={styles.camera}
      />

      <FaceMask />

      <View
        pointerEvents="none"
        style={styles.overlay}
      >
        <View style={styles.oval}>
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  { translateY },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
});

export default FaceScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 28,
    overflow: "hidden",
  },

  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  oval: {
    width: 240,
    height: 330,
    borderRadius: 170,
    borderWidth: 4,
    borderColor: "#22C55E",
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#22C55E",
  },
});