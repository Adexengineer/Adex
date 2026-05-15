import React from 'react'

const agents = [
  { name: 'Claude', color: '#cc785c' },
  { name: 'Cursor', color: '#3b82f6' },
  { name: 'Codex', color: '#10b981' },
  { name: 'Copilot', color: '#a855f7' },
  { name: 'Gemini', color: '#3b82f6' },
  { name: 'OpenCode', color: '#f59e0b' },
]

export default function Agents() {
  return (
    <section className="agents section">
      <div className="container">
        <div className="agents-header">
          <p className="text-label">Bring your own agent</p>
          <h2 className="text-headline">Works with any agent.</h2>
          <p className="text-description">
            Your Claude, Cursor, Codex, Copilot — organized under one framework, pointed at one goal.
          </p>
        </div>
        <div className="agents-grid">
          {agents.map((agent, i) => (
            <div className="card agent-card" key={i}>
              <div className="agent-badge" style={{ backgroundColor: agent.color + '20', color: agent.color }}>
                {agent.name[0]}
              </div>
              <span className="agent-name">{agent.name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .agents-header {
          text-align: center;
          max-width: 560px;
          margin: 0 auto;
        }
        .agents-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .agent-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 32px 24px;
          text-align: center;
        }
        .agent-badge {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
        }
        .agent-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #ccc;
        }
        @media (max-width: 768px) {
          .agents-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .agents-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
