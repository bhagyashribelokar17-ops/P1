export const FACE_CONFIG = {
  registration: {
    title: "Face Registration",
    instruction: "Position your face inside the frame.",
    action: "faceRegistration",
  },

  liveness: {
    title: "Face Liveness",
    instruction:
      "Look straight at the camera and keep your face inside the frame.",
    action: "faceLiveness",
  },

  verification: {
    title: "Face Verification",
    instruction:
      "Verify your identity by capturing your face.",
    action: "faceVerification",
  },
} as const;