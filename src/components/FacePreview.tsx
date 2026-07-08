import { Image, StyleSheet } from "react-native";

interface Props {
  uri: string;
}

export default function FacePreview({
  uri,
}: Props) {
  return (
    <Image
      source={{ uri }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 180,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 20,
  },
});