import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import villas from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const villa = villas[0]

// Captions paired to each screenshot in gallery order
const captions = [
  { label: 'Arrival', title: 'First Impression', sub: 'A private approach through manicured tropical grounds' },
  { label: 'Exterior', title: 'Architecture', sub: 'Award-winning design by Atelier Côté Sud' },
  { label: 'Living', title: 'Open-Plan Living', sub: 'Floor-to-ceiling glass dissolving interior and ocean' },
  { label: 'View', title: 'The Horizon', sub: 'Unobstructed panorama across the northern lagoon' },
  { label: 'Pool', title: 'Infinity Edge', sub: 'A pool that merges seamlessly with the Indian Ocean' },
  { label: 'Dining', title: 'Al Fresco Dining', sub: 'Covered pavilion for twelve, salt air included' },
  { label: 'Kitchen', title: 'Chef\'s Kitchen', sub: 'Bespoke cabinetry, professional-grade appliances' },
  { label: 'Master', title: 'Master Suite', sub: 'Five en-suite bedrooms, each a sanctuary' },
  { label: 'Spa', title: 'Private Spa', sub: 'In-house treatment room, steam and plunge pool' },
  { label: 'Garden', title: 'Tropical Gardens', sub: '2,400m² of curated botanical landscape' },
  { label: 'Beach', title: 'Beach Access', sub: 'Private pathway to your own stretch of lagoon' },
  { label: 'Night', title: 'After Dark', sub: 'Intelligent lighting transforms the estate at dusk' },
]

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
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
          { label: 'The Villa', href: '#villa' },
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
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      minHeight: '100dvh', position: 'relative', display: 'flex',
      flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={villa.image}
          alt="Villa Azur"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 60%, rgba(8,8,7,1) 100%)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px, 8vw, 100px)', paddingBottom: 'clamp(60px, 10vw, 120px)' }}>
        <div style={{ maxWidth: '900px' }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: '24px' }}>
            Grand Baie · North Coast · Mauritius
          </p>
          <h1 className="font-display animate-fade-up delay-200" style={{
            fontSize: 'clamp(42px, 7vw, 100px)', fontWeight: 400, lineHeight: 1.05,
            margin: '0 0 32px', color: 'var(--text-primary)', fontStyle: 'italic',
          }}>
            Villa Azur<br />
            <span className="gold-gradient-text" style={{ fontStyle: 'normal', fontWeight: 300 }}>$3,750,000</span>
          </h1>
          <p className="animate-fade-up delay-400" style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.7,
            color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 0 48px',
          }}>
            {villa.shortDescription}
          </p>
          <div className="animate-fade-up delay-600" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#villa" className="btn-luxury btn-luxury-solid">
              <span>Explore the Estate</span>
            </a>
            <a href="#contact" className="btn-luxury">
              <span>Arrange a Viewing</span>
            </a>
          </div>
        </div>
      </div>
      {/* scroll cue */}
      <div style={{
        position: 'absolute', bottom: '32px', right: '48px', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'pulse 2s infinite' }} />
      </div>
    </section>
  )
}

function GalleryPanel({ src, caption, index }: { src: string; caption: typeof captions[0]; index: number }) {
  const { ref, inView } = useInView(0.2)
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      id={index === 0 ? 'villa' : undefined}
      style={{
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 420px' : '420px 1fr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{
        gridColumn: isEven ? 1 : 2,
        gridRow: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={src}
          alt={caption.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: inView ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* subtle vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isEven
            ? 'linear-gradient(to right, transparent 60%, var(--obsidian) 100%)'
            : 'linear-gradient(to left, transparent 60%, var(--obsidian) 100%)',
        }} />
        {/* index watermark */}
        <div style={{
          position: 'absolute',
          top: '40px',
          [isEven ? 'left' : 'right']: '40px',
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'rgba(201,164,104,0.5)',
          textTransform: 'uppercase',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(villa.gallery.length).padStart(2, '0')}
        </div>
      </div>

      {/* Caption panel */}
      <div style={{
        gridColumn: isEven ? 2 : 1,
        gridRow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 56px',
        background: 'var(--obsidian)',
        position: 'relative',
      }}>
        {/* decorative line */}
        <div style={{
          width: inView ? '48px' : '0px',
          height: '1px',
          background: 'var(--gold)',
          marginBottom: '32px',
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.3s',
        }} />

        <p style={{
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          margin: '0 0 16px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          transitionDelay: '0.2s',
        }}>
          {caption.label}
        </p>

        <h2 className="font-display" style={{
          fontSize: 'clamp(28px, 3vw, 52px)',
          fontWeight: 400,
          lineHeight: 1.1,
          margin: '0 0 24px',
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          transitionDelay: '0.3s',
        }}>
          {caption.title}
        </h2>

        <p style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          margin: 0,
          maxWidth: '280px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          transitionDelay: '0.45s',
        }}>
          {caption.sub}
        </p>

        {/* bottom corner ornament */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          [isEven ? 'left' : 'right']: '56px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: inView ? 0.4 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '0.6s',
        }}>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Villa Azur</span>
        </div>
      </div>
    </div>
  )
}

function SpecsSection() {
  const { ref, inView } = useInView()
  const specs = [
    { value: `${villa.bedrooms}`, label: 'Bedrooms' },
    { value: `${villa.bathrooms}`, label: 'Bathrooms' },
    { value: `${villa.sqm}m²`, label: 'Interior' },
    { value: `${(villa.landSqm / 1000).toFixed(1)}ha`, label: 'Land' },
  ]
  return (
    <section ref={ref} style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px)',
      background: 'var(--obsidian)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {specs.map(({ value, label }, i) => (
            <div key={label} style={{
              background: 'var(--obsidian)',
              padding: '56px 40px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`,
            }}>
              <div className="font-display gold-gradient-text" style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1, marginBottom: '12px' }}>
                {value}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '80px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {villa.features.map((f, i) => (
            <div key={f} style={{
              padding: '10px 20px',
              border: '1px solid var(--border)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              opacity: inView ? 1 : 0,
              transition: `opacity 0.6s ease ${0.4 + i * 0.07}s`,
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InvestmentSection() {
  return (
    <section id="investment" style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px)',
      background: 'var(--obsidian)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label" style={{ marginBottom: '16px' }}>Why Mauritius</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, fontStyle: 'italic', margin: '0 0 32px' }}>
          A Tax-Advantaged<br />Island Residency
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Property ownership in Mauritius qualifies investors for permanent residency.
          With a flat 15% income tax, no capital gains tax, and no inheritance tax,
          the island represents one of the world's most compelling wealth-preservation environments.
        </p>
        <a href="#contact" className="btn-luxury btn-luxury-solid"><span>Request Investment Brief</span></a>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" style={{
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px)',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label" style={{ marginBottom: '16px' }}>Exclusive Access</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, fontStyle: 'italic', margin: '0 0 16px' }}>
          Arrange a Private Viewing
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '48px' }}>
          Villa Azur is available for qualified buyers by private appointment only.
          Our advisors are available around the clock.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Your Name"
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              padding: '16px 20px', color: 'var(--text-primary)', fontSize: '14px',
              outline: 'none', letterSpacing: '0.05em',
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              padding: '16px 20px', color: 'var(--text-primary)', fontSize: '14px',
              outline: 'none', letterSpacing: '0.05em',
            }}
          />
          <a href="mailto:hello@edenestates.mu" className="btn-luxury btn-luxury-solid" style={{ textAlign: 'center' }}>
            <span>Submit Enquiry</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '40px 60px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <span className="font-display" style={{ fontSize: '14px', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>ÉDEN ESTATES</span>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>© 2026 · Grand Baie, Mauritius</span>
    </footer>
  )
}

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      {villa.gallery.map((src, i) => (
        <GalleryPanel key={i} src={src} caption={captions[i] ?? captions[captions.length - 1]} index={i} />
      ))}
      <SpecsSection />
      <InvestmentSection />
      <ContactSection />
      <Footer />
    </>
  )
}
