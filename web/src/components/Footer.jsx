import React from 'react'

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">AdeX</span>
            <p className="footer-tagline">The Anchor holds everything.</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Adexengineer/Adex" target="_blank" rel="noopener noreferrer" className="footer-link">
              <GitHubIcon /> GitHub
            </a>
            <a href="#docs" className="footer-link">Docs</a>
            <a href="#blog" className="footer-link">Blog</a>
            <a href="#discord" className="footer-link">Discord</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>MIT License &copy; 2026 Adexengineer</p>
        </div>
      </div>
      <style>{`
        .footer {
          border-top: 1px solid #1a1a1a;
          padding: 64px 0 32px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .footer-tagline {
          font-size: 0.9375rem;
          color: #666;
          margin-top: 6px;
        }
        .footer-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .footer-link {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #aaa;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-link:hover {
          color: #fff;
        }
        .footer-bottom {
          border-top: 1px solid #1a1a1a;
          padding-top: 24px;
        }
        .footer-bottom p {
          font-size: 0.8125rem;
          color: #555;
        }
        @media (max-width: 640px) {
          .footer-links {
            flex-wrap: wrap;
            gap: 20px;
          }
        }
      `}</style>
    </footer>
  )
}
