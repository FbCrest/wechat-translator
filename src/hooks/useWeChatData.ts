import { useState, useCallback } from 'react';
import { fetchWeChatArticle } from '../utils/wechatApi';
import { translateService } from '../services/translate';

export interface WeChatArticleData {
  url: string;
  title: string;
  content: string;
  translatedTitle: string;
  translatedContent: string;
}

export function useWeChatData() {
  const [data, setData] = useState<WeChatArticleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndTranslate = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const article = await fetchWeChatArticle(url);
      const [translatedTitle, translatedContent] = await Promise.all([
        translateService.translate(article.title, { from: 'zh', to: 'vi' }),
        translateService.translate(article.content, { from: 'zh', to: 'vi' })
      ]);
      setData({
        url,
        title: article.title,
        content: article.content,
        translatedTitle,
        translatedContent,
      });
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
    fetchAndTranslate,
  };
}
