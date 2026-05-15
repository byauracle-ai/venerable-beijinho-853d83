import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import villas from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: '80px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
      background: scrolled ? 'rgba(8,8,7,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,164,104,0.1)' : '1px solid transparent',
    }}>
      <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span className="font-display" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.08em', lineHeight: 1 }}>ÉDEN ESTATES</span>
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 400 }}>Mauritius · Est. 2018</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="hidden-mobile">
        {[
          { label: 'Villas', href: '#villas' },
          { label: 'Investment', href: '#investment' },
          { label: 'Residency', href: '#residency' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href }) => (
          <a key={label} href={href} className="nav-link">{label}</a>
        ))}
        <a href="#contact" className="btn-luxury" style={{ padding: '10px 24px', fontSize: '12px' }}>
          <span>Private Viewing</span>
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', height: '1px', background: menuOpen ? 'var(--gold)' : 'var(--text-primary)', transition: 'all 0.3s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', height: '1px', background: menuOpen ? 'transparent' : 'var(--text-primary)', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', height: '1px', background: menuOpen ? 'var(--gold)' : 'var(--text-primary)', transition: 'all 0.3s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </div>
      </button>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      minHeight: '100dvh', position: 'relative', display: 'flex',
      flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden',
    }}>
      {/* YOUR NEW HEADER IMAGE */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/Screenshot 2026-05-14 201944.png"
          alt="Luxury Villa in Mauritius"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(to top, var(--obsidian) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px, 8vw, 100px)', paddingBottom: 'clamp(60px, 10vw, 120px)' }}>
        <div style={{ maxWidth: '900px' }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: '24px' }}>
            Indian Ocean · Boutique Estates
          </p>
          <h1 className="font-display animate-fade-up delay-200" style={{
            fontSize: 'clamp(42px, 7vw, 100px)', fontWeight: 400, lineHeight: 1.05,
            margin: '0 0 32px', color: 'var(--text-primary)', fontStyle: 'italic',
          }}>
            Where Paradise<br />
            <span className="gold-gradient-text" style={{ fontStyle: 'normal', fontWeight: 300 }}>Becomes Permanent</span>
          </h1>
          <p className="animate-fade-up delay-400" style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.7,
            color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 0 48px',
          }}>
            Ultra-luxury boutique villas in Mauritius's most coveted locations.
            Acquire property, secure residency, and enjoy one of the world's most
            advantageous tax environments — from $1,250,000.
          </p>
          <div className="animate-fade-up delay-600" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#villas" className="btn-luxury btn-luxury-solid">
              <span>Explore Villas</span>
            </a>
            <a href="#investment" className="btn-luxury">
              <span>Why Mauritius</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// === REST OF THE ORIGINAL CODE (unchanged) ===
function VillasSection() {
  const { ref, inView } = useInView()
  return (
    <section id="villas" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '24px' }}>
          <div className={inView ? 'animate-fade-up' : ''} style={{ opacity: inView ? undefined : 0 }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>Exclusive Portfolio</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              Curated Estates
            </h2>
          </div>
          <p className={inView ? 'animate-fade-up delay-200' : ''} style={{ opacity: inView ? undefined : 0, maxWidth: '340px', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            Each property is individually selected for architectural distinction, location prestige, and investment merit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          {villas.map((villa, index) => {
            const isLarge = index === 0 || index === 3
            const colSpan = isLarge ? '1 / 8' : index === 1 ? '8 / 13' : index === 2 ? '1 / 6' : '6 / 13'
            return (
              <div key={villa.id} className={`villa-card ${inView ? 'animate-scale-in' : ''}`} style={{
                opacity: inView ? undefined : 0,
                gridColumn: colSpan,
                animationDelay: `${index * 0.12}s`,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}>
                <Link to="/products/$productId" params={{ productId: villa.id.toString() }} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="card-image" style={{ aspectRatio: isLarge ? '16/9' : '4/3', position: 'relative' }}>
                    <img src={villa.image} alt={villa.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '6px 14px', background: 'rgba(8,8,7,0.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {villa.tag}
                    </div>
                  </div>
                  <div style={{ padding: '28px 32px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h3 className="font-display" style={{ fontSize: isLarge ? '28px' : '22px', fontWeight: 400, margin: '0 0 4px', color: 'var(--text-primary)' }}>{villa.name}</h3>
                        <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>{villa.location}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="font-display" style={{ fontSize: '22px', fontWeight: 300, color: 'var(--text-primary)' }}>${villa.price.toLocaleString()}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>USD</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 20px' }}>{villa.shortDescription}</p>
                    <div style={{ display: 'flex', gap: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                      {[
                        { value: villa.bedrooms, label: 'Beds' },
                        { value: villa.bathrooms, label: 'Baths' },
                        { value: `${villa.sqm}m²`, label: 'Interior' },
                        { value: `${villa.landSqm.toLocaleString()}m²`, label: 'Land' },
                      ].map(({ value, label }) => (
                        <div key={label}>
                          <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>{value}</div>
                          <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// (InvestmentSection, ResidencySection, ContactSection, Footer, and HomePage remain the same as your original file)

function InvestmentSection() { /* paste your original InvestmentSection here if needed */ }
function ResidencySection() { /* paste original */ }
function ContactSection() { /* paste original */ }
function Footer() { /* paste original */ }

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <VillasSection />
      <InvestmentSection />
      <ResidencySection />
      <ContactSection />
      <Footer />
    </>
  )
}
