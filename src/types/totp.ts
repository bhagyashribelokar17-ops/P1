export interface TotpSetupResponse {
  success: boolean;
  secret: string;
  qrCode: string;
}

export interface TotpVerifyRequest {
  code: string;
}

export interface TotpVerifyResponse {
  success: boolean;
  message: string;
}