import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
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
    const activeAsset = localStorage.getItem("active_wallet_asset");
    if (activeAsset) {
      const walletToken = localStorage.getItem(`wallet_token_${activeAsset}`);
      if (walletToken) {
        config.headers["X-Wallet-Token"] = walletToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle wallet token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Nếu là lỗi liên quan đến ví (giả sử backend trả về 403 hoặc 401 với msg cụ thể)
      const isWalletError =
        error.response.data?.message?.toLowerCase().includes("wallet") ||
        error.config.headers["X-Wallet-Token"];

      if (isWalletError) {
        const activeAsset = localStorage.getItem("active_wallet_asset");
        if (activeAsset) {
          localStorage.removeItem(`wallet_token_${activeAsset}`);
          localStorage.removeItem("active_wallet_asset");
          // Emit event or reload to kick out
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
