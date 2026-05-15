import React from 'react'

const testimonials = [
  {
    name: 'Sarah Chen',
    handle: '@dev_name',
    quote: 'Finally, a framework that treats AI like a collaborator, not a replacement.',
    color: '#7c3aed',
  },
  {
    name: 'Marcus Reid',
    handle: '@founder_name',
    quote: 'The Anchor saved me from re-explaining my project every single session.',
    color: '#dc2626',
  },
  {
    name: 'Elena Voss',
    handle: '@engineer_name',
    quote: 'SDD + TDD with AI agents. This is how software should be built.',
    color: '#059669',
  },
  {
    name: 'James Park',
    handle: '@ai_dev',
    quote: 'explore → shape → map → spec → build. The workflow just makes sense.',
    color: '#2563eb',
  },
  {
    name: 'Aisha Patel',
    handle: '@senior_dev',
    quote: 'No more vibe coding. AdeX forces discipline and the output quality shows.',
    color: '#d97706',
  },
  {
    name: 'Tom Nakamura',
    handle: '@solo_founder',
    quote: 'Multi-session safe. I can pause for 3 days and resume like nothing happened.',
    color: '#0891b2',
  },
]

function Avatar({ name, color }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div className="testimonial-avatar" style={{ backgroundColor: color }}>
      {initials}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <p className="text-label">What people are saying</p>
        <h2 className="text-headline">Loved by builders.</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="card testimonial-card" key={i}>
              <div className="testimonial-header">
                <Avatar name={t.name} color={t.color} />
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-handle">{t.handle}</p>
                </div>
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        .testimonial-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .testimonial-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #fff;
        }
        .testimonial-handle {
          font-size: 0.8125rem;
          color: #666;
        }
        .testimonial-quote {
          font-size: 1rem;
          line-height: 1.6;
          color: #aaa;
        }
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
