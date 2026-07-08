import { router } from "expo-router";
import { ROUTES } from "../config/routes";

export function navigateTo(
  step?: keyof typeof ROUTES
) {
  if (!step) return;

  const route = ROUTES[step];

  if (!route) {
    throw new Error(`Unknown route: ${step}`);
  }

  if (typeof route === "string") {
    router.push(route as never);
    return;
  }

  router.push(route as never);
}