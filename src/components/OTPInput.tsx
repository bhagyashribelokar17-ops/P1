import { StyleSheet, TextInput } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function OTPInput({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Enter 6-digit OTP"
      keyboardType="number-pad"
      maxLength={6}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 16,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 24,
  },
});