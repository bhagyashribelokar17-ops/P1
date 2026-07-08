import { router } from "expo-router";
import { View } from "react-native";
import AppButton from "../../components/AppButton";

export default function FaceIntro() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <AppButton
        title="Start Verification"
        onPress={() =>
          router.push({
            pathname: "/face/[mode]",
            params: {
              mode: "liveness",
            },
          })
        }
      />
    </View>
  );
}