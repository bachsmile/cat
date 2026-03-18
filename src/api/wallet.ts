import client from "./client";

export const setWalletPassword = async (
  assetSymbol: string,
  password: string,
) => {
  const response = await client.post("/wallet/password", {
    assetSymbol,
    password,
  });
  return response.data;
};

export const unlockWallet = async (assetSymbol: string, password: string) => {
  const response = await client.post("/wallet/unlock", {
    assetSymbol,
    password,
  });
  return response.data;
};

export const getWalletStatus = async (assetSymbol: string) => {
  const response = await client.get(`/wallet/status/${assetSymbol}`);
  return response.data;
};

// Transaction APIs
export const getWalletTransactions = async (assetSymbol: string) => {
  const response = await client.get(`/wallet/transactions/${assetSymbol}`);
  return response.data;
};

export const createWalletTransaction = async (data: {
  assetSymbol: string;
  type: string;
  quantity: number;
  price?: number;
  total?: number;
  avgBuyPriceAtTime?: number;
  profitAmount?: number;
  source?: string;
}, walletToken?: string) => {
  const config = walletToken ? { headers: { "X-Wallet-Token": walletToken } } : {};
  const response = await client.post("/wallet/transactions", data, config);
  return response.data;
};

export const updateWalletTransaction = async (
  assetSymbol: string,
  id: string,
  data: {
    quantity?: number;
    price?: number;
    total?: number;
  },
) => {
  const response = await client.put(
    `/wallet/transactions/${assetSymbol}/${id}`,
    data,
  );
  return response.data;
};

export const deleteWalletTransaction = async (
  assetSymbol: string,
  id: string,
) => {
  const response = await client.delete(
    `/wallet/transactions/${assetSymbol}/${id}`,
  );
  return response.data;
};

export const getWalletStats = async (assetSymbol: string) => {
  const response = await client.get(`/wallet/stats/${assetSymbol}`);
  return response.data;
};

export const getPortfolioSummary = async () => {
  const response = await client.get("/wallet/portfolio/summary");
  return response.data;
};

export const getSavings = async () => {
  const response = await client.get("/wallet/savings");
  return response.data;
};

export const createSavings = async (data: any) => {
  const response = await client.post("/wallet/savings", data);
  return response.data;
};

export const getSavingsSummary = async () => {
  const response = await client.get("/wallet/savings/summary");
  return response.data;
};

export const withdrawSavings = async (id: string) => {
  const response = await client.post(`/wallet/savings/${id}/withdraw`);
  return response.data;
};

// Storage Wallet APIs
export const getStorage = async () => {
  const response = await client.get("/wallet/storage");
  return response.data;
};

export const createStorage = async (data: any) => {
  const response = await client.post("/wallet/storage", data);
  return response.data;
};

export const withdrawFromStorage = async (id: string) => {
  const response = await client.post(`/wallet/storage/${id}/withdraw`);
  return response.data;
};

export const adjustStorage = async (id: string, data: any) => {
  const response = await client.post(`/wallet/storage/${id}/adjust`, data);
  return response.data;
};

export const getStorageHistory = async (id: string) => {
  const response = await client.get(`/wallet/storage/${id}/history`);
  return response.data;
};

export const updateStorageInitialQuantity = async (
  id: string,
  initialQuantity: number,
) => {
  const response = await client.post(`/wallet/storage/${id}/initial`, {
    initialQuantity,
  });
  return response.data;
};

export const deleteStorage = async (id: string) => {
  const response = await client.delete(`/wallet/storage/${id}`);
  return response.data;
};

export const deleteStorageHistory = async (id: string) => {
  const response = await client.delete(`/wallet/storage/history/${id}`);
  return response.data;
};

export const updateStorageHistory = async (
  id: string,
  data: { note?: string; amount?: number },
) => {
  const response = await client.patch(`/wallet/storage/history/${id}`, data);
  return response.data;
};

export const clearAllWalletData = async () => {
  const response = await client.delete("/wallet/clear-all");
  return response.data;
};
