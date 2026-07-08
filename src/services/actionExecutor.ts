import apiClient from "../api/apiClient";
import { AUTH_ACTIONS } from "../config/authActions";

export async function executeAction<
  TResponse = any,
  TPayload = any
>(
  actionName: keyof typeof AUTH_ACTIONS,
  payload?: TPayload
) {
  const action = AUTH_ACTIONS[actionName];

  if (!action) {
    throw new Error(`Unknown action: ${String(actionName)}`);
  }

  console.log("================================");
  console.log("Executing Action:", actionName);
  console.log("Endpoint:", action.endpoint);
  console.log("Method:", action.method);
  console.log("Payload:", payload);

  try {
    const response = await apiClient.request<TResponse>({
      url: action.endpoint,
      method: action.method,
      data: payload,
      headers: action.headers,
    });

    console.log("HTTP Status:", response.status);
    console.log("Response Data:", response.data);
    console.log("Next Route:", action.next);
    console.log("================================");

    return {
      response: response.data,
      next: action.next,
    };
  } catch (error: any) {
    console.log("================================");
    console.log("Request Failed");
    console.log("Status:", error?.response?.status);
    console.log("Response:", error?.response?.data);
    console.log("Message:", error?.message);
    console.log("================================");

    throw error;
  }
}