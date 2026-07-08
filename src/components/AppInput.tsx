import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardTypeOptions,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = "default",
}: Props) {
  const [hideText, setHideText] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            secureTextEntry ? styles.inputWithIcon : null,
            error ? styles.errorBorder : null,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hideText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {secureTextEntry && (
          <Pressable
            style={styles.icon}
            onPress={() => setHideText((prev) => !prev)}
            hitSlop={10}
          >
            <Ionicons
              name={hideText ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  inputWrapper: {
    justifyContent: "center",
  },

  input: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#111827",
  },

  inputWithIcon: {
    paddingRight: 44,
  },

  icon: {
    position: "absolute",
    right: 14,
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  error: {
    marginTop: 5,
    color: "#EF4444",
    fontSize: 12,
  },
});
