import { useState } from "react";
import { submitFace } from "../services/faceService";

export default function useFace() {
  const [loading, setLoading] = useState(false);

  async function upload(
    mode: string,
    image: string
  ) {
    try {
      setLoading(true);

      return await submitFace(mode, image);

    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    upload,
  };
}