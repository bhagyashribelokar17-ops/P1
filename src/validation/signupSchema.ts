import * as yup from "yup";

export const signupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),

  last_name: yup.string().required("Last name is required"),

  date_of_birth: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Use YYYY-MM-DD format"
    )
    .transform((value) => (value ? value : undefined))
    .notRequired(),

  degree: yup.string().notRequired(),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});
