import api from "../client";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

import { AUTH_URLS } from "./urls";

export const authApi = {
  /**
   * Đăng nhập hệ thống
   */
  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await api.post<LoginResponse>(AUTH_URLS.LOGIN, payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  /**
   * Đăng ký tài khoản mới
   */
  async register(
    payload: RegisterRequest,
  ): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await api.post<RegisterResponse>(
        AUTH_URLS.REGISTER,
        payload,
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },

  /**
   * Đăng nhập dùng thử (Guest)
   */
  async trial(): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await api.get<LoginResponse>(AUTH_URLS.TRIAL);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || null,
        message: error.response?.data?.message || "Trial activation failed",
      };
    }
  },
};
