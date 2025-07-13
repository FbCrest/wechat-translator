import React from 'react';
import { useWeChatData } from './hooks/useWeChatData';
import './index.css';

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
    <div className="reddit-app">
      <main className="main-content">
        <div className="main-content-inner">
          <header>
            <h1>WeChat Article Translator</h1>
            <p>Nhập URL bài viết WeChat (微信公众号) để tự động lấy và dịch tiêu đề, nội dung sang tiếng Việt.</p>
          </header>

          <form className="input-section" onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
            <input
              className="url-input"
              type="text"
              placeholder="Dán URL bài viết WeChat..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={loading}
            />
            <button className="fetch-button" type="submit" disabled={loading || !url.trim()}>
              Lấy & Dịch
            </button>
          </form>

          {error && (
            <div className="error-message">{error}</div>
          )}

          {loading && (
            <div className="loading-message">Đang lấy & dịch bài viết...</div>
          )}

          {data && (
            <div style={{ marginTop: 32 }}>
              <h2>Bản gốc</h2>
              <h3>{data.title}</h3>
              <div style={{ whiteSpace: 'pre-line', background: '#222', padding: 16, borderRadius: 4, marginBottom: 24 }}>{data.content}</div>
              <h2>Bản dịch tiếng Việt</h2>
              <h3>{data.translatedTitle}</h3>
              <div style={{ whiteSpace: 'pre-line', background: '#2a2a2a', padding: 16, borderRadius: 4 }}>{data.translatedContent}</div>
            </div>
          )}
          <div style={{ fontSize: 12, marginTop: 40 }}>
            Made by <a style={{ color: 'white' }} href={'https://github.com/monokaijs'}>@monokaijs</a>. Fork me on <a href={'https://github.com/monokaijs/reddit-translator'} style={{ color: 'white' }}>GitHub</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
