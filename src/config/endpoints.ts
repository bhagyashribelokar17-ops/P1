export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login/",
    SIGNUP: "/auth/register/",
  },

  FACE: {
    REGISTER: "/face/register",
    LIVENESS: "/face/liveness",
    VERIFY: "/face/verify",
  },

  TOTP: {
    SETUP: "/totp/setup",
    VERIFY: "/totp/verify",
  },

  EMAIL: {
    VERIFY: "/email/verify",
  },

  PROFILE: {
    CREATE: "/profile",
    UPDATE: "/profile",
    DASHBOARD: "/profile", // or "/dashboard" depending on your backend
  },
} as const;