import React from 'react'

const features = [
  {
    icon: '⚓',
    title: 'The Anchor',
    description: 'Persistent context that survives sessions, agents, and machines.',
  },
  {
    icon: '📝',
    title: 'Spec-Driven Dev',
    description: 'Write the spec first. Code must match the spec. Always.',
  },
  {
    icon: '🧪',
    title: 'Test-Driven Dev',
    description: 'Tests before implementation. Mutation testing. Terminal evidence.',
  },
  {
    icon: '🔒',
    title: 'Human Review Gates',
    description: 'Agent stops for your approval. No vibe coding past the spec.',
  },
  {
    icon: '🔄',
    title: '5-Skill Pipeline',
    description: 'explore → shape → map → spec → build. Clear workflow.',
  },
  {
    icon: '🤖',
    title: '40+ Agent Support',
    description: 'Claude, Cursor, Codex, Copilot, Gemini, OpenCode, and more.',
  },
  {
    icon: '📐',
    title: 'Schema-First',
    description: 'Define data types and APIs before any logic discussion.',
  },
  {
    icon: '📜',
    title: 'MIT Licensed',
    description: 'Free, open source, community driven.',
  },
]

export default function Features() {
  return (
    <section className="features section">
      <div className="container">
        <p className="text-label">Features</p>
        <h2 className="text-headline">Everything you need to build with AI agents.</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="card feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-description">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .feature-icon {
          font-size: 1.75rem;
          line-height: 1;
        }
        .feature-title {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #fff;
        }
        .feature-description {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #888;
        }
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
