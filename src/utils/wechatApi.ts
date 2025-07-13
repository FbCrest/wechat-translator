// Hàm lấy nội dung bài viết WeChat từ URL
// Trả về { title, content } dạng text
// Lưu ý: Nếu chạy trên trình duyệt, có thể bị CORS. Nếu vậy, cần proxy hoặc chạy server-side.

// Đổi thành domain của bạn sau khi deploy lên Vercel!
const PROXY_BASE = '/api/wechat-proxy';

export async function fetchWeChatArticle(url: string): Promise<{ title: string, content: string }> {
  const response = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch WeChat article: ${response.status}`);
  }
  const html = await response.text();

  // Parse HTML bằng DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Lấy tiêu đề
  let title = doc.querySelector('.rich_media_title')?.textContent?.trim() || '';
  if (!title) {
    // Thử selector khác
    title = doc.title || '';
  }

  // Lấy nội dung chính
  let content = doc.querySelector('.rich_media_content, .js_content')?.textContent?.trim() || '';
  if (!content) {
    // Thử selector khác
    content = doc.body?.textContent?.trim() || '';
  }

  return { title, content };
}
