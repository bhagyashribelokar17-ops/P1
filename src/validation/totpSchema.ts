import * as yup from "yup";

export const totpSchema = yup.object({
  code: yup
    .string()
    .length(6, "Enter a valid 6-digit code")
    .required("Code is required"),
});