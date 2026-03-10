import api from "./client";

/**
 * Service to fetch the current estimated P2P price of USDT/VND via Backend
 */
export const getUsdtVndP2pPrice = async (): Promise<number> => {
  try {
    const response = await api.post("/p2p/search", {
      page: 1,
      rows: 10,
      payTypes: ["BANK"],
      asset: "USDT",
      tradeType: "BUY",
      fiat: "VND",
    });

    // Binance returns data in { code: "000000", message: null, data: [...], total: ... }
    const ads = response.data.data;
    if (ads && ads.length > 0) {
      // Get the price of the first advertisement
      const firstPrice = parseFloat(ads[0].adv.price);
      return firstPrice;
    }

    throw new Error("No P2P ads found");
  } catch (error) {
    console.error("Failed to fetch USDT/VND P2P price from BE:", error);
    // Fallback static value if API fails
    return 25850;
  }
};
