import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  start: boolean;
  onComplete: () => void;
};

export default function CaptureCountdown({
  start,
  onComplete,
}: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!start) {
      setCount(null);
      return;
    }

    setCount(3);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === null) return null;

        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return null;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, onComplete]);

  if (count === null) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  count: {
    fontSize: 90,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});