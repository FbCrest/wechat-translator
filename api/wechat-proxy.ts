import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing url');
  }
  try {
    const fetchRes = await fetch(url as string, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await fetchRes.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(html);
  } catch (e) {
    res.status(500).send('Proxy error');
  }
}
