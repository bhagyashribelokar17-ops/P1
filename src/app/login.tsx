import { router } from "expo-router";
import { View } from "react-native";

import AppButton from "../components/AppButton";
import DynamicForm from "../components/DynamicForm";

export default function Login() {
  return (
    <View style={{ flex: 1 }}>
      <DynamicForm formKey="login" />

      <AppButton
        title="Test Face Liveness"
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