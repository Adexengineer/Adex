import React, { useState, useEffect } from 'react'

const StarIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo">AdeX</a>
        <div className="navbar-links">
          <a href="#blog" className="navbar-link">Blog</a>
          <a href="#docs" className="navbar-link">Docs</a>
          <a href="https://github.com/Adexengineer/Adex" target="_blank" rel="noopener noreferrer" className="navbar-link">GitHub</a>
        </div>
        <a
          href="https://github.com/Adexengineer/Adex"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary navbar-cta"
        >
          <StarIcon /> Star on GitHub
        </a>
      </div>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 16px 0;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background-color: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          border-bottom-color: #1f1f1f;
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .navbar-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
        }
        .navbar-link {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #aaa;
          transition: color 0.2s ease;
        }
        .navbar-link:hover {
          color: #fff;
        }
        .navbar-cta {
          font-size: 0.875rem;
          padding: 8px 16px;
        }
        @media (max-width: 640px) {
          .navbar-links { display: none; }
        }
      `}</style>
    </nav>
  )
}
