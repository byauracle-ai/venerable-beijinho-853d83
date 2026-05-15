import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import villas from '../../data/products'

export const Route = createFileRoute('/products/$productId')({
  component: VillaDetail,
  loader: async ({ params }) => {
    const villa = villas.find((v) => v.id === +params.productId)
    if (!villa) throw new Error('Villa not found')
    return villa
  },
})

function VillaDetail() {
  const villa = Route.useLoaderData()
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const relatedVillas = villas.filter(v => v.id !== villa.id).slice(0, 2)

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100dvh', color: 'var(--text-primary)' }}>
      {/* Minimal nav */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 48px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(8,8,7,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,164,104,0.1)',
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="font-display" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>ÉDEN ESTATES</span>
        </Link>
        <Link to="/" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}>
          ← Back to Portfolio
        </Link>
      </nav>

      {/* Hero image */}
      <div style={{ paddingTop: '80px', position: 'relative', height: '70dvh', overflow: 'hidden' }}>
        <img
          src={villa.image}
          alt={villa.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,7,0.95) 100%)',
        }} />
        {/* Overlay content */}
        <div style={{ position: 'absolute', bottom: '48px', left: 'clamp(24px, 6vw, 80px)', right: 'clamp(24px, 6vw, 80px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 8px' }}>{villa.location}</p>
              <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, margin: 0, lineHeight: 1 }}>{villa.name}</h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Asking Price</div>
              <div className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: 'var(--text-primary)' }}>
                ${villa.price.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>USD · Residency Included</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: 'clamp(48px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '80px', alignItems: 'start' }}>
            {/* Left — Description */}
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>{villa.tag}</p>
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '40px' }}>{villa.description}</p>

              {/* Specs grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', marginBottom: '48px' }}>
                {[
                  { value: villa.bedrooms, label: 'Bedrooms' },
                  { value: villa.bathrooms, label: 'Bathrooms' },
                  { value: `${villa.sqm}m²`, label: 'Interior' },
                  { value: `${villa.landSqm.toLocaleString()}m²`, label: 'Land Area' },
                ].map(({ value, label }) => (
                  <div key={label} style={{ background: 'var(--surface)', padding: '24px 20px' }}>
                    <div className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h3 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px' }}>Features & Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {villa.features.map(f => (
                  <span key={f} style={{
                    padding: '8px 18px',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s',
                  }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Right — Action panel */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px' }}>
                <div className="font-display" style={{ fontSize: '36px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  ${villa.price.toLocaleString()}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '32px' }}>USD — Price includes residency permit eligibility</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <button
                    onClick={() => setInquiryOpen(true)}
                    className="btn-luxury btn-luxury-solid"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Request Private Viewing</span>
                  </button>
                  <a
                    href="/#contact"
                    className="btn-luxury"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Download Brochure</span>
                  </a>
                </div>

                <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '11px', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    All inquiries are handled with strict confidentiality. This property qualifies for the Mauritius Residency by Property Investment programme.
                  </p>
                </div>
              </div>

              {/* Investment highlight */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '28px 32px', marginTop: '16px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>Investment Benefits</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['0% Capital Gains Tax', '0% Inheritance Tax', 'Permanent Residency Eligible', 'Freely Repatriate Capital', 'No Exchange Controls'].map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <span style={{ width: '4px', height: '4px', background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related villas */}
          {relatedVillas.length > 0 && (
            <div style={{ marginTop: '100px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '40px' }}>You May Also Consider</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {relatedVillas.map(v => (
                  <Link key={v.id} to="/products/$productId" params={{ productId: v.id.toString() }} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="villa-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <div className="card-image" style={{ aspectRatio: '16/9' }}>
                        <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                      </div>
                      <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h4 className="font-display" style={{ fontSize: '22px', fontWeight: 400, margin: '0 0 4px' }}>{v.name}</h4>
                            <p style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em', margin: 0 }}>{v.location}</p>
                          </div>
                          <div className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: 'var(--text-primary)' }}>${v.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry modal */}
      {inquiryOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(8,8,7,0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setInquiryOpen(false) }}
        >
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '48px',
            maxWidth: '520px',
            width: '100%',
            animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="font-display" style={{ fontSize: '48px', color: 'var(--gold)', marginBottom: '16px' }}>✦</div>
                <h3 className="font-display" style={{ fontSize: '28px', fontWeight: 400, margin: '0 0 12px' }}>Inquiry Received</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Our private client advisor will contact you within 24 hours to arrange your exclusive viewing of {villa.name}.
                </p>
                <button onClick={() => { setInquiryOpen(false); setSubmitted(false) }} className="btn-luxury" style={{ marginTop: '32px' }}>
                  <span>Close</span>
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 6px' }}>Private Viewing Request</p>
                    <h3 className="font-display" style={{ fontSize: '24px', fontWeight: 400, margin: 0 }}>{villa.name}</h3>
                  </div>
                  <button onClick={() => setInquiryOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px' }}>×</button>
                </div>

                <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Full Name</label>
                    <input className="luxury-input" type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Email</label>
                    <input className="luxury-input" type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Message (optional)</label>
                    <textarea className="luxury-input" rows={3} placeholder="Preferred viewing dates, questions..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'none' }} />
                  </div>
                  <button type="submit" className="btn-luxury btn-luxury-solid">
                    <span>Submit Viewing Request</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          #villa-detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .villa-related { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
