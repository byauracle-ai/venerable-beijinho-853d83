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
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 48px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
        background: scrolled ? 'rgba(8,8,7,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,164,104,0.1)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span className="font-display" style={{ fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.08em', lineHeight: 1 }}>ÉDEN ESTATES</span>
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 400 }}>Mauritius · Est. 2018</span>
      </a>

      {/* Desktop nav */}
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

      {/* Mobile menu button */}
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

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

function Hero() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=90&auto=format"
          alt="Mauritius coastline"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Ambient gold vignette */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, var(--obsidian) 0%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Large MAURITIUS watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        <span className="font-display" style={{
          fontSize: 'clamp(60px, 14vw, 200px)',
          fontWeight: 300,
          letterSpacing: '0.3em',
          color: 'rgba(201, 164, 104, 0.04)',
          textTransform: 'uppercase',
        }}>
          MAURITIUS
        </span>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px, 8vw, 100px)', paddingBottom: 'clamp(60px, 10vw, 120px)' }}>
        <div style={{ maxWidth: '900px' }}>
          <p className="section-label animate-fade-up" style={{ marginBottom: '24px' }}>
            Indian Ocean · Boutique Estates
          </p>

          <h1
            className="font-display animate-fade-up delay-200"
            style={{
              fontSize: 'clamp(42px, 7vw, 100px)',
              fontWeight: 400,
              lineHeight: 1.05,
              margin: '0 0 32px',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
            }}
          >
            Where Paradise<br />
            <span className="gold-gradient-text" style={{ fontStyle: 'normal', fontWeight: 300 }}>Becomes Permanent</span>
          </h1>

          <p
            className="animate-fade-up delay-400"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 0 48px',
            }}
          >
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

        {/* Stats strip */}
        <div
          className="animate-fade-up delay-800"
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '72px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(201,164,104,0.12)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '0%', label: 'Capital Gains Tax' },
            { value: '0%', label: 'Inheritance Tax' },
            { value: '15%', label: 'Personal Income Tax' },
            { value: '13th', label: 'Ease of Doing Business' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-display" style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', right: '48px', bottom: '40px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} className="hero-scroll-indicator" />
      </div>
    </section>
  )
}

function VillasSection() {
  const { ref, inView } = useInView()

  return (
    <section id="villas" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '24px' }}>
          <div className={inView ? 'animate-fade-up' : ''} style={{ opacity: inView ? undefined : 0 }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>Exclusive Portfolio</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
              Curated Estates
            </h2>
          </div>
          <p
            className={inView ? 'animate-fade-up delay-200' : ''}
            style={{ opacity: inView ? undefined : 0, maxWidth: '340px', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            Each property is individually selected for architectural distinction,
            location prestige, and investment merit.
          </p>
        </div>

        {/* Villa grid — asymmetric layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
          {villas.map((villa, index) => {
            const isLarge = index === 0 || index === 3
            const colSpan = isLarge ? '1 / 8' : index === 1 ? '8 / 13' : index === 2 ? '1 / 6' : '6 / 13'

            return (
              <div
                key={villa.id}
                className={`villa-card ${inView ? 'animate-scale-in' : ''}`}
                style={{
                  opacity: inView ? undefined : 0,
                  gridColumn: colSpan,
                  animationDelay: `${index * 0.12}s`,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <Link to="/products/$productId" params={{ productId: villa.id.toString() }} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  {/* Image */}
                  <div className="card-image" style={{ aspectRatio: isLarge ? '16/9' : '4/3', position: 'relative' }}>
                    <img
                      src={villa.image}
                      alt={villa.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    {/* Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      padding: '6px 14px',
                      background: 'rgba(8,8,7,0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid var(--border)',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                    }}>
                      {villa.tag}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '28px 32px 32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <h3 className="font-display" style={{ fontSize: isLarge ? '28px' : '22px', fontWeight: 400, margin: '0 0 4px', color: 'var(--text-primary)' }}>{villa.name}</h3>
                        <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>{villa.location}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="font-display" style={{ fontSize: '22px', fontWeight: 300, color: 'var(--text-primary)' }}>
                          ${villa.price.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>USD</div>
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 20px' }}>
                      {villa.shortDescription}
                    </p>

                    {/* Specs */}
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

        {/* Mobile: simple single column */}
        <style>{`
          @media (max-width: 900px) {
            #villas .villa-card { grid-column: 1 / 13 !important; }
          }
          @media (max-width: 600px) {
            #villas > div > div:last-child { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

function InvestmentSection() {
  const { ref, inView } = useInView()

  const taxBenefits = [
    { value: '0%', label: 'Capital Gains Tax', desc: 'No tax on property or investment appreciation' },
    { value: '0%', label: 'Withholding Tax', desc: 'On dividends, interest, and royalties' },
    { value: '0%', label: 'Inheritance Tax', desc: 'Estate duty and gift taxes are non-existent' },
    { value: '15%', label: 'Personal Income Tax', desc: 'Flat rate matching Singapore\'s structure' },
    { value: '15%', label: 'Value Added Tax', desc: 'Competitive VAT for business operations' },
    { value: '45+', label: 'DTAA Countries', desc: 'Double taxation avoidance agreements' },
  ]

  return (
    <section id="investment" ref={ref} style={{
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)',
      background: 'var(--surface)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        right: '-20%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        border: '1px solid rgba(201,164,104,0.04)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: '-10%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        border: '1px solid rgba(201,164,104,0.06)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Two-column intro */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '100px', alignItems: 'start' }}>
          <div className={inView ? 'animate-fade-up' : ''} style={{ opacity: inView ? undefined : 0 }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>Financial Sovereignty</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, margin: '0 0 32px', lineHeight: 1.1 }}>
              Africa's Premier<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Wealth Sanctuary</em>
            </h2>
            <div className="divider-gold" style={{ marginBottom: '32px' }} />
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Mauritius ranks <strong style={{ color: 'var(--text-primary)' }}>1st in Africa</strong> and <strong style={{ color: 'var(--text-primary)' }}>13th globally</strong> in the World Bank Ease of Doing Business index — a jurisdiction designed for wealth accumulation, protection, and perpetuation.
            </p>
          </div>

          <div
            className={inView ? 'animate-fade-up delay-300' : ''}
            style={{ opacity: inView ? undefined : 0 }}
          >
            <div style={{ padding: '48px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px', fontWeight: 500 }}>World Bank — Wealth Metrics</p>
              {[
                { metric: 'Growth in Total Wealth Held', value: '+195%', period: '2008–2018' },
                { metric: 'Growth in Local Millionaires (HNWI)', value: '+230%', period: '2008–2018' },
                { metric: 'Africa Ranking — Ease of Business', value: '#1', period: '2024' },
                { metric: 'Global Ranking — Ease of Business', value: '#13', period: 'of 190 Countries' },
              ].map(({ metric, value, period }) => (
                <div key={metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{metric}</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '2px' }}>{period}</div>
                  </div>
                  <div className="font-display" style={{ fontSize: '26px', fontWeight: 300, color: 'var(--gold)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax benefits grid */}
        <div
          className={inView ? 'animate-fade-up delay-400' : ''}
          style={{ opacity: inView ? undefined : 0, marginBottom: '24px' }}
        >
          <p className="section-label" style={{ marginBottom: '32px' }}>Tax Structure</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {taxBenefits.map(({ value, label, desc }, i) => (
            <div
              key={label}
              className={`benefit-item ${inView ? 'animate-fade-up' : ''}`}
              style={{
                opacity: inView ? undefined : 0,
                animationDelay: `${0.5 + i * 0.1}s`,
                background: 'var(--surface)',
                padding: '40px 36px',
                position: 'relative',
              }}
            >
              <div className="font-display" style={{ fontSize: '52px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '12px' }}>{value}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>{label}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            #investment > div > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
            #investment > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 540px) {
            #investment > div > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

function ResidencySection() {
  const { ref, inView } = useInView()

  const steps = [
    {
      num: '01',
      title: 'Property Acquisition',
      desc: 'Purchase a qualifying villa under an IRS (Integrated Resort Scheme) or Smart City Scheme. Minimum investment: $375,000 for residency eligibility.',
    },
    {
      num: '02',
      title: 'Permit Application',
      desc: 'Submit your application through the Economic Development Board. Timeline: 30–60 days. Full legal assistance included with every Éden Estates purchase.',
    },
    {
      num: '03',
      title: 'Residency Granted',
      desc: 'Receive your Mauritian Occupation Permit or Permanent Residency. Extend residency to your immediate family members at no additional cost.',
    },
    {
      num: '04',
      title: 'Global Mobility',
      desc: 'Mauritius offers visa-free access to 145+ countries. Open bank accounts, establish companies, and repatriate capital freely — no exchange controls.',
    },
  ]

  return (
    <section id="residency" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Full-bleed background image with heavy overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.12 }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--obsidian) 40%, rgba(8,8,7,0.8) 100%)' }} />
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '100px', alignItems: 'start' }}>
          {/* Left */}
          <div className={inView ? 'animate-fade-up' : ''} style={{ opacity: inView ? undefined : 0 }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>Residency by Investment</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 400, margin: '0 0 32px', lineHeight: 1.1 }}>
              A Second Home.<br />
              <em style={{ color: 'var(--gold)' }}>A First Passport.</em>
            </h2>
            <div className="divider-gold" style={{ marginBottom: '32px' }} />
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Every Éden Estates villa purchase above $375,000 qualifies for Mauritius Permanent Residency under the government's property investment programme.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '48px' }}>
              Mauritius has signed Investment Promotion & Protection Agreements (IPPAs) with <strong style={{ color: 'var(--text-primary)' }}>28+ countries</strong> and Double Taxation Avoidance Agreements with <strong style={{ color: 'var(--text-primary)' }}>45+ countries</strong>.
            </p>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { value: '145+', label: 'Visa-Free Countries' },
                { value: '30–60', label: 'Days to Process' },
                { value: '∞', label: 'Permit Renewal' },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: '38px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '6px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Steps */}
          <div>
            {steps.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className={inView ? 'animate-fade-up' : ''}
                style={{
                  opacity: inView ? undefined : 0,
                  animationDelay: `${0.2 + i * 0.15}s`,
                  display: 'flex',
                  gap: '28px',
                  padding: '32px 0',
                  borderBottom: '1px solid var(--border)',
                  alignItems: 'flex-start',
                }}
              >
                <div className="font-display" style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 400, letterSpacing: '0.1em', minWidth: '28px', paddingTop: '4px' }}>{num}</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 10px' }}>{title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #residency > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}

function ContactSection() {
  const { ref, inView } = useInView()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '80px', alignItems: 'start' }}>
          {/* Left */}
          <div className={inView ? 'animate-fade-up' : ''} style={{ opacity: inView ? undefined : 0 }}>
            <p className="section-label" style={{ marginBottom: '16px' }}>Private Consultation</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, margin: '0 0 24px', lineHeight: 1.1 }}>
              Begin Your<br />
              <em style={{ color: 'var(--gold)' }}>Journey</em>
            </h2>
            <div className="divider-gold" style={{ marginBottom: '32px' }} />
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '48px' }}>
              Our private client advisors are available for confidential consultations. We arrange villa viewings — in person or virtual — at your convenience, with full legal and financial advisory included.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Office', value: 'Grand Baie, Mauritius' },
                { label: 'WhatsApp', value: '+230 5 XXX XXXX' },
                { label: 'Email', value: 'estates@eden-mauritius.com' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className={inView ? 'animate-fade-up delay-300' : ''} style={{ opacity: inView ? undefined : 0 }}>
            {submitted ? (
              <div style={{ padding: '60px 48px', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: '48px', color: 'var(--gold)', marginBottom: '16px' }}>✦</div>
                <h3 className="font-display" style={{ fontSize: '28px', fontWeight: 400, margin: '0 0 16px' }}>Thank You</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  A private client advisor will contact you within 24 hours to arrange your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Full Name</label>
                    <input
                      className="luxury-input"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Email</label>
                    <input
                      className="luxury-input"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Phone / WhatsApp</label>
                    <input
                      className="luxury-input"
                      type="tel"
                      placeholder="+1 XXX XXX XXXX"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Property Interest</label>
                    <select
                      className="luxury-input"
                      value={form.interest}
                      onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                      style={{ appearance: 'none', cursor: 'pointer', background: 'transparent' }}
                    >
                      <option value="" style={{ background: '#0f0f0d' }}>Select a villa</option>
                      {villas.map(v => (
                        <option key={v.id} value={v.name} style={{ background: '#0f0f0d' }}>{v.name} — ${v.price.toLocaleString()}</option>
                      ))}
                      <option value="all" style={{ background: '#0f0f0d' }}>View Full Portfolio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Message</label>
                  <textarea
                    className="luxury-input"
                    rows={4}
                    placeholder="Tell us about your requirements — timeline, preferred locations, or any questions about residency."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize: 'none', borderBottom: '1px solid var(--border)' }}
                  />
                </div>

                <button type="submit" className="btn-luxury btn-luxury-solid" style={{ alignSelf: 'flex-start' }}>
                  <span>Request Private Consultation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 540px) {
          #contact form > div:first-child,
          #contact form > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '48px clamp(24px, 6vw, 80px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '24px',
    }}>
      <div>
        <div className="font-display" style={{ fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>ÉDEN ESTATES</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.1em' }}>Mauritius · Grand Baie · Indian Ocean</div>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Privacy Policy', 'Legal Disclaimer', 'EDB Mauritius'].map(link => (
          <span key={link} style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', cursor: 'pointer', transition: 'color 0.3s' }}>{link}</span>
        ))}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
        © 2025 Éden Estates Mauritius. All rights reserved.
      </div>
    </footer>
  )
}

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
