export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  dob: string;
  degree: string;
  email: string;
  password: string;
}

export interface AuthUser {
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  status: boolean;
  last_login: string;
  totp_enabled: boolean;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}