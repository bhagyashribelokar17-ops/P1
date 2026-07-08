import { FaceMode } from "../types/face";

export const FACE_CONFIG: Record<
  FaceMode,
  {
    title: string;
    button: string;
    endpoint: string;
    next: string;
  }
> = {
  registration: {
    title: "Face Registration",
    button: "Register Face",
    endpoint: "REGISTER",
    next: "/totp/setup",
  },

  liveness: {
    title: "Face Liveness",
    button: "Verify Face",
    endpoint: "LIVENESS",
    next: "/face/verification",
  },

  verification: {
    title: "Face Verification",
    button: "Continue",
    endpoint: "VERIFY",
    next: "/totp/verify",
  },
};