import { executeAction } from "./actionExecutor";

export async function submitFace(
  mode: string,
  image: string
) {
  const actionMap = {
    registration: "faceRegistration",
    liveness: "faceLiveness",
    verification: "faceVerification",
  } as const;

  return executeAction(
    actionMap[mode as keyof typeof actionMap],
    {
      image,
    }
  );
}