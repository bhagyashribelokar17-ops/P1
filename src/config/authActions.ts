import { ENDPOINTS } from "./endpoints";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

export interface AuthAction {
  endpoint: string;
  method: HttpMethod;
  next?: keyof typeof import("./routes").ROUTES;
  headers?: Record<string, string>;
}

export const AUTH_ACTIONS: Record<string, AuthAction> = {
  login: {
    endpoint: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    next: "face-liveness",
  },

  signup: {
    endpoint: ENDPOINTS.AUTH.SIGNUP,
    method: "POST",
    next: "login",
  },

  // POST /api/auth/register-face/
  faceRegistration: {
    endpoint: ENDPOINTS.FACE.REGISTER,
    method: "POST",
    next: "face-liveness",
  },

  // Backend has NO separate liveness API.
  // Liveness screen captures the image and uses verify-face.
  faceVerification: {
    endpoint: ENDPOINTS.FACE.VERIFY,
    method: "POST",
    next: "totp-setup",
  },

  totpSetup: {
    endpoint: ENDPOINTS.TOTP.SETUP,
    method: "GET",
    next: "totp-verify",
  },

  totpVerify: {
    endpoint: ENDPOINTS.TOTP.VERIFY,
    method: "POST",
    next: "profile",
  },

  emailVerify: {
    endpoint: ENDPOINTS.EMAIL.VERIFY,
    method: "POST",
    next: "profile",
  },

  profile: {
    endpoint: ENDPOINTS.PROFILE.CREATE,
    method: "POST",
    next: "dashboard",
  },
};