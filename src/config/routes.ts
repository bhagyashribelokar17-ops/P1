export const ROUTES = {
  login: "/login",

  signup: "/signup",

  "face-registration": {
    pathname: "/face/[mode]",
    params: {
      mode: "registration",
    },
  },

  "face-liveness": {
    pathname: "/face/[mode]",
    params: {
      mode: "liveness",
    },
  },

  "face-verification": {
    pathname: "/face/[mode]",
    params: {
      mode: "verification",
    },
  },

  "totp-setup": "/totp/setup",

  "totp-verify": "/totp/verify",

  "email-verification": "/email-verification",

  profile: "/profile",

  dashboard: "/dashboard",
} as const;