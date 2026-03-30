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

  // Law Applications
  getApplications: async () => {
    try {
      const response = await api.get("/law/applications");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch applications:", error);
      return [];
    }
  },

  getApplication: async (id: string) => {
    try {
      const response = await api.get(`/law/applications/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch application:", error);
      return null;
    }
  },

  createApplication: async (data: any) => {
    try {
      const response = await api.post("/law/applications", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to create application",
      };
    }
  },

  updateApplication: async (id: string, data: any) => {
    try {
      const response = await api.patch(`/law/applications/${id}`, data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to update application",
      };
    }
  },

  deleteApplication: async (id: string) => {
    try {
      const response = await api.delete(`/law/applications/${id}`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to delete application",
      };
    }
  },

  // Submissions (Submitted by users)
  getSubmissions: async () => {
    try {
      const response = await api.get("/law/submissions");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch submissions:", error);
      return [];
    }
  },

  updateSubmissionStatus: async (id: string, data: { status: string; adminNotes?: string }) => {
    try {
      const response = await api.patch(`/law/submissions/${id}/status`, data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to update submission status",
      };
    }
  },

  deleteSubmission: async (id: string) => {
    try {
      const response = await api.delete(`/law/submissions/${id}`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to delete submission",
      };
    }
  },

  // Integration with Advanced Law Scheduler
  generateSchedule: async (data: any) => {
    try {
      const response = await api.post("/law/schedule/generate", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to generate schedule",
      };
    }
  },

  // Law Articles (Library)
  getArticles: async () => {
    try {
      const response = await api.get("/law/articles");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch articles:", error);
      return [];
    }
  },

  getArticle: async (id: string) => {
    try {
      const response = await api.get(`/law/articles/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch article:", error);
      return null;
    }
  },

  createArticle: async (data: any) => {
    try {
      const response = await api.post("/law/articles", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to create article",
      };
    }
  },

  updateArticle: async (id: string, data: any) => {
    try {
      const response = await api.patch(`/law/articles/${id}`, data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to update article",
      };
    }
  },

  deleteArticle: async (id: string) => {
    try {
      const response = await api.delete(`/law/articles/${id}`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to delete article",
      };
    }
  },

  // Law Questions (Q&A)
  getQuestions: async () => {
    try {
      const response = await api.get("/law/questions");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch questions:", error);
      return [];
    }
  },

  getMyQuestions: async () => {
    try {
      const response = await api.get("/law/questions/my");
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch my questions:", error);
      return [];
    }
  },

  createQuestion: async (data: any) => {
    try {
      const response = await api.post("/law/questions", data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to submit question",
      };
    }
  },

  answerQuestion: async (id: string, data: { answer: string }) => {
    try {
      const response = await api.patch(`/law/questions/${id}/answer`, data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to answer question",
      };
    }
  },

  deleteQuestion: async (id: string) => {
    try {
      const response = await api.delete(`/law/questions/${id}`);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Failed to delete question",
      };
    }
  },
};
