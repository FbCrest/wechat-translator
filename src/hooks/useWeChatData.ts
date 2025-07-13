import { useState, useCallback } from 'react';
import { fetchWeChatArticle } from '../utils/wechatApi';

export interface WeChatHtmlData {
  htmlContent: string;
}

export function useWeChatHtmlData() {
  const [data, setData] = useState<WeChatHtmlData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndDisplayHtml = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const { htmlContent } = await fetchWeChatArticle(url);
      setData({ htmlContent });
    } catch (err: any) {
      setError(err.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchAndDisplayHtml,
  };
}
