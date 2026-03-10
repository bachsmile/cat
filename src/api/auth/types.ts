export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

export type Role = "user" | "admin" | "moderator" | "guest";

export const Roles = {
  USER: "user" as Role,
  ADMIN: "admin" as Role,
  MODERATOR: "moderator" as Role,
  GUEST: "guest" as Role,
};

export interface UserInfo {
  email: string;
  role: Role;
}

export interface LoginResponse {
  access_token: string;
  user: UserInfo;
}

export interface LoginRequest {
  email: string;
  password?: string;
  role?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
  role?: Role;
}

export interface RegisterResponse {
  message: string;
  user: UserInfo;
}
