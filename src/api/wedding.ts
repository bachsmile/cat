import api from "./client";

export const weddingApi = {
  createOrder: (data: any) => api.post("/wedding/orders", data),
  getMyOrders: () => api.get("/wedding/my-orders"),
  getOrderInvitations: (orderId: string) =>
    api.get(`/wedding/orders/${orderId}/invitations`),
  getPublicInvitation: (code: string) => api.get(`/wedding/invitation/${code}`),
  getAdminOrders: () => api.get("/wedding/admin/orders"),
  getAdminOrderDetail: (id: string) => api.get(`/wedding/admin/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    api.patch(`/wedding/orders/${id}/status`, { status }),
  validateGuests: (guests: any[]) =>
    api.post("/wedding/validate-guests", { guests }),
};
