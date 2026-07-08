import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { useState } from "react";
import {
    Controller,
    FieldValues,
    useForm,
} from "react-hook-form";
import {
    Alert,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AppButton from "./AppButton";
import AppDatePicker from "./AppDatePicker";
import AppInput from "./AppInput";

import { FORM_CONFIGS } from "../config/formConfigs";
import { executeAction } from "../services/actionExecutor";
import { navigateTo } from "../services/navigationService";

import { useAuth } from "../context/AuthContext";
import { saveTokens } from "../services/authStorage";
import { AuthResponse } from "../types/auth";
interface Props {
  formKey: keyof typeof FORM_CONFIGS;
}

export default function DynamicForm({
  formKey,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { login: setAuthSession } = useAuth();

  const config = FORM_CONFIGS[formKey];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(config.schema) as any,
    defaultValues: config.fields.reduce(
      (acc: Record<string, any>, field: any) => {
        acc[field.name] = "";
        return acc;
      },
      {}
    ),
  });

  const onSubmit = async (data: FieldValues) => {
  try {
    setLoading(true);

    const payload =
      formKey === "login"
        ? { username: data.email, password: data.password }
        : formKey === "signup"
        ? { ...data, username: data.email.split("@")[0] }
        : data;

    const { response } = await executeAction(
      config.action as any,
      payload
    );

    console.log("Response:", response);

    // ==========================
    // Signup
    // ==========================
    if (formKey === "signup") {
      if (response?.access && response?.refresh) {
        await saveTokens(
          response.access,
          response.refresh
        );
      }

      Alert.alert(
        "Account Created",
        "Your account has been created successfully."
      );

      navigateTo("login");
      return;
    }

    // ==========================
    // Login
    // ==========================
    if (formKey === "login") {
      const loginResponse = response as AuthResponse;

      if (
        loginResponse?.access_token &&
        loginResponse?.refresh_token
      ) {
        await saveTokens(
          loginResponse.access_token,
          loginResponse.refresh_token
        );
      }

      if (loginResponse?.user) {
        setAuthSession(
          loginResponse.access_token,
          loginResponse.user
        );
      }

      // TOTP Enabled
      if (loginResponse?.user?.totp_enabled) {
        navigateTo("totp-verify");
        return;
      }

      // Continue to Face Liveness
      navigateTo("face-liveness");
      return;
    }
  } catch (error: any) {
    console.log(error?.response?.data);

    Alert.alert(
      "Error",
      error?.response?.data?.message ??
        error?.message ??
        "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      {!!config.title && (
        <Text style={styles.title}>
          {config.title}
        </Text>
      )}

      {!!config.subtitle && (
        <Text style={styles.subtitle}>
          {config.subtitle}
        </Text>
      )}

      {config.fields.map((field: any) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name as any}
          render={({ field: input }) =>
            field.type === "date" ? (
              <AppDatePicker
                label={field.label}
                placeholder={field.placeholder}
                value={input.value ?? ""}
                onChangeText={input.onChange}
                error={
                  ((errors as Record<string, any>)[field.name]
                    ?.message as string) ?? ""
                }
              />
            ) : (
              <AppInput
                label={field.label}
                placeholder={field.placeholder}
                value={input.value ?? ""}
                onChangeText={input.onChange}
                keyboardType={field.keyboardType as any}
                secureTextEntry={field.secureTextEntry}
                error={
                  ((errors as Record<string, any>)[field.name]
                    ?.message as string) ?? ""
                }
              />
            )
          }
        />
      ))}

      <AppButton
        title={config.buttonTitle}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />

      {config.footerRoute && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {config.footerText}{" "}
          </Text>

          <Link
            href={config.footerRoute as any}
            style={styles.footerLink}
          >
            {config.footerLinkText}
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
    paddingHorizontal: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 24,
  },

  footerText: {
    fontSize: 15,
    color: "#6B7280",
  },

  footerLink: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563EB",
  },
});