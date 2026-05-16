import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── Images from GitHub public folder ────────────────────────────────────────
const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (f: string) => `${BASE}/${encodeURIComponent(f)}`

const HERO_IMG   = img('Screenshot 2026-03-21 175630.png')
const SECOND_IMG = img('Modern-Dream-House-McClean-Design-09-1-Kindesign')
const THIRD_IMG  = img('Screenshot 2026-05-14 202045.png')
const STAIRCASE  = img('Screenshot 2026-05-11 171922.png')

const GALLERY = [
  { src: img('Screenshot 2026-05-14 201935.png'), label: 'Living',  title: 'Open-Plan Living',  sub: 'Floor-to-ceiling glass dissolving interior and ocean into one' },
  { src: img('Screenshot 2026-05-14 201944.png'), label: 'Horizon', title: 'The Horizon',        sub: 'Unobstructed panorama across the northern lagoon at every hour' },
  { src: img('Screenshot 2026-05-14 202001.png'), label: 'Pool',    title: 'Infinity Edge',      sub: 'A pool that merges seamlessly with the Indian Ocean beyond' },
  { src: img('Screenshot 2026-05-14 202012.png'), label: 'Dining',  title: 'Al Fresco Dining',   sub: 'Covered pavilion for twelve — salt air and candlelight included' },
  { src: img('Screenshot 2026-05-14 202036.png'), label: 'Master',  title: 'Master Suite',       sub: 'Five en-suite bedrooms, each a sanctuary of reclaimed teak' },
  { src: img('Screenshot 2026-05-14 202054.png'), label: 'Garden',  title: 'Tropical Gardens',   sub: '2,400m² of curated botanical landscape and private pathways' },
]

const SPA = [
  { src: img('Screenshot 2026-05-14 202025.png'), label: 'Concierge',   title: 'Personal Concierge',  sub: 'Your dedicated wellness curator — on call, always present' },
  { src: img('Screenshot 2026-05-15 220411.png'), label: 'Treatment',   title: 'Treatment Sanctuary', sub: 'Bespoke rituals drawn from ancient Mauritian healing traditions' },
  { src: img('Image.jpg'),                        label: 'Restoration', title: 'Deep Restoration',    sub: 'Total silence. Total surrender. Total renewal.' },
]

const FEATURES = ['Infinity Pool', 'Private Beach Access', 'Smart Home', 'Wine Cellar', 'Spa Suite', 'Concierge']

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// Returns 0→1 scroll progress through an element
function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh - rect.top) / (el.offsetHeight + vh))))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { ref, p }
}

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Montserrat:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --obsidian:   #07070a;
        --void:       #050508;
        --surface:    #0e0e13;
        --spa-dark:   #03030a;
        --gold:       #c9a460;
        --gold-light: #e8cfa0;
        --gold-dim:   rgba(201,164,96,0.18);
        --border:     rgba(201,164,96,0.12);
        --border-hi:  rgba(201,164,96,0.28);
        --text-1:     #f0ece4;
        --text-2:     #9b9488;
        --text-3:     #5a5650;
        --fd: 'Cormorant Garamond', Georgia, serif;
        --fb: 'Montserrat', sans-serif;
        --fa: 'EB Garamond', Georgia, serif;
      }

      html { scroll-behavior: smooth; }
      body {
        background: var(--obsidian); color: var(--text-1);
        font-family: var(--fb); font-weight: 300;
        -webkit-font-smoothing: antialiased; overflow-x: hidden;
      }
      body::before {
        content: ''; position: fixed; inset: 0;
        pointer-events: none; z-index: 9999; opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 200px;
      }

      .disp { font-family: var(--fd); }
      .acc  { font-family: var(--fa); }
      .gold-grad {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, #a07830 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .eyebrow {
        font-family: var(--fb); font-size: 9px; font-weight: 400;
        letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
      }
      .nav-a {
        font-family: var(--fb); font-size: 10px; letter-spacing: 0.22em;
        text-transform: uppercase; color: var(--text-2); text-decoration: none; transition: color 0.3s;
      }
      .nav-a:hover { color: var(--gold-light); }
      .btn {
        display: inline-flex; align-items: center; gap: 10px; padding: 14px 32px;
        font-family: var(--fb); font-size: 9px; font-weight: 400; letter-spacing: 0.3em;
        text-transform: uppercase; text-decoration: none; cursor: pointer; transition: all 0.4s ease;
        border: none; outline: none;
      }
      .btn-o { background: transparent; border: 1px solid var(--border-hi); color: var(--text-1); }
      .btn-o:hover { background: var(--gold-dim); border-color: var(--gold); color: var(--gold-light); }
      .btn-s { background: linear-gradient(135deg, var(--gold) 0%, #a07830 100%); color: var(--obsidian); }
      .btn-s:hover {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
        transform: translateY(-1px); box-shadow: 0 8px 40px rgba(201,164,96,0.25);
      }

      .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); }

      @media (max-width: 900px) {
        .stat-grid { grid-template-columns: repeat(2,1fr); }
        .nav-links  { display: none !important; }
        .hero-btns  { flex-direction: column !important; }
        .inv-grid   { grid-template-columns: 1fr !important; }
      }

      input, textarea {
        background: transparent; border: 1px solid var(--border); color: var(--text-1);
        font-family: var(--fb); font-size: 12px; font-weight: 300; letter-spacing: 0.08em;
        padding: 16px 20px; width: 100%; outline: none; transition: border-color 0.3s;
      }
      input::placeholder, textarea::placeholder { color: var(--text-3); }
      input:focus, textarea:focus { border-color: var(--gold); }

      @keyframes fadeUp  { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      @keyframes spulse  { 0%,100%{opacity:0.4;transform:scaleY(0.6);}50%{opacity:1;transform:scaleY(1);} }
      @keyframes shimmer { 0%{background-position:200% center;}100%{background-position:-200% center;} }
    `}</style>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: '76px', padding: '0 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background 0.6s',
      background: scrolled ? 'rgba(5,5,8,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(201,164,96,0.1)' : 'transparent'}`,
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div className="disp" style={{ fontSize: '19px', fontWeight: 300, letterSpacing: '0.18em', color: 'var(--text-1)', lineHeight: 1 }}>ÉDEN ESTATES</div>
        <div className="eyebrow" style={{ marginTop: '3px', fontSize: '7.5px', letterSpacing: '0.32em' }}>Mauritius · Est. 2018</div>
      </a>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        {[['The Estate','#estate'],['Investment','#investment'],['Wellness','#wellness'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
        <a href="#contact" className="btn btn-o" style={{ padding: '9px 22px', fontSize: '8.5px' }}>Private Viewing</a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: '100dvh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={HERO_IMG} alt="Villa Azur" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,8,0.72) 40%, rgba(5,5,8,0.1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--obsidian) 0%, transparent 55%)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,8vw,110px)', paddingBottom: 'clamp(70px,10vw,130px)', maxWidth: '860px' }}>
        <p className="eyebrow" style={{ marginBottom: '28px', animation: 'fadeUp 1s ease 0.2s both' }}>Grand Baie · North Coast · Mauritius</p>
        <h1 className="disp" style={{ fontSize: 'clamp(48px,7.5vw,110px)', fontWeight: 300, lineHeight: 1.04, margin: '0 0 8px', fontStyle: 'italic', color: 'var(--text-1)', animation: 'fadeUp 1s ease 0.4s both' }}>Villa Azur</h1>
        <div className="disp gold-grad" style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 300, marginBottom: '36px', animation: 'fadeUp 1s ease 0.55s both', letterSpacing: '0.04em' }}>$3,750,000</div>
        <p className="acc" style={{ fontSize: 'clamp(13px,1.4vw,16px)', lineHeight: 1.85, color: 'var(--text-2)', maxWidth: '460px', marginBottom: '52px', animation: 'fadeUp 1s ease 0.7s both' }}>
          Suspended above the Indian Ocean, Villa Azur commands panoramic views across the northern lagoon — a masterwork of glass, stone, and tropical modernism.
        </p>
        <div className="hero-btns" style={{ display: 'flex', gap: '14px', animation: 'fadeUp 1s ease 0.85s both' }}>
          <a href="#estate" className="btn btn-s">Explore the Estate</a>
          <a href="#contact" className="btn btn-o">Arrange a Viewing</a>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', right: '56px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span className="eyebrow" style={{ writingMode: 'vertical-rl', fontSize: '8px' }}>Scroll</span>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'spulse 2.2s ease infinite' }} />
      </div>
      <div style={{ position: 'absolute', top: '100px', right: '56px', zIndex: 2, border: '1px solid var(--border-hi)', padding: '20px 28px', textAlign: 'center', background: 'rgba(5,5,8,0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="eyebrow" style={{ marginBottom: '8px' }}>Est. Annual Yield</div>
        <div className="disp gold-grad" style={{ fontSize: '34px', fontWeight: 300 }}>9%</div>
        <div style={{ fontSize: '9px', color: 'var(--text-3)', letterSpacing: '0.12em', marginTop: '4px' }}>Short-term rental</div>
      </div>
    </section>
  )
}

// ─── PANEL VARIANTS ───────────────────────────────────────────────────────────

// Style A: Classic split — image fills one side, text the other. Clean edge, no gradient crutch.
function PanelSplit({ src, label, title, sub, index, id }: { src:string; label:string; title:string; sub:string; index:number; id?:string }) {
  const { ref, inView } = useInView(0.15)
  const even = index % 2 === 0
  return (
    <div id={id} ref={ref} style={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: even ? '55% 45%' : '45% 55%', background: 'var(--obsidian)' }}>
      <div style={{ gridColumn: even ? 1 : 2, gridRow: 1, overflow: 'hidden', position: 'relative' }}>
        <img src={src} alt={title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transform: inView ? 'scale(1) translateY(0)' : 'scale(1.08) translateY(2%)',
          transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)',
        }} />
        {/* thin gold seam at the join, not a fat gradient */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, [even ? 'right' : 'left']: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)', opacity: 0.3 }} />
      </div>
      <div style={{ gridColumn: even ? 2 : 1, gridRow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,6vw,100px) clamp(40px,5vw,80px)', background: 'var(--obsidian)' }}>
        <div style={{ width: inView ? '48px' : '0', height: '1px', background: 'var(--gold)', marginBottom: '32px', transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
        <p className="eyebrow" style={{ marginBottom: '18px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'all 0.8s ease 0.35s' }}>{label}</p>
        <h2 className="disp" style={{ fontSize: 'clamp(30px,3.5vw,58px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '22px', color: 'var(--text-1)', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.9s ease 0.45s' }}>{title}</h2>
        <p className="acc" style={{ fontSize: '16px', lineHeight: 1.85, color: 'var(--text-2)', maxWidth: '300px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'all 0.9s ease 0.55s' }}>{sub}</p>
        <div style={{ marginTop: '40px', opacity: inView ? 1 : 0, transition: 'opacity 1s ease 0.7s' }}>
          <span className="eyebrow" style={{ fontSize: '8px', color: 'var(--text-3)' }}>{String(index + 1).padStart(2,'0')} / {String(GALLERY.length + 1).padStart(2,'0')}</span>
        </div>
      </div>
    </div>
  )
}

// Style B: Full-bleed image, text floats as an overlay card — bottom-left anchored
function PanelOverlay({ src, label, title, sub, index }: { src:string; label:string; title:string; sub:string; index:number }) {
  const { ref, p } = useScrollProgress()
  const { ref: inRef, inView } = useInView(0.1)
  const combinedRef = (el: HTMLDivElement | null) => {
    ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    ;(inRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }
  // parallax: image moves up slightly as you scroll through
  const imgY = `${(p - 0.5) * -12}%`

  return (
    <div ref={combinedRef} style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <img src={src} alt={title} loading="lazy" style={{
        width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center',
        position: 'absolute', top: '-7.5%',
        transform: `translateY(${imgY})`,
        willChange: 'transform',
      }} />
      {/* very subtle bottom fade only — no side gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,10,0.85) 0%, rgba(7,7,10,0.1) 40%, transparent 100%)' }} />

      {/* Floating text card — bottom left */}
      <div style={{
        position: 'absolute', bottom: 'clamp(48px,6vw,96px)', left: 'clamp(32px,6vw,96px)',
        maxWidth: '420px',
        opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'all 1s ease 0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
          <span className="eyebrow">{label}</span>
        </div>
        <h2 className="disp" style={{ fontSize: 'clamp(32px,4vw,64px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: 'var(--text-1)', marginBottom: '16px' }}>{title}</h2>
        <p className="acc" style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(240,236,228,0.7)' }}>{sub}</p>
      </div>

      {/* Counter — top right */}
      <div className="eyebrow" style={{ position: 'absolute', top: '40px', right: '48px', fontSize: '8px', color: 'rgba(201,164,96,0.4)' }}>
        {String(index + 1).padStart(2,'0')}
      </div>
    </div>
  )
}

// Style C: Diagonal clip reveal — image behind a diagonal mask that wipes open on scroll
function PanelDiagonal({ src, label, title, sub, index }: { src:string; label:string; title:string; sub:string; index:number }) {
  const { ref, inView } = useInView(0.1)
  const even = index % 2 === 0
  return (
    <div ref={ref} style={{ minHeight: '100dvh', display: 'flex', alignItems: 'stretch', background: 'var(--obsidian)', overflow: 'hidden', position: 'relative' }}>
      {/* Text side */}
      <div style={{
        width: '40%', flexShrink: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(48px,6vw,100px) clamp(32px,4vw,72px)',
        zIndex: 2,
        order: even ? 0 : 2,
      }}>
        <div style={{ width: inView ? '40px' : '0', height: '1px', background: 'var(--gold)', marginBottom: '28px', transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s' }} />
        <p className="eyebrow" style={{ marginBottom: '16px', opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}>{label}</p>
        <h2 className="disp" style={{
          fontSize: 'clamp(28px,3.2vw,54px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.12,
          marginBottom: '20px', color: 'var(--text-1)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)',
          transition: 'all 1s ease 0.4s',
        }}>{title}</h2>
        <p className="acc" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--text-2)', opacity: inView ? 1 : 0, transition: 'opacity 0.9s ease 0.55s' }}>{sub}</p>
      </div>

      {/* Diagonal image panel */}
      <div style={{
        flex: 1,
        position: 'relative', overflow: 'hidden',
        order: even ? 1 : 0,
        // diagonal clip — wider at top-right, narrower at bottom-left
        clipPath: even
          ? (inView ? 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)')
          : (inView ? 'polygon(0% 0%, 92% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'),
        transition: 'clip-path 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s',
      }}>
        <img src={src} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover',
          transform: inView ? 'scale(1)' : 'scale(1.06)',
          transition: 'transform 1.8s ease 0.1s',
        }} />
      </div>
    </div>
  )
}

// Style D: Horizontal scroll-wipe — image reveals left-to-right as it enters viewport
function PanelWipe({ src, label, title, sub, index }: { src:string; label:string; title:string; sub:string; index:number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} style={{ minHeight: '100dvh', background: 'var(--obsidian)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(60px,8vw,120px) clamp(32px,6vw,96px)', position: 'relative', overflow: 'hidden' }}>
      {/* Large background number */}
      <div className="disp" style={{
        position: 'absolute', right: '-0.02em', top: '50%', transform: 'translateY(-50%)',
        fontSize: 'clamp(200px,28vw,380px)', fontWeight: 300, fontStyle: 'italic',
        color: 'rgba(201,164,96,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        transition: 'opacity 1s ease',
      }}>{String(index + 1).padStart(2,'0')}</div>

      {/* Top: eyebrow + title */}
      <div style={{ marginBottom: '40px', maxWidth: '600px' }}>
        <p className="eyebrow" style={{ marginBottom: '16px', opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.1s' }}>{label}</p>
        <h2 className="disp" style={{
          fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.08, color: 'var(--text-1)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
          transition: 'all 1s ease 0.2s',
        }}>{title}</h2>
        <p className="acc" style={{ fontSize: '16px', lineHeight: 1.85, color: 'var(--text-2)', marginTop: '18px', maxWidth: '420px', opacity: inView ? 1 : 0, transition: 'opacity 0.9s ease 0.4s' }}>{sub}</p>
      </div>

      {/* Image — wipes in horizontally */}
      <div style={{
        width: inView ? '100%' : '0%',
        height: 'clamp(260px,45vw,560px)',
        overflow: 'hidden',
        transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s',
        position: 'relative',
      }}>
        <img src={src} alt={title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%',
          transform: inView ? 'scale(1)' : 'scale(1.1)',
          transition: 'transform 1.8s ease 0.3s',
          minWidth: 'calc(100vw - clamp(64px,12vw,192px))',
        }} />
        {/* gold corner accent */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '8px', opacity: inView ? 1 : 0, transition: 'opacity 1s ease 1.2s' }}>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          <span className="eyebrow" style={{ fontSize: '7px' }}>Villa Azur</span>
        </div>
      </div>
    </div>
  )
}

// ─── Second image: full-bleed cinematic with parallax ────────────────────────
function SecondImage() {
  const { ref, p } = useScrollProgress()
  const imgY = `${(p - 0.5) * -10}%`
  const { ref: inRef, inView } = useInView(0.1)
  const combinedRef = (el: HTMLDivElement | null) => {
    ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = el
    ;(inRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }
  return (
    <div id="estate" ref={combinedRef} style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <img src={SECOND_IMG} alt="Architecture" style={{
        width: '100%', height: '115%', objectFit: 'cover', position: 'absolute', top: '-7.5%',
        transform: `translateY(${imgY})`, willChange: 'transform',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--obsidian) 0%, transparent 15%, transparent 70%, var(--obsidian) 100%)' }} />
      <div style={{
        position: 'absolute', bottom: 'clamp(60px,8vw,120px)', left: 'clamp(32px,8vw,120px)',
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 1.1s ease 0.2s',
      }}>
        <div className="eyebrow" style={{ marginBottom: '16px' }}>Architecture</div>
        <h2 className="disp" style={{ fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-1)' }}>
          Designed to<br /><span className="gold-grad">Disappear</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Staircase transition — slow, cinematic, you see the stairs ───────────────
function StaircaseTransition() {
  const { ref, p } = useScrollProgress()

  // Fade starts late (at 60% scroll) and completes at 95% — so you watch the stairs for a long time
  const fadeStart = 0.55
  const fadeEnd = 0.92
  const overlayOpacity = p < fadeStart ? 0 : Math.min(1, (p - fadeStart) / (fadeEnd - fadeStart))

  // Text appears in the middle of the fade
  const textOpacity = p < 0.68 ? 0 : Math.min(1, (p - 0.68) * 6)

  return (
    <div ref={ref} style={{ minHeight: '130dvh', position: 'relative', overflow: 'hidden' }}>
      <img
        src={STAIRCASE}
        alt="Descending into sanctuary"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
          position: 'absolute', inset: 0,
          // subtle slow scale as you scroll — feels like descending
          transform: `scale(${1 + p * 0.06})`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.1s linear',
        }}
      />
      {/* The dark fade — only kicks in late */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(2,2,6,${overlayOpacity})`,
      }} />
      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px',
        opacity: textOpacity,
      }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.4em' }}>Descend · Restore · Transcend</div>
        <h2 className="disp" style={{ fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-1)', lineHeight: 1.1 }}>
          Enter the<br /><span className="gold-grad">Wellness Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function SpecsBar() {
  const { ref, inView } = useInView()
  const specs = [{ v:'5', l:'Bedrooms' },{ v:'6', l:'Bathrooms' },{ v:'820m²', l:'Interior' },{ v:'2,400m²', l:'Land' }]
  return (
    <div ref={ref} className="stat-grid" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      {specs.map(({ v, l }, i) => (
        <div key={l} style={{ padding: 'clamp(36px,5vw,72px) clamp(24px,4vw,56px)', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `all 0.8s ease ${i*0.1}s` }}>
          <div className="disp gold-grad" style={{ fontSize: 'clamp(36px,4vw,64px)', fontWeight: 300, lineHeight: 1, marginBottom: '10px' }}>{v}</div>
          <div className="eyebrow" style={{ color: 'var(--text-3)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Features strip ───────────────────────────────────────────────────────────
function FeaturesStrip() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ padding: '48px clamp(24px,6vw,80px)', background: 'var(--surface)', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
      {FEATURES.map((f, i) => (
        <div key={f} style={{ padding: '10px 22px', border: '1px solid var(--border)', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${0.06*i}s` }}>{f}</div>
      ))}
    </div>
  )
}

// ─── Wellness / Spa ───────────────────────────────────────────────────────────
function SpaPanel({ src, label, title, sub, index }: { src:string; label:string; title:string; sub:string; index:number }) {
  const { ref, inView } = useInView(0.15)
  const even = index % 2 === 0
  return (
    <div ref={ref} style={{ minHeight: '90vh', display: 'grid', gridTemplateColumns: even ? '55% 45%' : '45% 55%', background: 'var(--spa-dark)', borderTop: '1px solid rgba(201,164,96,0.05)' }}>
      <div style={{ gridColumn: even ? 1 : 2, gridRow: 1, position: 'relative', overflow: 'hidden' }}>
        <img src={src} alt={title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.88)', transform: inView ? 'scale(1)':'scale(1.06)', transition:'transform 1.8s cubic-bezier(0.16,1,0.3,1)' }} />
        <div style={{ position:'absolute', top:0, bottom:0, [even?'right':'left']:0, width:'1px', background:'linear-gradient(to bottom,transparent,rgba(201,164,96,0.2),transparent)' }} />
      </div>
      <div style={{ gridColumn: even ? 2 : 1, gridRow: 1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(48px,6vw,100px) clamp(40px,5vw,80px)', background:'var(--spa-dark)' }}>
        <div style={{ width: inView?'32px':'0', height:'1px', background:'var(--gold)', marginBottom:'28px', transition:'width 1s ease 0.3s' }} />
        <p className="eyebrow" style={{ marginBottom:'16px', opacity:inView?1:0, transform:inView?'none':'translateY(12px)', transition:'all 0.8s ease 0.35s' }}>{label}</p>
        <h3 className="disp" style={{ fontSize:'clamp(26px,3vw,50px)', fontWeight:400, fontStyle:'italic', lineHeight:1.15, marginBottom:'20px', color:'var(--text-1)', opacity:inView?1:0, transform:inView?'none':'translateY(16px)', transition:'all 0.9s ease 0.45s' }}>{title}</h3>
        <p className="acc" style={{ fontSize:'15px', lineHeight:1.9, color:'var(--text-2)', maxWidth:'290px', opacity:inView?1:0, transform:inView?'none':'translateY(12px)', transition:'all 0.9s ease 0.55s' }}>{sub}</p>
      </div>
    </div>
  )
}

function WellnessSection() {
  const { ref, inView } = useInView()
  const offerings = [
    { icon:'◎', title:'Hydrotherapy',    desc:'Heated jet pool, cold plunge, and mineral steam room' },
    { icon:'◈', title:'Body Rituals',    desc:'Volcanic stone massage · Coconut exfoliation · Ayurvedic treatments' },
    { icon:'◇', title:'Yoga Pavilion',   desc:'Sunrise and sunset sessions with a resident instructor' },
    { icon:'◉', title:'Nutrition & Detox', desc:'In-villa chef specialising in Ayurvedic and plant-based cuisine' },
  ]
  return (
    <section id="wellness" style={{ background: 'var(--spa-dark)' }}>
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', textAlign: 'center', borderBottom: '1px solid rgba(201,164,96,0.06)' }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.45em' }}>In-Residence Wellness</div>
        <h2 className="disp" style={{ fontSize: 'clamp(36px,5.5vw,80px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '28px' }}>The Spa Sanctuary</h2>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto 32px' }} />
        <p className="acc" style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.9, color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto' }}>
          Concealed beneath the villa, a private world of restoration awaits. Ancient Mauritian healing traditions, reborn in obsidian and candlelight.
        </p>
      </div>
      {SPA.map(({ src, label, title, sub }, i) => (
        <SpaPanel key={i} src={src} label={label} title={title} sub={sub} index={i} />
      ))}
      <div ref={ref} style={{ padding: 'clamp(64px,8vw,120px) clamp(24px,8vw,120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1px', background: 'rgba(201,164,96,0.07)' }}>
          {offerings.map(({ icon, title, desc }, i) => (
            <div key={title} style={{ background: 'var(--spa-dark)', padding: '48px 36px', opacity: inView?1:0, transform: inView?'none':'translateY(20px)', transition: `all 0.8s ease ${i*0.12}s` }}>
              <div style={{ fontSize: '22px', color: 'var(--gold)', marginBottom: '20px', opacity: 0.7 }}>{icon}</div>
              <h4 className="disp" style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', marginBottom: '12px', color: 'var(--text-1)' }}>{title}</h4>
              <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'var(--text-3)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Investment ───────────────────────────────────────────────────────────────
function InvestBlock({ eyebrow, title, body, tag, borderR, borderT }: { eyebrow:string; title:string; body:string; tag:string; borderR?:boolean; borderT?:boolean }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ padding:'clamp(48px,5vw,80px) clamp(24px,5vw,72px)', borderRight:borderR?'1px solid var(--border)':'none', borderTop:borderT?'1px solid var(--border)':'none', opacity:inView?1:0, transform:inView?'none':'translateY(20px)', transition:'all 0.9s ease' }}>
      <div className="eyebrow" style={{ marginBottom:'16px' }}>{eyebrow}</div>
      <h3 className="disp" style={{ fontSize:'clamp(22px,2.5vw,38px)', fontWeight:400, fontStyle:'italic', marginBottom:'18px', lineHeight:1.2 }}>{title}</h3>
      <p style={{ fontSize:'13px', lineHeight:1.9, color:'var(--text-2)', marginBottom:'24px' }}>{body}</p>
      <div style={{ display:'inline-block', padding:'7px 16px', border:'1px solid var(--border-hi)', fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--gold)' }}>{tag}</div>
    </div>
  )
}

function InvestmentSection() {
  const { ref, inView } = useInView()
  const stats = [
    { v:'+13.89%', l:'RPPI Growth Q3 2025',    note:'Statistics Mauritius' },
    { v:'+140%',   l:'Cumulative since 2019',   note:'More than doubled' },
    { v:'1.436M',  l:'Tourist arrivals 2025',   note:'+3.9% year-on-year' },
    { v:'₨21.39B', l:'FDI in real estate 2025', note:'Luxury schemes dominant' },
  ]
  return (
    <section id="investment" style={{ background: 'var(--void)' }}>
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px) 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: '20px' }}>Market Intelligence · 2025–2026</div>
        <h2 className="disp" style={{ fontSize: 'clamp(34px,5vw,76px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '24px' }}>
          The Case for<br /><span className="gold-grad">Mauritian Property</span>
        </h2>
        <p className="acc" style={{ fontSize: 'clamp(13px,1.4vw,16px)', lineHeight: 1.9, color: 'var(--text-2)', maxWidth: '580px', margin: '0 auto 72px' }}>
          Capital appreciation. Rental income. Permanent residency. Tax optimisation. Lifestyle. Five compelling reasons, one exceptional investment.
        </p>
      </div>
      <div ref={ref} className="stat-grid" style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        {stats.map(({ v, l, note }, i) => (
          <div key={l} style={{ padding:'clamp(40px,5vw,72px) clamp(24px,4vw,56px)', borderLeft:i>0?'1px solid var(--border)':'none', opacity:inView?1:0, transform:inView?'none':'translateY(24px)', transition:`all 0.85s ease ${i*0.1}s` }}>
            <div className="disp gold-grad" style={{ fontSize:'clamp(28px,3.5vw,52px)', fontWeight:300, lineHeight:1, marginBottom:'10px' }}>{v}</div>
            <div style={{ fontSize:'11px', color:'var(--text-2)', letterSpacing:'0.08em', marginBottom:'6px' }}>{l}</div>
            <div className="eyebrow" style={{ fontSize:'8px', color:'var(--text-3)' }}>{note}</div>
          </div>
        ))}
      </div>
      <div className="inv-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid var(--border)' }}>
        <InvestBlock eyebrow="Price Appreciation" title="Unmatched Capital Growth" body="Luxury and coastal villas in prime corridors — Grand Baie, Le Morne, Tamarin, Rivière Noire — are forecast to grow 8–12% in 2026. Foreign-buyer-eligible properties saw listing prices rise +12.62% year-on-year in 2025. VEFA off-plan buyers typically lock in prices 30–60% below completed units, with bank-backed completion guarantees under Mauritian law." tag="RPPI +13.89% · Q3 2025" borderR />
        <InvestBlock eyebrow="Rental Income" title="Superior Yield Profile" body="Gross rental yields on luxury villas: 3–5% long-term, rising to 5–9% for short-term holiday rentals in high-occupancy coastal areas. Rents rose sharply — +11.1% for apartments, +12.5% for houses in 2025 — driven by 1.436 million tourist arrivals, including +33.5% growth from India." tag="Up to 9% gross yield" />
        <InvestBlock eyebrow="Permanent Residency" title="Live Where Others Holiday" body="Purchase a qualifying VEFA villa at ≥ USD 375,000 under approved EDB schemes and receive a Permanent Residence Permit for the buyer, spouse, and all dependents. Valid as long as the property is owned; renewable for 20 years. A new Golden Visa ($1M route) launched in 2026." tag="PRP for family included" borderR borderT />
        <InvestBlock eyebrow="Tax Optimisation" title="Zero Tax on Wealth" body="0% Capital Gains Tax. 0% Inheritance, Estate, or Gift Tax. No annual property tax. 0% Withholding Tax on dividends and interest. Full free repatriation of capital and profits. Act now: non-citizen registration duty rises from 5% to 10% from 1 July 2026." tag="0% CGT · 0% Estate Tax" borderT />
      </div>
      <div style={{ padding:'clamp(64px,8vw,112px) clamp(24px,8vw,120px)', textAlign:'center', background:'var(--surface)' }}>
        <div className="eyebrow" style={{ marginBottom:'20px' }}>Africa's Strongest Decade of Wealth Growth</div>
        <div className="disp gold-grad" style={{ fontSize:'clamp(48px,7vw,100px)', fontWeight:300, lineHeight:1, marginBottom:'16px' }}>+67%</div>
        <p className="acc" style={{ fontSize:'15px', color:'var(--text-2)', maxWidth:'480px', margin:'0 auto 40px', lineHeight:1.85 }}>
          Total investable wealth growth in Mauritius, 2015–2025. The island continues to attract relocating millionaires seeking stability, tax efficiency, and an unmatched quality of life.
        </p>
        <a href="#contact" className="btn btn-s">Request Investment Brief</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background: 'var(--obsidian)', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }}>
        <div style={{ padding:'clamp(64px,8vw,120px) clamp(32px,6vw,100px)', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid var(--border)' }}>
          <div className="eyebrow" style={{ marginBottom:'20px', opacity:inView?1:0, transition:'all 0.8s ease 0.1s' }}>Private Access Only</div>
          <h2 className="disp" style={{ fontSize:'clamp(32px,4vw,64px)', fontWeight:300, fontStyle:'italic', lineHeight:1.12, marginBottom:'24px', opacity:inView?1:0, transform:inView?'none':'translateY(20px)', transition:'all 0.9s ease 0.2s' }}>
            Arrange a<br />Private Viewing
          </h2>
          <p className="acc" style={{ fontSize:'15px', lineHeight:1.9, color:'var(--text-2)', maxWidth:'360px', marginBottom:'44px', opacity:inView?1:0, transition:'all 0.9s ease 0.35s' }}>
            Villa Azur is available for qualified buyers by private appointment only. Our advisors are available around the clock, across all time zones.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px', opacity:inView?1:0, transition:'all 0.9s ease 0.45s' }}>
            <div className="eyebrow" style={{ color:'var(--text-3)' }}>hello@edenestates.mu</div>
            <div className="eyebrow" style={{ color:'var(--text-3)' }}>+230 5000 0000</div>
          </div>
        </div>
        <div style={{ padding:'clamp(64px,8vw,120px) clamp(32px,6vw,100px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone / WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t}) => (
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred viewing dates" rows={4} style={{ resize:'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn btn-s" style={{ textAlign:'center', marginTop:'8px' }}>Submit Private Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding:'36px 56px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px', background:'var(--void)' }}>
      <span className="disp" style={{ fontSize:'13px', fontWeight:300, letterSpacing:'0.18em', color:'var(--text-3)' }}>ÉDEN ESTATES</span>
      <span className="eyebrow" style={{ color:'var(--text-3)', fontSize:'8px' }}>© 2026 · Grand Baie, Mauritius · All rights reserved</span>
      <span className="eyebrow" style={{ color:'var(--text-3)', fontSize:'8px' }}>Villa Azur · $3,750,000 USD</span>
    </footer>
  )
}

// ─── Page assembly ────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <NavBar />
      <Hero />
      <SecondImage />

      {/* Third image: diagonal wipe */}
      <PanelDiagonal src={THIRD_IMG} label="Exterior" title="The Estate" sub="Where architecture meets the Indian Ocean — every angle considered, every surface intentional." index={0} />

      {/* Gallery — rotate through 4 distinct panel styles */}
      <PanelOverlay  {...GALLERY[0]} index={1} />
      <PanelSplit    {...GALLERY[1]} index={2} />
      <PanelWipe     {...GALLERY[2]} index={3} />
      <PanelDiagonal {...GALLERY[3]} index={4} />
      <PanelOverlay  {...GALLERY[4]} index={5} />
      <PanelSplit    {...GALLERY[5]} index={6} />

      <SpecsBar />
      <FeaturesStrip />

      <StaircaseTransition />
      <WellnessSection />
      <InvestmentSection />
      <ContactSection />
      <Footer />
    </>
  )
}
