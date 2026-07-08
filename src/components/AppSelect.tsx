import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
}

export default function AppSelect({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  const data = options.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selected}
        data={data}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder="Select Degree"
        value={value}
        onChange={(item) => onChange(item.value)}
      />

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  dropdown: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },

  placeholder: {
    color: "#9CA3AF",
    fontSize: 16,
  },

  selected: {
    color: "#111827",
    fontSize: 16,
  },

  error: {
    color: "#EF4444",
    marginTop: 6,
    fontSize: 13,
  },
});