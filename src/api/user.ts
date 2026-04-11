import api from "./client";

export interface User {
  id: string;
  email: string;
  password?: string;
  role: string;
  displayName?: string;
  avatar?: string;
  status: 'active' | 'suspended';
  joinedDate?: string;
  createdAt?: string;
  loginCount?: number;
  modules?: string[];
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string;
  language?: 'en' | 'vi';
  customerType?: 'individual' | 'business';
  organizationName?: string;
  managedById?: string; // ID của Admin quản lý tài khoản này
  userQuota?: number; // Giới hạn số lượng user dưới quyền
}

export const userApi = {
  getUsers: async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  createUser: async (userData: Partial<User>) => {
    try {
      const response = await api.post("/user", userData);
      return response.data;
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    try {
      const response = await api.patch(`/user/${id}`, userData);
      return response.data;
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  deleteUser: async (id: string) => {
    try {
      const response = await api.delete(`/user/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
      };
    }
  },
};
