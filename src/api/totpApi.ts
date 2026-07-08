import { ENDPOINTS } from "../config/endpoints";
import {
  TotpSetupResponse,
  TotpVerifyRequest,
  TotpVerifyResponse,
} from "../types/totp";
import apiClient from "./apiClient";

export const setupTotp = async (): Promise<TotpSetupResponse> => {
  const response = await apiClient.get(ENDPOINTS.TOTP.SETUP);
  return response.data;
};

export const verifyTotp = async (
  data: TotpVerifyRequest
): Promise<TotpVerifyResponse> => {
  const response = await apiClient.post(
    ENDPOINTS.TOTP.VERIFY,
    data
  );

  return response.data;
};