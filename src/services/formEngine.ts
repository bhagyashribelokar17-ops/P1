import { FORM_CONFIGS } from "../config/formConfigs";
import { executeAction } from "./actionExecutor";
import { navigateTo } from "./navigationService";

export async function submitForm(
  formKey: keyof typeof FORM_CONFIGS,
  data: unknown
) {
  const config = FORM_CONFIGS[formKey];

  const { response, next } = await executeAction(
    config.action,
    data
  );

  if (!response.success) {
    throw new Error(response.message ?? "Request failed.");
  }

  return {
    response,
    next,
  };
}

export function completeForm(next?: string) {
  navigateTo(next as never);
}