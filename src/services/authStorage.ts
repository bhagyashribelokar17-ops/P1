import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const TOTP_TOKEN = "totp_token";
const AUTH_USER = "auth_user";

const isWeb = Platform.OS === "web";

async function setItem(
  key: string,
  value: string
) {
  if (isWeb) {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string) {
  if (isWeb) {
    return localStorage.getItem(key);
  }

  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string) {
  if (isWeb) {
    localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

/* ===========================
   ACCESS & REFRESH TOKENS
=========================== */

export async function saveTokens(
  accessToken: string,
  refreshToken: string
) {
  await setItem(ACCESS_TOKEN, accessToken);
  await setItem(REFRESH_TOKEN, refreshToken);
}

export async function getAccessToken() {
  return getItem(ACCESS_TOKEN);
}

export async function getRefreshToken() {
  return getItem(REFRESH_TOKEN);
}

export async function clearTokens() {
  await deleteItem(ACCESS_TOKEN);
  await deleteItem(REFRESH_TOKEN);
}

/* ===========================
   TOTP TOKEN
=========================== */

export async function saveTotpToken(
  token: string
) {
  await setItem(TOTP_TOKEN, token);
}

export async function getTotpToken() {
  return getItem(TOTP_TOKEN);
}

export async function clearTotpToken() {
  await deleteItem(TOTP_TOKEN);
}

/* ===========================
   USER
=========================== */

export async function saveUser(
  user: unknown
) {
  await setItem(
    AUTH_USER,
    JSON.stringify(user)
  );
}

export async function getUser<T = unknown>(): Promise<T | null> {
  const raw = await getItem(AUTH_USER);

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as T;
}

export async function clearUser() {
  await deleteItem(AUTH_USER);
}

/* ===========================
   CLEAR EVERYTHING
=========================== */

export async function clearAuthStorage() {
  await clearTokens();
  await clearTotpToken();
  await clearUser();
}