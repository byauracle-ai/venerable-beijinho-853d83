import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import villas from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const villa = villas[0]
const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (f: string) => `${BASE}/${encodeURIComponent(f)}`

// ─── Image assignments ────────────────────────────────────────────────────────
const HERO_IMG        = img('Screenshot 2026-03-21 175630.png')
const SECOND_IMG      = img('Modern-Dream-House-McClean-Design-09-1-Kindesign')
const THIRD_IMG       = img('Screenshot 2026-05-14 202045.png')
const GALLERY_IMGS    = [
  { src: img('Screenshot 2026-05-14 201935.png'), label: 'Living', title: 'Open-Plan Living',   sub: 'Floor-to-ceiling glass dissolving interior and ocean into one' },
  { src: img('Screenshot 2026-05-14 201944.png'), label: 'Horizon', title: 'The Horizon',       sub: 'Unobstructed panorama across the northern lagoon at every hour' },
  { src: img('Screenshot 2026-05-14 202001.png'), label: 'Pool',    title: 'Infinity Edge',     sub: 'A pool that merges seamlessly with the Indian Ocean beyond' },
  { src: img('Screenshot 2026-05-14 202012.png'), label: 'Dining',  title: 'Al Fresco Dining',  sub: 'Covered pavilion for twelve — salt air and candlelight included' },
  { src: img('Screenshot 2026-05-14 202036.png'), label: 'Master',  title: 'Master Suite',      sub: 'Five en-suite bedrooms, each a sanctuary of reclaimed teak' },
  { src: img('Screenshot 2026-05-14 202054.png'), label: 'Garden',  title: 'Tropical Gardens',  sub: '2,400m² of curated botanical landscape and private pathways' },
]
const STAIRCASE_IMG   = img('Screenshot 2026-05-11 171922.png')
const SPA_IMGS = [
  { src: img('Screenshot 2026-05-14 202025.png'), label: 'Concierge',    title: 'Personal Concierge',  sub: 'Your dedicated wellness curator — on call, always present' },
  { src: img('Screenshot 2026-05-15 220411.png'), label: 'Treatment',    title: 'Treatment Sanctuary', sub: 'Bespoke rituals drawn from ancient Mauritian healing traditions' },
  { src: img('Image.jpg'),                        label: 'Restoration',  title: 'Deep Restoration',    sub: 'Total silence. Total surrender. Total renewal.' },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Global styles injected once ─────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel+Decorative:wght@400&family=EB+Garamond:ital,wght@0,400;1,400&family=Montserrat:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --obsidian:    #07070a;
        --void:        #050508;
        --surface:     #0e0e13;
        --surface2:    #13131a;
        --gold:        #c9a460;
        --gold-light:  #e8cfa0;
        --gold-dim:    rgba(201,164,96,0.18);
        --border:      rgba(201,164,96,0.12);
        --border-hi:   rgba(201,164,96,0.28);
        --text-primary:#f0ece4;
        --text-secondary:#9b9488;
        --text-muted:  #5a5650;
        --spa-dark:    #03030a;
        --font-display:'Cormorant Garamond', Georgia, serif;
        --font-body:   'Montserrat', sans-serif;
        --font-accent: 'EB Garamond', Georgia, serif;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--obsidian);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* Grain overlay for luxury texture */
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 200px;
      }

      .display { font-family: var(--font-display); }
      .accent  { font-family: var(--font-accent); }

      .gold-text { color: var(--gold); }
      .gold-grad {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, #a07830 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .eyebrow {
        font-family: var(--font-body);
        font-size: 9px;
        font-weight: 400;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: var(--gold);
      }

      /* Nav link */
      .nav-a {
        font-family: var(--font-body);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.3s;
      }
      .nav-a:hover { color: var(--gold-light); }

      /* Luxury button */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        font-family: var(--font-body);
        font-size: 9px;
        font-weight: 400;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.4s ease;
        border: none;
        outline: none;
      }
      .btn-outline {
        background: transparent;
        border: 1px solid var(--border-hi);
        color: var(--text-primary);
      }
      .btn-outline:hover {
        background: var(--gold-dim);
        border-color: var(--gold);
        color: var(--gold-light);
      }
      .btn-solid {
        background: linear-gradient(135deg, var(--gold) 0%, #a07830 100%);
        color: var(--obsidian);
      }
      .btn-solid:hover {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
        transform: translateY(-1px);
        box-shadow: 0 8px 40px rgba(201,164,96,0.25);
      }

      /* Scroll fade-in */
      .fade-in { opacity: 0; transform: translateY(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
      .fade-in.visible { opacity: 1; transform: translateY(0); }

      /* Divider */
      .gold-rule { width: 48px; height: 1px; background: var(--gold); }

      /* Stats grid */
      .stat-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border: 1px solid var(--border);
      }
      @media (max-width: 900px) {
        .stat-grid { grid-template-columns: repeat(2, 1fr); }
        .panel-layout { grid-template-columns: 1fr !important; }
        .panel-layout .panel-img { min-height: 55vw !important; }
        .hero-btns { flex-direction: column !important; }
        .nav-links { display: none !important; }
        .invest-grid { grid-template-columns: 1fr !important; }
      }

      input, textarea {
        background: transparent;
        border: 1px solid var(--border);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.08em;
        padding: 16px 20px;
        width: 100%;
        outline: none;
        transition: border-color 0.3s;
      }
      input::placeholder, textarea::placeholder { color: var(--text-muted); }
      input:focus, textarea:focus { border-color: var(--gold); }

      @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      @keyframes lineGrow { from { width:0; } to { width:48px; } }
      @keyframes scrollPulse { 0%,100% { opacity:0.4; transform:scaleY(0.6); } 50% { opacity:1; transform:scaleY(1); } }
      @keyframes rotateSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    `}</style>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
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
      transition: 'background 0.6s, border-color 0.6s',
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(201,164,96,0.1)' : 'transparent'}`,
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div className="display" style={{ fontSize: '19px', fontWeight: 300, letterSpacing: '0.18em', color: 'var(--text-primary)', lineHeight: 1 }}>
          ÉDEN ESTATES
        </div>
        <div className="eyebrow" style={{ marginTop: '3px', fontSize: '7.5px', letterSpacing: '0.32em' }}>Mauritius · Est. 2018</div>
      </a>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        {[['The Estate', '#estate'], ['Investment', '#investment'], ['Wellness', '#wellness'], ['Contact', '#contact']].map(([l, h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
        <a href="#contact" className="btn btn-outline" style={{ padding: '9px 22px', fontSize: '8.5px' }}>Private Viewing</a>
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,8vw,110px)', paddingBottom: 'clamp(70px,10vw,130px)', maxWidth: '860px' }}>
        <p className="eyebrow" style={{ marginBottom: '28px', animation: 'fadeUp 1s ease 0.2s both' }}>
          Grand Baie · North Coast · Mauritius
        </p>
        <h1 className="display" style={{
          fontSize: 'clamp(48px, 7.5vw, 110px)', fontWeight: 300, lineHeight: 1.04,
          margin: '0 0 8px', fontStyle: 'italic', color: 'var(--text-primary)',
          animation: 'fadeUp 1s ease 0.4s both',
        }}>
          Villa Azur
        </h1>
        <div className="display gold-grad" style={{
          fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 300, marginBottom: '36px',
          animation: 'fadeUp 1s ease 0.55s both', letterSpacing: '0.04em',
        }}>
          $3,750,000
        </div>
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 16px)', lineHeight: 1.85,
          color: 'var(--text-secondary)', maxWidth: '460px', marginBottom: '52px',
          animation: 'fadeUp 1s ease 0.7s both',
          fontFamily: 'var(--font-accent)',
        }}>
          {villa.shortDescription}
        </p>
        <div className="hero-btns" style={{ display: 'flex', gap: '14px', animation: 'fadeUp 1s ease 0.85s both' }}>
          <a href="#estate" className="btn btn-solid">Explore the Estate</a>
          <a href="#contact" className="btn btn-outline">Arrange a Viewing</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: '40px', right: '56px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span className="eyebrow" style={{ writingMode: 'vertical-rl', fontSize: '8px', letterSpacing: '0.28em' }}>Scroll</span>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(to bottom, var(--gold) 0%, transparent 100%)', animation: 'scrollPulse 2.2s ease infinite' }} />
      </div>

      {/* Price tag corner */}
      <div style={{
        position: 'absolute', top: '100px', right: '56px', zIndex: 2,
        border: '1px solid var(--border-hi)', padding: '20px 28px', textAlign: 'center',
        background: 'rgba(5,5,8,0.5)', backdropFilter: 'blur(12px)',
      }}>
        <div className="eyebrow" style={{ marginBottom: '8px' }}>Est. Annual Yield</div>
        <div className="display gold-grad" style={{ fontSize: '34px', fontWeight: 300 }}>9%</div>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: '4px' }}>Short-term rental</div>
      </div>
    </section>
  )
}

// ─── Cinematic panel (left or right image) ───────────────────────────────────
function CinemaPanel({ src, label, title, sub, index, id }: {
  src: string; label: string; title: string; sub: string; index: number; id?: string
}) {
  const { ref, inView } = useInView(0.15)
  const even = index % 2 === 0
  return (
    <div
      id={id}
      ref={ref}
      className="panel-layout"
      style={{
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateColumns: even ? '58% 42%' : '42% 58%',
        background: 'var(--obsidian)',
      }}
    >
      {/* Image */}
      <div className="panel-img" style={{ gridColumn: even ? 1 : 2, gridRow: 1, position: 'relative', overflow: 'hidden', minHeight: '65vh' }}>
        <img
          src={src}
          alt={title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
            transform: inView ? 'scale(1)' : 'scale(1.07)',
            transition: 'transform 1.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: even
            ? 'linear-gradient(to right, transparent 55%, var(--obsidian) 100%)'
            : 'linear-gradient(to left, transparent 55%, var(--obsidian) 100%)',
        }} />
        {/* counter */}
        <div className="eyebrow" style={{
          position: 'absolute', top: '36px',
          [even ? 'left' : 'right']: '36px',
          fontSize: '8px', color: 'rgba(201,164,96,0.45)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Caption */}
      <div style={{
        gridColumn: even ? 2 : 1, gridRow: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(48px,6vw,100px) clamp(40px,5vw,80px)',
        background: 'var(--obsidian)',
      }}>
        <div className="gold-rule" style={{
          width: inView ? '48px' : '0',
          transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s',
          marginBottom: '32px',
        }} />
        <p className="eyebrow" style={{
          marginBottom: '18px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)',
          transition: 'all 0.8s ease 0.3s',
        }}>{label}</p>
        <h2 className="display" style={{
          fontSize: 'clamp(30px, 3.5vw, 58px)', fontWeight: 400, fontStyle: 'italic',
          lineHeight: 1.1, marginBottom: '22px', color: 'var(--text-primary)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)',
          transition: 'all 0.9s ease 0.4s',
        }}>{title}</h2>
        <p style={{
          fontFamily: 'var(--font-accent)', fontSize: '15px', lineHeight: 1.85,
          color: 'var(--text-secondary)', maxWidth: '300px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)',
          transition: 'all 0.9s ease 0.52s',
        }}>{sub}</p>
      </div>
    </div>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function SpecsBar() {
  const { ref, inView } = useInView()
  const specs = [
    { v: '5', l: 'Bedrooms' }, { v: '6', l: 'Bathrooms' },
    { v: '820m²', l: 'Interior' }, { v: '2,400m²', l: 'Land' },
  ]
  return (
    <div ref={ref} className="stat-grid" style={{ margin: '0', borderLeft: 'none', borderRight: 'none' }}>
      {specs.map(({ v, l }, i) => (
        <div key={l} style={{
          padding: 'clamp(36px,5vw,72px) clamp(24px,4vw,56px)',
          borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
          transition: `all 0.8s ease ${i * 0.1}s`,
        }}>
          <div className="display gold-grad" style={{ fontSize: 'clamp(36px,4vw,64px)', fontWeight: 300, lineHeight: 1, marginBottom: '10px' }}>{v}</div>
          <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>{l}</div>
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
      {villa.features.map((f, i) => (
        <div key={f} style={{
          padding: '10px 22px', border: '1px solid var(--border)',
          fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)',
          opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${0.05 * i}s`,
        }}>{f}</div>
      ))}
    </div>
  )
}

// ─── Staircase transition panel ───────────────────────────────────────────────
function StaircaseTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // once visible, start tracking scroll
      }
    }, { threshold: 0 })
    obs.observe(el)

    const onScroll = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = el.offsetHeight + vh
      const scrolled = vh - rect.top
      setProgress(Math.min(1, Math.max(0, scrolled / total)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const overlayOpacity = Math.min(1, progress * 2.2)

  return (
    <div ref={ref} style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <img
        src={STAIRCASE_IMG}
        alt="Descending into sanctuary"
        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
      />
      {/* Progressive dark overlay — fades to void black as you scroll */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(2,2,6,${overlayOpacity})`,
        transition: 'background 0.05s linear',
      }} />
      {/* Centre text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '40px',
        opacity: progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) * 3),
        transition: 'opacity 0.3s',
      }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.4em' }}>Descend · Restore · Transcend</div>
        <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.1 }}>
          Enter the<br /><span className="gold-grad">Wellness Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Wellness / Spa section ───────────────────────────────────────────────────
function WellnessSection() {
  return (
    <section id="wellness" style={{ background: 'var(--spa-dark)' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', textAlign: 'center', borderBottom: '1px solid rgba(201,164,96,0.06)' }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.45em' }}>In-Residence Wellness</div>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '28px' }}>
          The Spa Sanctuary
        </h2>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto 32px' }} />
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
          Concealed beneath the villa, a private world of restoration awaits.
          Ancient Mauritian healing traditions, reborn in obsidian and candlelight.
        </p>
      </div>

      {/* Three spa panels — alternating full-bleed */}
      {SPA_IMGS.map(({ src, label, title, sub }, i) => {
        const even = i % 2 === 0
        return (
          <SpaPanel key={i} src={src} label={label} title={title} sub={sub} index={i} even={even} />
        )
      })}

      {/* Offerings grid */}
      <SpaOfferings />
    </section>
  )
}

function SpaPanel({ src, label, title, sub, index, even }: {
  src: string; label: string; title: string; sub: string; index: number; even: boolean
}) {
  const { ref, inView } = useInView(0.15)
  return (
    <div
      ref={ref}
      className="panel-layout"
      style={{
        minHeight: '90vh',
        display: 'grid',
        gridTemplateColumns: even ? '55% 45%' : '45% 55%',
        background: 'var(--spa-dark)',
        borderTop: '1px solid rgba(201,164,96,0.05)',
      }}
    >
      <div className="panel-img" style={{ gridColumn: even ? 1 : 2, gridRow: 1, position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <img
          src={src}
          alt={title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
            transform: inView ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)',
            filter: 'brightness(0.85)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: even
            ? 'linear-gradient(to right, rgba(3,3,10,0) 50%, var(--spa-dark) 100%)'
            : 'linear-gradient(to left, rgba(3,3,10,0) 50%, var(--spa-dark) 100%)',
        }} />
      </div>
      <div style={{
        gridColumn: even ? 2 : 1, gridRow: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(48px,6vw,100px) clamp(40px,5vw,80px)',
        background: 'var(--spa-dark)',
      }}>
        <div style={{
          width: inView ? '32px' : '0', height: '1px',
          background: 'var(--gold)', marginBottom: '28px',
          transition: 'width 1s ease 0.3s',
        }} />
        <p className="eyebrow" style={{
          marginBottom: '16px', opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(12px)',
          transition: 'all 0.8s ease 0.35s',
        }}>{label}</p>
        <h3 className="display" style={{
          fontSize: 'clamp(26px, 3vw, 50px)', fontWeight: 400, fontStyle: 'italic',
          lineHeight: 1.15, marginBottom: '20px', color: 'var(--text-primary)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
          transition: 'all 0.9s ease 0.45s',
        }}>{title}</h3>
        <p style={{
          fontFamily: 'var(--font-accent)', fontSize: '15px', lineHeight: 1.9,
          color: 'var(--text-secondary)', maxWidth: '290px',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)',
          transition: 'all 0.9s ease 0.55s',
        }}>{sub}</p>
      </div>
    </div>
  )
}

function SpaOfferings() {
  const { ref, inView } = useInView()
  const offerings = [
    { icon: '◎', title: 'Hydrotherapy', desc: 'Heated jet pool, cold plunge, and mineral steam room' },
    { icon: '◈', title: 'Body Rituals', desc: 'Volcanic stone massage · Coconut exfoliation · Ayurvedic treatments' },
    { icon: '◇', title: 'Yoga Pavilion', desc: 'Sunrise and sunset sessions with a resident instructor' },
    { icon: '◉', title: 'Nutrition & Detox', desc: 'In-villa chef specialising in Ayurvedic and plant-based cuisine' },
  ]
  return (
    <div ref={ref} style={{ padding: 'clamp(64px,8vw,120px) clamp(24px,8vw,120px)', background: 'var(--spa-dark)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(201,164,96,0.07)' }}>
        {offerings.map(({ icon, title, desc }, i) => (
          <div key={title} style={{
            background: 'var(--spa-dark)', padding: '48px 36px',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
            transition: `all 0.8s ease ${i * 0.12}s`,
          }}>
            <div style={{ fontSize: '22px', color: 'var(--gold)', marginBottom: '20px', opacity: 0.7 }}>{icon}</div>
            <h4 className="display" style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', marginBottom: '12px', color: 'var(--text-primary)' }}>{title}</h4>
            <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Investment / Residency ───────────────────────────────────────────────────
function InvestmentSection() {
  const { ref, inView } = useInView()
  const stats = [
    { v: '+13.89%', l: 'RPPI Growth Q3 2025', note: 'Statistics Mauritius' },
    { v: '+140%', l: 'Cumulative since 2019', note: 'More than doubled' },
    { v: '1.436M', l: 'Tourist arrivals 2025', note: '+3.9% year-on-year' },
    { v: '₨21.39B', l: 'FDI in real estate 2025', note: 'Luxury schemes dominant' },
  ]
  return (
    <section id="investment" style={{ background: 'var(--void)', paddingBottom: '0' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px) 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: '20px' }}>Market Intelligence · 2025–2026</div>
        <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,76px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '24px' }}>
          The Case for<br /><span className="gold-grad">Mauritian Property</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: 'clamp(13px,1.4vw,16px)', lineHeight: 1.9, color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 72px' }}>
          Capital appreciation. Rental income. Permanent residency. Tax optimisation. Lifestyle. Five compelling reasons, one exceptional investment.
        </p>
      </div>

      {/* Stats */}
      <div ref={ref} className="stat-grid" style={{ border: 'none', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {stats.map(({ v, l, note }, i) => (
          <div key={l} style={{
            padding: 'clamp(40px,5vw,72px) clamp(24px,4vw,56px)',
            borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
            transition: `all 0.85s ease ${i * 0.1}s`,
          }}>
            <div className="display gold-grad" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, lineHeight: 1, marginBottom: '10px' }}>{v}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.08em', marginBottom: '6px' }}>{l}</div>
            <div className="eyebrow" style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{note}</div>
          </div>
        ))}
      </div>

      {/* Two-column detail */}
      <div className="invest-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        <InvestBlock
          eyebrow="Price Appreciation"
          title="Unmatched Capital Growth"
          body="Luxury and coastal villas in prime corridors — Grand Baie, Le Morne, Tamarin, Rivière Noire — are forecast to grow 8–12% in 2026. Foreign-buyer-eligible properties saw listing prices rise +12.62% year-on-year in 2025. VEFA off-plan buyers typically lock in prices 30–60% below completed units, with bank-backed completion guarantees under Mauritian law."
          tag="RPPI +13.89% · Q3 2025"
          border
        />
        <InvestBlock
          eyebrow="Rental Income"
          title="Superior Yield Profile"
          body="Gross rental yields on luxury villas: 3–5% long-term, rising to 5–9% for short-term holiday rentals in high-occupancy coastal areas. Rents rose sharply — +11.1% for apartments, +12.5% for houses in 2025 — driven by 1.436 million tourist arrivals, including +33.5% growth from India."
          tag="Up to 9% gross yield"
        />
        <InvestBlock
          eyebrow="Permanent Residency"
          title="Live Where Others Holiday"
          body="Purchase a qualifying VEFA villa at ≥ USD 375,000 under approved EDB schemes — most luxury PDS/IRS/Smart City developments qualify — and receive a Permanent Residence Permit for the buyer, spouse, and all dependents. Valid as long as the property is owned; renewable for 20 years. A new Golden Visa ($1M investment route) launched in 2026 for ultra-HNWIs."
          tag="PRP for family included"
          border
          borderTop
        />
        <InvestBlock
          eyebrow="Tax Optimisation"
          title="Zero Tax on Wealth"
          body="0% Capital Gains Tax. 0% Inheritance, Estate, or Gift Tax. No annual property tax. 0% Withholding Tax on dividends, interest, and royalties under treaties. Full free repatriation of capital and profits. Act now: non-citizen registration duty rises from 5% to 10% from 1 July 2026 — clients buying VEFA today secure the lower rate and pre-construction pricing."
          tag="0% CGT · 0% Estate Tax"
          borderTop
        />
      </div>

      {/* Wealth growth callout */}
      <div style={{ padding: 'clamp(64px,8vw,112px) clamp(24px,8vw,120px)', textAlign: 'center', background: 'var(--surface)' }}>
        <div className="eyebrow" style={{ marginBottom: '20px' }}>Africa's Strongest Decade of Wealth Growth</div>
        <div className="display gold-grad" style={{ fontSize: 'clamp(48px,7vw,100px)', fontWeight: 300, lineHeight: 1, marginBottom: '16px' }}>+67%</div>
        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.85 }}>
          Total investable wealth growth in Mauritius, 2015–2025. The island continues to attract relocating millionaires seeking stability, tax efficiency, and an unmatched quality of life.
        </p>
        <a href="#contact" className="btn btn-solid">Request Investment Brief</a>
      </div>
    </section>
  )
}

function InvestBlock({ eyebrow, title, body, tag, border, borderTop }: {
  eyebrow: string; title: string; body: string; tag: string; border?: boolean; borderTop?: boolean
}) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      padding: 'clamp(48px,5vw,80px) clamp(24px,5vw,72px)',
      borderRight: border ? '1px solid var(--border)' : 'none',
      borderTop: borderTop ? '1px solid var(--border)' : 'none',
      opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
      transition: 'all 0.9s ease',
    }}>
      <div className="eyebrow" style={{ marginBottom: '16px' }}>{eyebrow}</div>
      <h3 className="display" style={{ fontSize: 'clamp(22px, 2.5vw, 38px)', fontWeight: 400, fontStyle: 'italic', marginBottom: '18px', lineHeight: 1.2 }}>{title}</h3>
      <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'var(--text-secondary)', marginBottom: '24px' }}>{body}</p>
      <div style={{ display: 'inline-block', padding: '7px 16px', border: '1px solid var(--border-hi)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{tag}</div>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background: 'var(--obsidian)', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }} className="panel-layout">
        {/* Left — copy */}
        <div style={{ padding: 'clamp(64px,8vw,120px) clamp(32px,6vw,100px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid var(--border)' }}>
          <div className="eyebrow" style={{ marginBottom: '20px', opacity: inView ? 1 : 0, transition: 'all 0.8s ease 0.1s' }}>Private Access Only</div>
          <h2 className="display" style={{
            fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.12, marginBottom: '24px',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
            transition: 'all 0.9s ease 0.2s',
          }}>
            Arrange a<br />Private Viewing
          </h2>
          <p style={{
            fontFamily: 'var(--font-accent)', fontSize: '15px', lineHeight: 1.9,
            color: 'var(--text-secondary)', maxWidth: '360px', marginBottom: '44px',
            opacity: inView ? 1 : 0, transition: 'all 0.9s ease 0.35s',
          }}>
            Villa Azur is available for qualified buyers by private appointment only. Our advisors are available around the clock, across all time zones.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: inView ? 1 : 0, transition: 'all 0.9s ease 0.45s' }}>
            <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>hello@edenestates.mu</div>
            <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>+230 5000 0000</div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: 'clamp(64px,8vw,120px) clamp(32px,6vw,100px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { p: 'Full Name', t: 'text' },
              { p: 'Email Address', t: 'email' },
              { p: 'Phone / WhatsApp', t: 'tel' },
              { p: 'Country of Residence', t: 'text' },
            ].map(({ p, t }) => (
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred viewing dates" rows={4} style={{ resize: 'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn btn-solid" style={{ textAlign: 'center', marginTop: '8px' }}>
              Submit Private Enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '36px 56px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--void)' }}>
      <span className="display" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.18em', color: 'var(--text-muted)' }}>ÉDEN ESTATES</span>
      <span className="eyebrow" style={{ color: 'var(--text-muted)', fontSize: '8px' }}>© 2026 · Grand Baie, Mauritius · All rights reserved</span>
      <span className="eyebrow" style={{ color: 'var(--text-muted)', fontSize: '8px' }}>Villa Azur · $3,750,000 USD</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <NavBar />
      <Hero />

      {/* Second image — full bleed cinematic */}
      <div id="estate" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        <img src={SECOND_IMG} alt="Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--obsidian) 0%, transparent 20%, transparent 75%, var(--obsidian) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 'clamp(60px,8vw,120px)', left: 'clamp(32px,8vw,120px)' }}>
          <div className="eyebrow" style={{ marginBottom: '16px' }}>Architecture</div>
          <h2 className="display" style={{ fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-primary)' }}>
            Designed to<br /><span className="gold-grad">Disappear</span>
          </h2>
        </div>
      </div>

      {/* Third image panel */}
      <CinemaPanel src={THIRD_IMG} label="Exterior" title="The Estate" sub="Where architecture meets the Indian Ocean — every facade considered, every angle intentional." index={0} />

      {/* Gallery panels */}
      {GALLERY_IMGS.map(({ src, label, title, sub }, i) => (
        <CinemaPanel key={i} src={src} label={label} title={title} sub={sub} index={i + 1} />
      ))}

      <SpecsBar />
      <FeaturesStrip />

      {/* Staircase → wellness transition */}
      <StaircaseTransition />

      {/* Wellness / Spa */}
      <WellnessSection />

      {/* Investment */}
      <InvestmentSection />

      {/* Contact */}
      <ContactSection />
      <Footer />
    </>
  )
}
