import api from "./client";

export const lawApi = {
  getLawyers: async () => {
    try {
      const response = await api.get("/law/lawyers");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch lawyers:", error);
      return [];
    }
  },

  getSpecialties: async () => {
    try {
      const response = await api.get("/law/specialties");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch specialties:", error);
      return [];
    }
  },

  createLawyer: async (data: {
    userId: string;
    specialty?: string;
    bio?: string;
  }) => {
    try {
      const response = await api.post("/law/lawyers", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to create lawyer",
      };
    }
  },

  updateLawyer: async (id: string, data: any) => {
    try {
      const response = await api.patch(`/law/lawyers/${id}`, data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to update lawyer",
      };
    }
  },

  deleteLawyer: async (id: string) => {
    try {
      const response = await api.delete(`/law/lawyers/${id}`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to delete lawyer",
      };
    }
  },

  createAppointment: async (data: any) => {
    try {
      const response = await api.post("/law/appointments", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to book appointment",
      };
    }
  },

  quickBooking: async (data: any) => {
    try {
      const response = await api.post("/law/appointments/quick", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to find available lawyer",
      };
    }
  },

  getMyAppointments: async () => {
    try {
      const response = await api.get("/law/appointments/my");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch my appointments:", error);
      return [];
    }
  },

  getLawyerAppointments: async (id: string, date: string) => {
    try {
      const response = await api.get(`/law/appointments/lawyer/${id}/${date}`);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch lawyer appointments:", error);
      return [];
    }
  },

  getAppointments: async () => {
    try {
      const response = await api.get("/law/appointments");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch appointments:", error);
      return [];
    }
  },

  confirmAppointment: async (id: string) => {
    try {
      const response = await api.patch(`/law/appointments/${id}/confirm`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to confirm appointment",
      };
    }
  },

  cancelAppointment: async (id: string) => {
    try {
      const response = await api.patch(`/law/appointments/${id}/cancel`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to cancel appointment",
      };
    }
  },
};
