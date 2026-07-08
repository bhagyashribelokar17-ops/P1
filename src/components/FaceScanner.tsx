import { CameraView } from "expo-camera";

// Full-screen dark overlay with a transparent elliptical opening
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

const OVAL_WIDTH = 240;
const OVAL_HEIGHT = 330;

const FaceScanner = forwardRef<CameraView>((_, ref) => {
  const scanAnim = useRef(
    new Animated.Value(0)
  ).current;

  const pulseAnim = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -OVAL_HEIGHT / 2 + 25,
      OVAL_HEIGHT / 2 - 25,
    ],
  });

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        facing="front"
        style={StyleSheet.absoluteFill}
      />

      <View
        pointerEvents="none"
        style={styles.overlay}
      />

      <View
        pointerEvents="none"
        style={styles.center}
      >
        <Animated.View
          style={[
            styles.oval,
            {
              transform: [
                {
                  scale: pulseAnim,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.corner,
              styles.topLeft,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.topRight,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.bottomLeft,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.bottomRight,
            ]}
          />

          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
});

export default FaceScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 28,
    backgroundColor: "#000",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  center: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },

  oval: {
    width: OVAL_WIDTH,
    height: OVAL_HEIGHT,

    borderRadius: OVAL_HEIGHT / 2,

    borderWidth: 3,
    borderColor: "#22C55E",

    overflow: "hidden",

    backgroundColor: "transparent",

    shadowColor: "#22C55E",
    shadowOpacity: 0.9,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 16,
  },

  scanLine: {
    position: "absolute",

    left: 18,
    right: 18,

    height: 4,

    borderRadius: 4,

    backgroundColor: "#22C55E",

    shadowColor: "#22C55E",
    shadowOpacity: 1,
    shadowRadius: 12,

    elevation: 12,
  },

  corner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "#22C55E",
  },

  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 18,
  },

  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 18,
  },

  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 18,
  },

  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 18,
  },
});