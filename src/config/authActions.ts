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

  faceRegistration: {
    endpoint: ENDPOINTS.FACE.REGISTER,
    method: "POST",
    next: "totp-setup",
  },

  faceLiveness: {
    endpoint: ENDPOINTS.FACE.LIVENESS,
    method: "POST",
    next: "face-verification",
  },

  faceVerification: {
    endpoint: ENDPOINTS.FACE.VERIFY,
    method: "POST",
    next: "totp-verify",
  },

  totpSetup: {
    endpoint: ENDPOINTS.TOTP.SETUP,
    method: "GET",
    next: "totp-verify",
  },

  totpVerify: {
    endpoint: ENDPOINTS.TOTP.VERIFY,
    method: "POST",
    next: "email-verification",
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