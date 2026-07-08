import { FORM_CONFIGS } from "../config/formConfigs";

export function shouldSaveSession(
  formKey: keyof typeof FORM_CONFIGS
) {
  return formKey === "login";
}