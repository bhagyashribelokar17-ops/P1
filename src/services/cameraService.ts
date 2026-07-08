import { CameraView } from "expo-camera";

export async function capturePhoto(
  camera: CameraView | null
) {
  if (!camera) {
    throw new Error("Camera is not ready.");
  }

  try {
    const photo = await camera.takePictureAsync({
      quality: 1,
      base64: true,
      skipProcessing: true,
    });

    if (!photo) {
      throw new Error("Unable to capture photo.");
    }

    if (!photo.base64) {
      throw new Error("Failed to generate Base64 image.");
    }

    return {
      uri: photo.uri,
      base64: photo.base64,
      dataUri: `data:image/jpeg;base64,${photo.base64}`,
    };
  } catch (error) {
    console.error("Capture Error:", error);
    throw error;
  }
}