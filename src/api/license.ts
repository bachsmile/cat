import api from "./client";

export interface License {
  id: string;
  licenseKey: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  metadata?: string;
}

export const licenseApi = {
  /**
   * Lấy danh sách tất cả các mã license
   * (Back-end cần có thêm API GET /license, tôi sẽ tạo nó ở bước sau nếu chưa có)
   */
  getAll: async () => {
    const response = await api.get<License[]>("/license");
    return response.data;
  },

  /**
   * Tạo 1 mã license mới
   */
  create: async (data: { expiresAt: Date; metadata?: string }) => {
    const response = await api.post<License>("/license", data);
    return response.data;
  },

  /**
   * Xác thực mã license
   */
  verify: async (licenseKey: string) => {
    const response = await api.post("/license/npm", { licenseKey });
    return response.data;
  },

  /**
   * Cập nhật thông tin license (gia hạn date, metadata...)
   */
  update: async (id: string, data: { expiresAt?: Date; metadata?: string; isActive?: boolean }) => {
    const response = await api.patch<License>(`/license/${id}`, data);
    return response.data;
  },

  /**
   * Xoá license
   */
  delete: async (id: string) => {
    const response = await api.delete(`/license/${id}`);
    return response.data;
  },
};
