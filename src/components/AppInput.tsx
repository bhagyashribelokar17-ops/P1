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
    marginBottom: 8,
    marginLeft: 2,
  },

  inputWrapper: {
    justifyContent: "center",
  },

  input: {
    width: "100%",
    height: 56,                  // fixed height
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 18,       // more left/right spacing
    paddingVertical: 0,          // center text vertically

    fontSize: 16,
    color: "#111827",

    textAlignVertical: "center", // Android
  },

  inputWithIcon: {
    paddingRight: 50,
  },

  icon: {
    position: "absolute",
    right: 16,
    alignSelf: "center",
  },

  errorBorder: {
    borderColor: "#EF4444",
  },

  error: {
    marginTop: 6,
    marginLeft: 2,
    color: "#EF4444",
    fontSize: 12,
  },
});