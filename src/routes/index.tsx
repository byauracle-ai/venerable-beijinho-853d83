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
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }} className="mobile-menu-btn" aria-label="Menu">
        <div style={{ width: '24px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', height: '1px', background: menuOpen ? 'var(--gold)' : 'var(--text-primary)', transition: 'all 0.3s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', height: '1px', background: menuOpen
