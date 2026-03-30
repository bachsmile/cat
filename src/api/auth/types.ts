export interface ApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
}

export type Role = "user" | "admin" | "moderator" | "manager" | "guest" | "lawyer";

export const Roles = {
  USER: "user" as Role,
  ADMIN: "admin" as Role,
  MODERATOR: "moderator" as Role,
  MANAGER: "manager" as Role,
  GUEST: "guest" as Role,
  LAWYER: "lawyer" as Role,
};

export interface UserInfo {
  id?: number;
  email: string;
  role: Role;
  username?: string;
  modules?: string[];
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
  modules?: string[];
  subscriptionPlan?: string;
  subscriptionExpiresAt?: Date;
}

export interface RegisterResponse {
  message: string;
  user: UserInfo;
  token?: string;
  access_token?: string;
}
