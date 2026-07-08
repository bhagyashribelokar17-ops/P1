export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface AuthAction {
  endpoint: string;
  method: HttpMethod;
  next?: string;
  headers?: Record<string, string>;
}