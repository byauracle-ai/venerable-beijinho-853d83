import { createFileRoute } from '@tanstack/react-router'
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

// Nav
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: '80px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,7,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <span className="font-display" style={{ fontSize: '22px', fontWeight: 500 }}>ÉDEN ESTATES</span>
      </a>
      <div style={{ display: 'flex', gap: '40px' }}>
        <a href="#villas">Villas</a>
        <a href="#investment">Investment</a>
        <a href="#residency">Residency</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}

// Hero
function Hero() {
  return (
    <section style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <img 
        src="/Screenshot 2026-05-14 201944.png" 
        alt="Luxury Villa" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,7,0.9), transparent 50%)' }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '200px 48px 100px' }}>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1.05 }}>
          Where Paradise<br />Becomes Permanent
        </h1>
      </div>
    </section>
  )
}

// Modern Horizontal Scroll Villas
function VillasSection() {
  const { ref } = useInView(0.1)
  return (
    <section id="villas" ref={ref} style={{ padding: '140px 0' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 48px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(42px, 7vw, 72px)', marginBottom: '80px' }}>Signature Residences</h2>
        
        <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', paddingBottom: '60px', scrollSnapType: 'x mandatory' }}>
          {villas.map(villa => (
            <div key={villa.id} style={{ minWidth: '520px', scrollSnapAlign: 'start', borderRadius: '24px', overflow: 'hidden' }}>
              <img 
                src={villa.image} 
                alt={villa.name}
                style={{ width: '100%', height: '520px', objectFit: 'cover' }}
              />
              <div style={{ padding: '32px', background: '#111' }}>
                <h3 style={{ fontSize: '28px', margin: '0 0 8px' }}>{villa.name}</h3>
                <p style={{ color: 'var(--gold)' }}>{villa.location}</p>
                <p style={{ fontSize: '26px', marginTop: '16px' }}>${villa.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Investment
function InvestmentSection() {
  return (
    <section id="investment" style={{ padding: '140px 48px', background: '#0a0a08' }}>
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '80px' }}>Why Mauritius</h2>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
        {["0% Capital Gains Tax", "15% Income Tax", "Permanent Residency", "Global Mobility"].map((item, i) => (
          <div key={i} style={{ padding: '40px', background: '#111', borderRadius: '20px' }}>
            <h3 style={{ color: '#c9a468' }}>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

// Residency
function ResidencySection() {
  return (
    <section id="residency" style={{ padding: '140px 48px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '80px' }}>Residency by Investment</h2>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', fontSize: '20px', lineHeight: 1.6 }}>
        Purchase any Éden Estates villa and qualify for Mauritian Permanent Residency for you and your family.
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: '140px 48px', textAlign: 'center', background: '#0a0a08' }}>
      <h2 style={{ fontSize: 'clamp(38px, 6vw, 60px)', marginBottom: '40px' }}>Ready to Begin?</h2>
      <a href="mailto:estates@eden-mauritius.com" style={{ padding: '18px 48px', background: '#c9a468', color: '#000', textDecoration: 'none', borderRadius: '8px', fontWeight: 500 }}>
        Request Private Consultation
      </a>
    </section>
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
    </>
  )
}
