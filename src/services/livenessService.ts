import apiClient from "../api/apiClient";
import { ENDPOINTS } from "../config/endpoints";

export async function verifyLiveness(image: string) {
  const response = await apiClient.post(
    ENDPOINTS.FACE.LIVENESS,
    {
      image,
    }
  );

  return {
    response: response.data,
    next: "face-verification" as const,
  };
}