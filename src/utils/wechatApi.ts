// Hàm lấy nội dung bài viết WeChat từ URL
// Trả về { title, content } dạng text
// Lưu ý: Nếu chạy trên trình duyệt, có thể bị CORS. Nếu vậy, cần proxy hoặc chạy server-side.

// Đổi thành domain của bạn sau khi deploy lên Vercel!
const PROXY_BASE = '/api/wechat-proxy';

export async function fetchWeChatArticle(url: string): Promise<{ htmlContent: string }> {
  const params = new URLSearchParams({ url });
  const response = await fetch(`${PROXY_BASE}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch WeChat article: ${response.status}`);
  }
  const html = await response.text();

  return { htmlContent: html };
}
