export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login/",
    SIGNUP: "/auth/register/",
  },

  FACE: {
    REGISTER: "/auth/register-face/",
    VERIFY: "/auth/verify-face/",
  },

  TOTP: {
    SETUP: "/auth/totp-setup/",
    VERIFY: "/auth/totp-login-verify/",
  },

  EMAIL: {
    VERIFY: "/email/verify/",
  },

  PROFILE: {
    CREATE: "/profile",
    UPDATE: "/profile",
    DASHBOARD: "/profile",
  },
} as const;