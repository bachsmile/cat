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
}) => {
  const response = await client.post("/wallet/transactions", data);
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
