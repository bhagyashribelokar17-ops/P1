import { router } from "expo-router";
import { ROUTES } from "../config/routes";

/**
 * All valid navigation keys.
 * Example:
 * "login"
 * "signup"
 * "face-registration"
 * "face-liveness"
 * ...
 */
export type AppRoute = keyof typeof ROUTES;

export function navigateTo(step?: AppRoute) {
  if (!step) return;

  const route = ROUTES[step];

  if (!route) {
    console.warn(`Unknown route: ${step}`);
    return;
  }

  router.push(route as never);
}