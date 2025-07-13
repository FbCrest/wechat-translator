import React from 'react';
import { useWeChatData } from './hooks/useWeChatData';
import './index.css';
import './App.css';

function App() {
  const { data, loading, error, fetchAndTranslate } = useWeChatData();
  const [url, setUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      fetchAndTranslate(url.trim());
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
            <div className="translation-container">
              <div className="translation-box">
                <h2>Bản gốc</h2>
                <h3>{data.title}</h3>
                <p>{data.content}</p>
              </div>
              <div className="translation-box">
                <h2>Bản dịch tiếng Việt</h2>
                <h3>{data.translatedTitle}</h3>
                <p>{data.translatedContent}</p>
              </div>
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
