import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing url');
  }
  try {
    const fetchRes = await fetch(url as string, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      },
    });

    if (!fetchRes.ok) {
      // Nếu WeChat trả về lỗi, gửi lại status và thông báo lỗi đó
      const errorText = await fetchRes.text();
      console.error(`Upstream fetch failed: ${fetchRes.status}`, errorText);
      return res.status(fetchRes.status).send(`Failed to fetch from WeChat: ${fetchRes.statusText}`);
    }

    const html = await fetchRes.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (e) {
    console.error('Proxy Error:', e);
    if (e instanceof Error) {
      return res.status(500).send(`Proxy error: ${e.message}`);
    }
    return res.status(500).send('An unknown proxy error occurred');
  }
}
