export type FaceMode =
  | "registration"
  | "liveness"
  | "verification";

export interface FaceRequest {
  image: string;
}

export interface FaceResponse {
  success: boolean;
  message: string;

  data?: {
    score?: number;
    token?: string;
    user?: any;
  };
}