import React from 'react'

const steps = [
  {
    number: '01',
    title: 'explore',
    description: 'Capture the idea through deep conversation.',
  },
  {
    number: '02',
    title: 'shape',
    description: 'Structure it into a formal product spec.',
  },
  {
    number: '03',
    title: 'map',
    description: 'Design architecture, roadmap, and shared schemas.',
  },
  {
    number: '04',
    title: 'spec',
    description: 'Deep-dive one feature. Write the contract.',
  },
  {
    number: '05',
    title: 'build',
    description: 'TDD implementation. Tests first, always.',
  },
]

const ArrowIcon = () => (
  <svg className="step-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
)

export default function HowItWorks() {
  return (
    <section className="how-it-works section">
      <div className="container">
        <p className="text-label">How it works</p>
        <h2 className="text-headline">From idea to shipped feature.</h2>
        <div className="steps-row">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="card step-card">
                <span className="step-number">{step.number}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="step-arrow-wrapper">
                  <ArrowIcon />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        .how-it-works {
          background: linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%);
          border-top: 1px solid #1a1a1a;
        }
        .steps-row {
          display: flex;
          align-items: stretch;
          gap: 16px;
          margin-top: 48px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .step-card {
          flex: 1;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }
        .step-number {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #444;
          text-transform: uppercase;
        }
        .step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .step-description {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #888;
        }
        .step-arrow-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          flex-shrink: 0;
        }
        .step-arrow {
          width: 20px;
          height: 20px;
        }
        @media (max-width: 768px) {
          .steps-row {
            flex-direction: column;
            align-items: center;
          }
          .step-card {
            width: 100%;
            min-width: auto;
          }
          .step-arrow-wrapper {
            transform: rotate(90deg);
            padding: 4px 0;
          }
        }
      `}</style>
    </section>
  )
}
