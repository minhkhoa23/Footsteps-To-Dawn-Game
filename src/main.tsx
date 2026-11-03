import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="intro-page"><div className="paper-card intro-card"><h1>Trang sách chưa mở được</h1><p>Bản lưu của bạn vẫn ở trình duyệt. Hãy tải lại để thử mở ứng dụng lần nữa.</p><button className="primary-button" onClick={() => location.reload()}>Tải lại ứng dụng</button></div></main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>);
