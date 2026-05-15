import React, { useState } from 'react'

const ArrowRightIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
)

const StarIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState('npm')
  const [copied, setCopied] = useState(false)

  const codeSnippets = {
    npm: 'npx skills add Adexengineer/Adex --all',
    claude: 'Use the skill: Adexengineer/Adex',
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="quickstart" className="quickstart section">
      <div className="container quickstart-inner">
        <div className="quickstart-content">
          <p className="text-label">Quickstart</p>
          <h2 className="text-headline">Install in seconds.</h2>
          <p className="text-description">
            Open source. MIT licensed. Works with 40+ AI agents. No account required.
          </p>
          <div className="quickstart-buttons">
            <a
              href="https://github.com/Adexengineer/Adex"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <StarIcon /> Star on GitHub
            </a>
            <a href="#docs" className="btn btn-secondary">
              Read the docs <ArrowRightIcon />
            </a>
          </div>
        </div>
        <div className="quickstart-code">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'npm' ? 'active' : ''}`}
              onClick={() => setActiveTab('npm')}
            >
              npm
            </button>
            <button
              className={`tab ${activeTab === 'claude' ? 'active' : ''}`}
              onClick={() => setActiveTab('claude')}
            >
              claude
            </button>
          </div>
          <div className="code-block-wrapper">
            <div className="code-block">{codeSnippets[activeTab]}</div>
            <button className="code-copy-btn" onClick={handleCopy} title="Copy to clipboard">
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .quickstart {
          background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }
        .quickstart-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .quickstart-content {
          max-width: 520px;
        }
        .quickstart-buttons {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .quickstart-code {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .code-block-wrapper {
          position: relative;
        }
        .code-block-wrapper .code-block {
          font-size: 1rem;
          padding-right: 52px;
        }
        .code-copy-btn {
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .code-copy-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
          border-color: #333;
        }
        @media (max-width: 768px) {
          .quickstart-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}
