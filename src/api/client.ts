import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the token if it exists
api.interceptors.request.use(
  (config) => {
    // Auth Token chính
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Token ví cấp 2 (nếu có asset đang active)
    // CHỈ gán nếu chưa có header này (để cho phép override thủ công)
    if (!config.headers["X-Wallet-Token"]) {
      const activeAsset = localStorage.getItem("active_wallet_asset");
      if (activeAsset) {
        const walletToken = localStorage.getItem(`wallet_token_${activeAsset}`);
        if (walletToken) {
          config.headers["X-Wallet-Token"] = walletToken;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Flags for refresh logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle token expiration & wallet error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 for main token (ignore if it's already a refresh attempt or login)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refresh_token: refreshToken },
          );
          const { access_token, refresh_token: newRefreshToken } = res.data;

          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh_token", newRefreshToken);

          api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          processQueue(null, access_token);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // Redirect to login or clear session
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/#/";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Wallet-specific errors from backend WalletGuard
      const msg = error.response.data?.message;
      const isWalletErrorStr = typeof msg === "string" && (
        msg.toLowerCase().includes("mã bảo mật") || 
        msg.toLowerCase().includes("wallet") ||
        msg.toLowerCase().includes("chưa cấu hình mật mã ví")
      );
      
      const isWalletEndpoint = error.config?.url?.includes("/wallet/");

      if (isWalletErrorStr && isWalletEndpoint) {
        const activeAsset = localStorage.getItem("active_wallet_asset");
        if (activeAsset) {
          localStorage.removeItem(`wallet_token_${activeAsset}`);
          localStorage.removeItem("active_wallet_asset");
          window.dispatchEvent(
            new CustomEvent("wallet-token-expired", {
              detail: { asset: activeAsset },
            }),
          );
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
