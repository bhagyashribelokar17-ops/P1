import { useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import {
    consumePendingRedirect,
    setPendingRedirect,
} from "../services/redirectStore";

const PROTECTED_SEGMENTS = ["dashboard", "profile"];
const GUEST_ONLY_SEGMENTS = ["login", "signup"];

export default function AuthGate({
  children,
}: {
  children: ReactNode;
}) {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isProtectedRoute = PROTECTED_SEGMENTS.includes(
    segments[0] ?? ""
  );

  const isGuestOnlyRoute = GUEST_ONLY_SEGMENTS.includes(
    segments[0] ?? ""
  );

  useEffect(() => {
    if (isLoading) return;

    if (!token && isProtectedRoute) {
      setPendingRedirect(`/${segments.join("/")}`);
      router.replace("/login");
      return;
    }

    if (token && isProtectedRoute) {
      const redirectTo = consumePendingRedirect();

      if (redirectTo && redirectTo !== `/${segments.join("/")}`) {
        router.replace(redirectTo as never);
      }

      return;
    }

    // Already logged in — don't allow going back to login/signup.
    if (token && isGuestOnlyRoute) {
      router.replace("/dashboard");
    }
  }, [
    isLoading,
    token,
    isProtectedRoute,
    isGuestOnlyRoute,
    segments,
    router,
  ]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!token && isProtectedRoute) {
    return null;
  }

  if (token && isGuestOnlyRoute) {
    return null;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
