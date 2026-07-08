import { CameraView } from "expo-camera";

export async function capturePhoto(
  camera: CameraView | null
) {
  if (!camera) {
    throw new Error("Camera is not ready.");
  }

  const photo = await camera.takePictureAsync({
    quality: 0.8,
    base64: true,
    skipProcessing: true,
  });

  if (!photo.base64) {
    throw new Error("Failed to capture image.");
  }

  return {
    uri: photo.uri,
    base64: photo.base64,
  };
}