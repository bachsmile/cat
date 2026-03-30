import api from "./client";

export const aiApi = {
  /**
   * Tạo văn bản phản hồi đơn giản (Single turn)
   */
  generate: async (prompt: string, model?: string) => {
    const response = await api.post<{ text: string }>("/ai/generate", { prompt, model });
    return response.data;
  },

  /**
   * Chat với AI (Multi-turn)
   */
  chat: async (prompt: string, history: any[] = [], model?: string) => {
    const response = await api.post<{ text: string }>("/ai/chat", { prompt, history, model });
    return response.data;
  },

  /**
   * Chat với AI theo dạng stream
   */
  chatStream: async (prompt: string, history: any[] = [], model?: string, onChunk?: (text: string) => void) => {
    const token = localStorage.getItem("token");
    const activeAsset = localStorage.getItem("active_wallet_asset");
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (activeAsset) {
      const walletToken = localStorage.getItem(`wallet_token_${activeAsset}`);
      if (walletToken) {
        headers['X-Wallet-Token'] = walletToken;
      }
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/chat-stream`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt, history, model }),
    });

    if (!response.ok) {
      throw new Error('Lỗi kết nối stream AI');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    if (!reader) throw new Error('ReadableStream not supported');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6);
          if (dataStr === '[DONE]') continue;
          
          try {
            const data = JSON.parse(dataStr);
            if (data.error) {
              throw new Error(data.error);
            }
            if (data.text) {
              fullText += data.text;
              if (onChunk) onChunk(data.text);
            }
          } catch (e) {
            console.warn('Error parsing stream chunk:', e);
            throw e; // Reraise to be caught by the outer try-catch
          }
        }
      }
    }

    return { text: fullText };
  },
};
