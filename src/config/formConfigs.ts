import { loginSchema } from "../validation/loginSchema";
import { signupSchema } from "../validation/signupSchema";
import { LOGIN_FORM, SIGNUP_FORM } from "./forms";

export const FORM_CONFIGS = {
  login: {
    title: "Welcome Back",
    subtitle: "Login to continue",

    fields: LOGIN_FORM,
    schema: loginSchema,

    buttonTitle: "Login",
    action: "login",

    footerText: "Don't have an account?",
    footerLinkText: "Create Account",
    footerRoute: "/signup",
  },

  signup: {
    title: "Create Account",
    subtitle: "Create your account",

    fields: SIGNUP_FORM,
    schema: signupSchema,

    buttonTitle: "Register",
    action: "signup",

    footerText: "Already have an account?",
    footerLinkText: "Login",
    footerRoute: "/login",
  },
} as const;