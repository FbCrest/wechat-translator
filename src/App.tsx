import React from 'react';
import { useWeChatHtmlData } from './hooks/useWeChatData';
import './index.css';
import './App.css';

function App() {
  const { data, loading, error, fetchAndDisplayHtml } = useWeChatHtmlData();
  const [url, setUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      fetchAndDisplayHtml(url);
    }
  };

  return (
    <div className="App">
      <main>
        <div>
          <header>
            <h1>WeChat Article Translator</h1>
            <p>Nhập URL bài viết WeChat (微信公众号) để tự động lấy và dịch tiêu đề, nội dung sang tiếng Việt.</p>
          </header>

          <form className="input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Dán URL bài viết WeChat..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !url.trim()}>
              {loading ? 'Đang xử lý...' : 'Lấy & Dịch'}
            </button>
          </form>

          {error && (
            <div className="error">{error}</div>
          )}

          {loading && (
            <div className="loading">Đang lấy & dịch bài viết...</div>
          )}

          {data && (
            <div className="translation-result">
              <h2>HTML Content from Proxy</h2>
              <pre className="html-raw-content">{data.htmlContent}</pre>
            </div>
          )}
          <footer style={{ fontSize: 12, marginTop: 40, color: '#888' }}>
            Made by <a href={'https://github.com/monokaijs'}>@monokaijs</a>. Fork me on <a href={'https://github.com/monokaijs/reddit-translator'}>GitHub</a>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App
